#!/usr/bin/env node
// Generate figma-map/index.md from the shards. index.md is derived, never hand-edited.
//   node scripts/build-index.mjs [storeDir]

import fs from "node:fs";
import path from "node:path";
import { readStore } from "./migrate-store.mjs";

const dir = process.argv[2] ?? "figma-map";

export function buildIndex(s) {
  const counts = [
    ["flows.jsonl", s.flows.length],
    ["frames.jsonl", s.frames.length],
    ["components.jsonl", s.components.length],
    ["archived.jsonl", s.archived.length],
  ];

  const framesOf = (id) => s.frames.filter((f) => f.flow_id === id);
  const doneOf = (id) => framesOf(id).filter((f) => f.status === "done").length;

  const flowRows = s.flows.length
    ? s.flows.map((f) =>
        `| ${f.flow_id} | ${f.name} | ${f.hifi_location || f.wireframe_location || "—"} ` +
        `| ${f.status} | ${doneOf(f.flow_id)}/${framesOf(f.flow_id).length} |`).join("\n")
    : "| — | _no flows registered yet_ | — | — | — |";

  return `# Figma Map — Index

> **Generated file. Do not edit by hand.** Regenerate with \`node scripts/build-index.mjs\`.
> \`scripts/validate-store.mjs\` fails if this file disagrees with the shards.

**Read this file first, every session.** Most questions are answered here without
opening a shard. Then grep the one shard you need. Never load a whole shard into
context unless the task requires the full collection.

---

## Project

| Field | Value |
|-------|-------|
| Product | ${s.meta.product || "—"} |
| Figma file key | ${s.meta.figma_file_key || "—"} |
| Hi-fi organization | ${s.meta.hifi_organization || "—"} |
| Last session | ${s.meta.last_session || "—"} |

## Shards

| shard | records |
|-------|---------|
${counts.map(([f, n]) => `| ${f} | ${n} |`).join("\n")}

Field definitions: \`figma-map/schema.md\`.

## Flows

| flow | name | location | status | frames done |
|------|------|----------|--------|-------------|
${flowRows}

---

## Grep Recipes

\`\`\`bash
# every frame in one flow
grep '"flow_id":"AUTH-01"' figma-map/frames.jsonl

# one frame by screen ID
grep '"id":"AUTH-01/02"' figma-map/frames.jsonl

# locate any node ID across the store
grep -rn '"12:34"' figma-map/*.jsonl

# frames not yet finished
grep -v '"status":"done"' figma-map/frames.jsonl

# frames still awaiting hi-fi
grep -v '"hifi_node_id"' figma-map/frames.jsonl
\`\`\`
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const idx = buildIndex(readStore(dir));
  fs.writeFileSync(path.join(dir, "index.md"), idx);
  console.log(`wrote ${dir}/index.md (${idx.length} bytes)`);
}
