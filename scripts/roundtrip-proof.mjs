#!/usr/bin/env node
// Prove the migration is lossless: legacy -> shards -> legacy yields identical data.
//   node scripts/roundtrip-proof.mjs
// Runs against (a) a synthetic 120-frame project and (b) the real repo file.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { migrate, reconstruct, writeStore, readStore, DOC_KEYS, DOC_KEY_DISPOSITION } from "./migrate-store.mjs";

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail && !ok ? " — " + detail : ""}`);
  if (!ok) failures++;
};
// order-independent deep equality
const canon = (v) =>
  Array.isArray(v) ? v.map(canon)
  : v && typeof v === "object"
    ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])]))
    : v;
const eq = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
// The template ships "_note"/"_format" example stubs nested inside data keys.
// They are documentation, not records, and are not expected to round-trip.
const stripDocStubs = (v) =>
  Array.isArray(v) ? v.map(stripDocStubs)
  : v && typeof v === "object"
    ? Object.fromEntries(Object.entries(v)
        .filter(([k]) => !k.startsWith("_"))
        .map(([k, x]) => [k, stripDocStubs(x)]))
    : v;

// ---------- synthetic project: 10 flows x 12 frames, 25 components ----------
function synthetic() {
  // deliberately awkward node IDs: colon form, dash form, and a numeric-looking string
  const nodeId = (a, b) => (a % 3 === 0 ? `${a}-${b}` : `${a}:${b}`);
  const flows = {};
  for (let f = 1; f <= 10; f++) {
    const id = `CORE-${String(f).padStart(2, "0")}`;
    const frames = [];
    for (let s = 1; s <= 12; s++) {
      const fr = {
        id: `${id}/${String(s).padStart(2, "0")}`,
        label: `Screen ${s}`,
        frame_name: `${id} / ${String(s).padStart(2, "0")}-screen — Screen ${s}`,
        wireframe_node_id: nodeId(100 + f, 1000 + s),
        status: "done",
      };
      if (s % 2 === 0) fr.hifi_node_id = nodeId(200 + f, 2000 + s);
      frames.push(fr);
    }
    flows[id] = { flow_id: id, name: `Flow ${f}`, status: "done",
                  wireframe_location: "Wireframes", hifi_location: "Hi-Fi", frames };
  }
  // a numeric-looking node ID, to prove no numeric coercion
  flows["CORE-01"].frames[0].wireframe_node_id = "1234";
  const components = {};
  for (let c = 1; c <= 25; c++)
    components[`Component${c}`] = { name: `Component${c}`, node_id: `9${c}:${c}`,
      variants: "Style=Primary|Secondary, Size=SM|MD|LG", used_in: ["201:2002"], notes: "" };
  return {
    product: "Synthetic", figma_file_key: "abc123", figma_file_url: "https://figma.com/design/abc123/X",
    hifi_organization: "page-per-flow", last_session: "2026-09-09",
    pages: { Screens: "0:1" }, flows, components,
    archived: { "OLD-01 / 01-x — X": { frame_name: "OLD-01 / 01-x — X", node_id: "5:5",
      reason: "superseded", archived_at: "2026-01-01" } },
  };
}

function proveRoundTrip(label, legacy) {
  console.log(`\n${label}`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "store-"));
  const shards = migrate(legacy);
  writeStore(tmp, shards);
  const back = reconstruct(readStore(tmp));

  // data keys only — documentation keys are deliberately relocated to schema.md
  const clean = stripDocStubs(legacy);
  const dataKeys = Object.keys(clean).filter((k) => !DOC_KEYS.includes(k));
  const lhs = Object.fromEntries(dataKeys.map((k) => [k, clean[k]]));
  const rhs = Object.fromEntries(dataKeys.map((k) => [k, back[k]]));
  check("data round-trips identically (legacy -> shards -> legacy)", eq(lhs, rhs));

  // every node ID present in the source is present, byte-identical, in the shards
  const collect = (o, out = []) => {
    if (Array.isArray(o)) o.forEach((x) => collect(x, out));
    else if (o && typeof o === "object")
      for (const [k, v] of Object.entries(o)) {
        if (/node_id$/.test(k) && typeof v === "string" && v) out.push(v);
        else collect(v, out);
      }
    return out;
  };
  const src = collect(clean).sort(), dst = collect(back).sort();
  check(`node IDs preserved exactly (${src.length} found)`, eq(src, dst));
  check("every node ID is still a string (no numeric coercion)", dst.every((v) => typeof v === "string"));
  const raw = fs.readFileSync(path.join(tmp, "frames.jsonl"), "utf8");
  const dashIds = src.filter((v) => v.includes("-"));
  check(`dash-form node IDs not normalised to colon form (${dashIds.length} found)`,
        dashIds.every((v) => raw.includes(`"${v}"`)),
        dashIds.find((v) => !raw.includes(`"${v}"`)) ?? "");
  check("frame count preserved", shards.frames.length ===
        Object.values(clean.flows ?? {}).reduce((n, f) => n + (f.frames?.length ?? 0), 0));

  // every documentation key must be accounted for at its declared destination
  for (const [key, d] of Object.entries(DOC_KEY_DISPOSITION)) {
    const present = fs.existsSync(d.to) && fs.readFileSync(d.to, "utf8").includes(d.contains);
    check(`doc key "${key}" relocated to ${d.to}`, present, `"${d.contains}" not found`);
  }

  fs.rmSync(tmp, { recursive: true, force: true });
  return tmp;
}

console.log("ROUND-TRIP PROOF");
proveRoundTrip("A. Synthetic project — 10 flows / 120 frames / 25 components", synthetic());
proveRoundTrip("B. Real repo file — figma-map.legacy.json",
  JSON.parse(fs.readFileSync(fs.existsSync("figma-map.legacy.json") ? "figma-map.legacy.json" : "figma-map.json", "utf8")));

console.log(failures ? `\nFAIL — ${failures} check(s) failed` : "\nPASS — round trip is lossless");
process.exit(failures ? 1 : 0);
