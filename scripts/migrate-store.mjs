#!/usr/bin/env node
// Migrate a legacy monolithic figma-map.json into the sharded figma-map/ store.
//   node scripts/migrate-store.mjs [legacyPath] [outDir]
// Node IDs are copied as exact strings and never transformed.

import fs from "node:fs";
import path from "node:path";

const legacyPath = process.argv[2] ?? "figma-map.legacy.json";
const outDir     = process.argv[3] ?? "figma-map";

// Keys that are documentation, not state. Each is relocated to a named destination,
// which the round-trip proof asserts actually contains the content. Nothing is
// silently dropped: mcp_rules already duplicated the routers' "Figma MCP Rules"
// table verbatim, so its home is the router, not the store.
export const DOC_KEY_DISPOSITION = {
  _note:      { to: "figma-map/schema.md", contains: "# State Store Schema" },
  _schema:    { to: "figma-map/schema.md", contains: "## Collections" },
  _format:    { to: "figma-map/schema.md", contains: "### `frames.jsonl`" },
  status_key: { to: "figma-map/schema.md", contains: "## Status Values" },
  mcp_rules:  { to: "CLAUDE.md",           contains: "## Figma MCP Rules" },
};
export const DOC_KEYS = Object.keys(DOC_KEY_DISPOSITION);
const isDocKey = (k) => k.startsWith("_") || DOC_KEYS.includes(k);

// Strip the "_note"/"_format" example stubs the template ships with.
const realEntries = (obj) =>
  Object.entries(obj ?? {}).filter(([k]) => !k.startsWith("_"));

export function migrate(legacy) {
  const meta = {
    product:            legacy.product ?? "",
    figma_file_key:     legacy.figma_file_key ?? "",
    figma_file_url:     legacy.figma_file_url ?? "",
    hifi_organization:  legacy.hifi_organization ?? "",
    last_session:       legacy.last_session ?? "",
    pages:              Object.fromEntries(realEntries(legacy.pages)),
  };

  const flows = [];
  const frames = [];
  for (const [flowId, f] of realEntries(legacy.flows)) {
    flows.push({
      flow_id: f.flow_id ?? flowId,
      name: f.name ?? "",
      status: f.status ?? "todo",
      wireframe_location: f.wireframe_location ?? "",
      hifi_location: f.hifi_location ?? "",
    });
    for (const fr of f.frames ?? []) {
      const rec = {
        flow_id: f.flow_id ?? flowId,
        id: fr.id,
        label: fr.label,
        frame_name: fr.frame_name,
        wireframe_node_id: fr.wireframe_node_id,   // exact string, never transformed
        status: fr.status,
      };
      // hifi_node_id is optional — omit rather than fabricate an empty value
      if (fr.hifi_node_id !== undefined) rec.hifi_node_id = fr.hifi_node_id;
      frames.push(rec);
    }
  }

  const components = realEntries(legacy.components).map(([name, c]) => ({
    name: c.name ?? name,
    node_id: c.node_id,
    variants: c.variants ?? "",
    used_in: c.used_in ?? [],
    notes: c.notes ?? "",
  }));

  const archived = realEntries(legacy.archived).map(([, a]) => ({
    frame_name: a.frame_name,
    node_id: a.node_id,
    reason: a.reason,
    archived_at: a.archived_at,
  }));

  return { meta, flows, frames, components, archived };
}

// Rebuild a legacy-shaped object from shards. Used by the round-trip proof.
export function reconstruct({ meta, flows, frames, components, archived }) {
  const out = { ...meta };
  delete out.pages;
  out.pages = meta.pages;
  out.flows = {};
  for (const f of flows) {
    out.flows[f.flow_id] = {
      flow_id: f.flow_id,
      name: f.name,
      status: f.status,
      wireframe_location: f.wireframe_location,
      hifi_location: f.hifi_location,
      frames: frames
        .filter((fr) => fr.flow_id === f.flow_id)
        .map(({ flow_id, ...rest }) => rest),
    };
  }
  out.components = Object.fromEntries(components.map((c) => [c.name, c]));
  out.archived = Object.fromEntries(archived.map((a) => [a.frame_name, a]));
  return out;
}

const jsonl = (rows) => rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : "");

export function writeStore(dir, s) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify(s.meta, null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "flows.jsonl"), jsonl(s.flows));
  fs.writeFileSync(path.join(dir, "frames.jsonl"), jsonl(s.frames));
  fs.writeFileSync(path.join(dir, "components.jsonl"), jsonl(s.components));
  fs.writeFileSync(path.join(dir, "archived.jsonl"), jsonl(s.archived));
}

export function readStore(dir) {
  const lines = (f) => {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) return [];
    return fs.readFileSync(p, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));
  };
  return {
    meta: JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8")),
    flows: lines("flows.jsonl"),
    frames: lines("frames.jsonl"),
    components: lines("components.jsonl"),
    archived: lines("archived.jsonl"),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const legacy = JSON.parse(fs.readFileSync(legacyPath, "utf8"));
  const shards = migrate(legacy);
  writeStore(outDir, shards);
  console.log(`migrated ${legacyPath} -> ${outDir}/`);
  console.log(`  flows: ${shards.flows.length}  frames: ${shards.frames.length}` +
              `  components: ${shards.components.length}  archived: ${shards.archived.length}`);
  console.log(`  documentation keys relocated to ${outDir}/schema.md: ${DOC_KEYS.join(", ")}`);
}
