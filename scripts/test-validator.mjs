#!/usr/bin/env node
// Negative tests: deliberately corrupt a store and confirm the validator catches it.
//   node scripts/test-validator.mjs

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { writeStore } from "./migrate-store.mjs";
import { buildIndex } from "./build-index.mjs";

const root = process.cwd();
let failures = 0;

const baseline = () => ({
  meta: { product: "T", figma_file_key: "k", figma_file_url: "", hifi_organization: "", last_session: "", pages: {} },
  flows: [{ flow_id: "AUTH-01", name: "Sign Up", status: "wip", wireframe_location: "W", hifi_location: "H" }],
  frames: [
    { flow_id: "AUTH-01", id: "AUTH-01/01", label: "Splash", frame_name: "AUTH-01 / 01-splash — Splash", wireframe_node_id: "1:1", status: "done" },
    { flow_id: "AUTH-01", id: "AUTH-01/02", label: "Sign Up", frame_name: "AUTH-01 / 02-signup — Sign Up", wireframe_node_id: "1:2", status: "wip" },
  ],
  components: [], archived: [],
});

function run(dir) {
  try {
    execFileSync("node", [path.join(root, "scripts/validate-store.mjs"), dir],
                 { cwd: root, encoding: "utf8", stdio: "pipe" });
    return { code: 0, out: "" };
  } catch (e) { return { code: e.status, out: (e.stdout ?? "") + (e.stderr ?? "") }; }
}

// mutate: (store, dir) => void   — applied after the baseline store is written
function tc(name, expect, mutate) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vtest-"));
  const s = baseline();
  writeStore(dir, s);
  fs.writeFileSync(path.join(dir, "index.md"), buildIndex(s));
  mutate?.(s, dir);
  const { code, out } = run(dir);
  const caught = expect === null ? code === 0 : code === 1 && out.includes(expect);
  console.log(`  ${caught ? "PASS" : "FAIL"}  ${name}`);
  if (!caught) { failures++; console.log(`        expected ${expect === null ? "clean exit" : `"${expect}"`}, got exit ${code}\n${out.split("\n").map(l=>"        "+l).join("\n")}`); }
  fs.rmSync(dir, { recursive: true, force: true });
}

const append = (dir, f, line) => fs.appendFileSync(path.join(dir, f), line + "\n");
const rewrite = (dir, f, rows) => fs.writeFileSync(path.join(dir, f), rows.map(r => JSON.stringify(r)).join("\n") + "\n");

console.log("VALIDATOR NEGATIVE TESTS\n");
tc("clean baseline passes", null);
tc("malformed JSON line", "does not parse",
   (s, d) => append(d, "frames.jsonl", "{not json"));
tc("missing required field", 'missing required field "label"',
   (s, d) => { const f = { ...s.frames[0] }; delete f.label; f.id = "AUTH-01/03"; f.wireframe_node_id = "1:3"; append(d, "frames.jsonl", JSON.stringify(f)); });
tc("duplicate node ID", "already used on line",
   (s, d) => append(d, "frames.jsonl", JSON.stringify({ ...s.frames[0], id: "AUTH-01/09" })));
tc("node ID as a number", "node IDs are never numeric",
   (s, d) => append(d, "frames.jsonl", JSON.stringify({ ...s.frames[0], id: "AUTH-01/04", wireframe_node_id: 1234 })));
tc("duplicate primary key", "duplicate id",
   (s, d) => append(d, "frames.jsonl", JSON.stringify({ ...s.frames[0], wireframe_node_id: "7:7" })));
tc("dangling flow_id foreign key", "not found in flows.jsonl",
   (s, d) => append(d, "frames.jsonl", JSON.stringify({ ...s.frames[0], flow_id: "GHOST-99", id: "GHOST-99/01", wireframe_node_id: "8:8" })));
tc("invalid status value", "not in todo|wip|review|done",
   (s, d) => append(d, "frames.jsonl", JSON.stringify({ ...s.frames[0], id: "AUTH-01/05", wireframe_node_id: "9:9", status: "almost" })));
tc("rollup: all frames done but flow is not", "every frame is done but flow status",
   (s, d) => rewrite(d, "frames.jsonl", s.frames.map(f => ({ ...f, status: "done" }))));
tc("rollup: flow done but a frame is not", "flow is done but 1 frame(s) are not",
   (s, d) => rewrite(d, "flows.jsonl", [{ ...s.flows[0], status: "done" }]));
tc("stale index.md", "index.md is stale",
   (s, d) => fs.writeFileSync(path.join(d, "index.md"), "# stale\n"));
tc("missing index.md", "index.md: missing",
   (s, d) => fs.rmSync(path.join(d, "index.md")));

console.log(failures ? `\nFAIL — ${failures} test(s) failed` : "\nPASS — validator catches every defect class");
process.exit(failures ? 1 : 0);
