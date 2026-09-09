#!/usr/bin/env node
// Validate the sharded figma-map/ store.
//   node scripts/validate-store.mjs [storeDir]
// Exit 0 = clean, 1 = errors.

import fs from "node:fs";
import path from "node:path";
import { readStore } from "./migrate-store.mjs";
import { buildIndex } from "./build-index.mjs";

const dir = process.argv[2] ?? "figma-map";
const errors = [];
const err = (m) => errors.push(m);

const STATUSES = ["todo", "wip", "review", "done"];
const REQUIRED = {
  "flows.jsonl":      ["flow_id", "name", "status"],
  "frames.jsonl":     ["flow_id", "id", "label", "frame_name", "wireframe_node_id", "status"],
  "components.jsonl": ["name", "node_id"],
  "archived.jsonl":   ["frame_name", "node_id", "reason", "archived_at"],
};
// node-ID-bearing fields per collection, checked for uniqueness within that collection
const NODE_FIELDS = {
  "flows.jsonl":      [],
  "frames.jsonl":     ["wireframe_node_id", "hifi_node_id"],
  "components.jsonl": ["node_id"],
  "archived.jsonl":   ["node_id"],
};

// --- 1. every line parses; required fields present; node IDs are non-empty strings
const parsed = {};
for (const file of Object.keys(REQUIRED)) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) { err(`${file}: missing`); parsed[file] = []; continue; }
  const rows = [];
  fs.readFileSync(p, "utf8").split("\n").forEach((line, i) => {
    if (!line.trim()) return;
    let rec;
    try { rec = JSON.parse(line); }
    catch (e) { err(`${file}:${i + 1} does not parse — ${e.message}`); return; }
    for (const f of REQUIRED[file]) {
      if (rec[f] === undefined || rec[f] === "" || rec[f] === null)
        err(`${file}:${i + 1} missing required field "${f}"`);
    }
    for (const f of NODE_FIELDS[file]) {
      if (rec[f] === undefined || rec[f] === "") continue;   // optional / not yet set
      if (typeof rec[f] !== "string")
        err(`${file}:${i + 1} "${f}" must be a string, got ${typeof rec[f]} — node IDs are never numeric`);
    }
    if (rec.status !== undefined && !STATUSES.includes(rec.status))
      err(`${file}:${i + 1} status "${rec.status}" not in ${STATUSES.join("|")}`);
    rows.push({ rec, line: i + 1 });
  });
  parsed[file] = rows;
}

// --- 2. node IDs unique per collection
for (const [file, fields] of Object.entries(NODE_FIELDS)) {
  const seen = new Map();
  for (const { rec, line } of parsed[file] ?? []) {
    for (const f of fields) {
      const v = rec[f];
      if (!v) continue;
      if (seen.has(v)) err(`${file}:${line} node ID "${v}" (${f}) already used on line ${seen.get(v)}`);
      else seen.set(v, line);
    }
  }
}

// --- 3. primary-key uniqueness
const uniq = (file, field) => {
  const seen = new Map();
  for (const { rec, line } of parsed[file] ?? []) {
    const v = rec[field];
    if (v === undefined) continue;
    if (seen.has(v)) err(`${file}:${line} duplicate ${field} "${v}" (also line ${seen.get(v)})`);
    else seen.set(v, line);
  }
};
uniq("flows.jsonl", "flow_id");
uniq("frames.jsonl", "id");
uniq("components.jsonl", "name");

// --- 4. frames.flow_id resolves to a registered flow
const flowIds = new Set((parsed["flows.jsonl"] ?? []).map(({ rec }) => rec.flow_id));
for (const { rec, line } of parsed["frames.jsonl"] ?? []) {
  if (rec.flow_id && !flowIds.has(rec.flow_id))
    err(`frames.jsonl:${line} flow_id "${rec.flow_id}" not found in flows.jsonl`);
}

// --- 5. flow-status rollup consistency (mirrors the State Safety rule in the routers)
for (const { rec: flow, line } of parsed["flows.jsonl"] ?? []) {
  const fr = (parsed["frames.jsonl"] ?? []).map((x) => x.rec).filter((f) => f.flow_id === flow.flow_id);
  if (!fr.length) continue;
  const allDone = fr.every((f) => f.status === "done");
  if (allDone && flow.status !== "done")
    err(`flows.jsonl:${line} "${flow.flow_id}" — every frame is done but flow status is "${flow.status}"`);
  if (!allDone && flow.status === "done")
    err(`flows.jsonl:${line} "${flow.flow_id}" — flow is done but ${fr.filter((f) => f.status !== "done").length} frame(s) are not`);
}

// --- 6. index.md agrees with the shards
const idxPath = path.join(dir, "index.md");
if (!fs.existsSync(idxPath)) err("index.md: missing — run node scripts/build-index.mjs");
else {
  try {
    if (fs.readFileSync(idxPath, "utf8") !== buildIndex(readStore(dir)))
      err("index.md is stale — run node scripts/build-index.mjs");
  } catch (e) { err(`index.md: could not verify — ${e.message}`); }
}

// --- 7. router parity: AGENTS.md body must equal CLAUDE.md body (line 5 onward)
const body = (f) => fs.readFileSync(f, "utf8").split("\n").slice(4).join("\n");
if (fs.existsSync("CLAUDE.md") && fs.existsSync("AGENTS.md") && body("CLAUDE.md") !== body("AGENTS.md"))
  err("AGENTS.md body has drifted from CLAUDE.md — the two must differ only in their 4-line header");

const counts = Object.fromEntries(Object.keys(REQUIRED).map((f) => [f, (parsed[f] ?? []).length]));
console.log(`store: ${dir}`);
console.log("  " + Object.entries(counts).map(([f, n]) => `${f.replace(".jsonl", "")}=${n}`).join("  "));
if (errors.length) {
  console.error(`\nFAIL — ${errors.length} error(s):`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log("\nPASS — all checks clean");
