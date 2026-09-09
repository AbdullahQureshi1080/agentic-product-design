#!/usr/bin/env node
// Measure context cost, old store vs new, for three real access patterns.
//   node scripts/measure-tokens.mjs
// Bytes are exact. Token figures are a bytes/4 approximation — no tokenizer was
// available offline. The RATIO is the finding and is robust to that constant.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { migrate, writeStore, readStore } from "./migrate-store.mjs";
import { buildIndex } from "./build-index.mjs";

const tok = (b) => Math.round(b / 4);
const rows = [];
const row = (scenario, before, after) => rows.push({
  scenario, before, after,
  cut: `${(100 - (100 * after) / before).toFixed(0)}%`,
});

// ---- synthetic populated project: 10 flows x 12 frames, 25 components ----
const flows = {};
for (let f = 1; f <= 10; f++) {
  const id = `CORE-${String(f).padStart(2, "0")}`;
  const frames = [];
  for (let s = 1; s <= 12; s++)
    frames.push({
      id: `${id}/${String(s).padStart(2, "0")}`, label: `Screen ${s}`,
      frame_name: `${id} / ${String(s).padStart(2, "0")}-screen — Screen ${s}`,
      wireframe_node_id: `${100 + f}:${1000 + s}`,
      hifi_node_id: `${200 + f}:${2000 + s}`, status: "done",
    });
  flows[id] = { flow_id: id, name: `Flow ${f}`, status: "done",
                wireframe_location: "Wireframes", hifi_location: "Hi-Fi", frames };
}
const components = {};
for (let c = 1; c <= 25; c++)
  components[`Component${c}`] = { name: `Component${c}`, node_id: `9${c}:${c}`,
    variants: "Style=Primary|Secondary, Size=SM|MD|LG", used_in: ["201:2002"], notes: "" };

const legacyDoc = JSON.parse(fs.readFileSync("figma-map.legacy.json", "utf8"));
const populated = {
  _note: legacyDoc._note, _schema: legacyDoc._schema, mcp_rules: legacyDoc.mcp_rules,
  status_key: legacyDoc.status_key,
  product: "Demo", figma_file_key: "abc123", figma_file_url: "https://figma.com/design/abc123/X",
  hifi_organization: "page-per-flow", last_session: "2026-09-09",
  pages: { Screens: "0:1" }, flows, components, archived: {},
};

const monolith = JSON.stringify(populated, null, 2);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "measure-"));
writeStore(tmp, migrate(populated));
const store = readStore(tmp);
const index = buildIndex(store);
const framesAll = fs.readFileSync(path.join(tmp, "frames.jsonl"), "utf8");
const oneFlow = framesAll.split("\n").filter((l) => l.includes('"CORE-01"')).join("\n");
const names = framesAll.match(/"frame_name":"[^"]*"/g).join("\n");

row("Session start (index / status check)", monolith.length, index.length);
row("Design work on one flow (12 frames)", monolith.length, index.length + oneFlow.length);
row("Full coverage scan (names only)",     monolith.length, index.length + names.length);
row("Full coverage scan (whole shard)",    monolith.length, index.length + framesAll.length);

console.log("CONTEXT COST — 10 flows / 120 frames / 25 components\n");
console.log("| scenario | before (bytes) | after (bytes) | before (~tok) | after (~tok) | reduction |");
console.log("|---|---|---|---|---|---|");
for (const r of rows)
  console.log(`| ${r.scenario} | ${r.before.toLocaleString()} | ${r.after.toLocaleString()} ` +
              `| ${tok(r.before).toLocaleString()} | ${tok(r.after).toLocaleString()} | **${r.cut}** |`);

// ---- the shipped empty template ----
const emptyOld = fs.statSync("figma-map.legacy.json").size;
const emptyNew = fs.statSync("figma-map/index.md").size + fs.statSync("figma-map/meta.json").size;
console.log(`\nShipped empty template: ${emptyOld} B -> ${emptyNew} B ` +
            `(index + meta; schema.md is loaded only when writing a record)`);
console.log(`Legacy file was ${((100 * 2506) / emptyOld).toFixed(0)}% documentation scaffolding, 0 data records.`);
fs.rmSync(tmp, { recursive: true, force: true });
