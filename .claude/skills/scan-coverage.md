---
name: scan-coverage
description: Scan a Figma page for unregistered screens — frames that match the flow naming convention but aren't tracked in the figma-map/ state store. Works standalone — only needs a Figma page URL.
---

# /scan-coverage

Scan a Figma page and report any frames that look like flow screens but aren't registered in your project.

**Requires:** Figma MCP connected.
**Does not require:** context.md or the `figma-map/` state store (but uses the store if present).

---

## How to Use

```
/scan-coverage https://figma.com/design/abc123/MyApp?node-id=0:1
```

Or just provide the file URL — the skill will ask which page to scan.

---

## Process

### Step 1 — Identify the page
If a node ID pointing to a page is provided, use it. Otherwise, read the file's page list and ask: "Which page should I scan for coverage?"

### Step 2 — Read all frame names
Call `get_metadata` or equivalent to read all top-level frame names on the confirmed page. Do not read frame content — names only.

### Step 3 — Check naming convention
The flow naming convention is: `[FLOW_ID] / [SCREEN_ID] — [Label]`
Examples: `AUTH-01 / 01-splash — Splash`, `CORE-02 / 03-home — Home`

Classify every frame:
- **Matches convention** → tracked screen candidate
- **Does not match** → skip (may be a section, component, or annotation frame)

### Step 4 — Compare against the state store

Read `figma-map/index.md` first. It carries the flow table and per-flow frame counts,
which is often enough to tell whether a scan is even needed.

Then compare frame-by-frame using grep — do not load `frames.jsonl` into context wholesale
unless the scan genuinely covers every flow:

```bash
# is one specific frame registered?
grep -F '"frame_name":"AUTH-01 / 01-splash — Splash"' figma-map/frames.jsonl

# every registered frame in one flow
grep '"flow_id":"AUTH-01"' figma-map/frames.jsonl

# all registered frame names, for a full-page scan
grep -o '"frame_name":"[^"]*"' figma-map/frames.jsonl
```

A full-page coverage scan is the one routine operation that legitimately reads the whole
`frames.jsonl`. Prefer the last form above — it extracts only the names, not whole records.

Classify each frame:
- **Unregistered** — matches the convention but has no line in `figma-map/frames.jsonl`
- **Missing** — has a line in `figma-map/frames.jsonl` but no matching frame on this page
- **Registered** — present in both

If `figma-map/` does not exist: report all convention-matching frames as unregistered.

### Step 5 — Report

```
COVERAGE SCAN — [Page Name]
Total frames on page: [N]
Matching naming convention: [N]

REGISTERED: [N]
  [list frame names]

UNREGISTERED (in Figma, not in the state store): [N]
  [list frame names]
  → Should these be appended to figma-map/frames.jsonl?

MISSING (in the state store, not in Figma): [N]
  [list frame names]
  → These may have been renamed, archived, or deleted.
```

### Step 6 — On write

If the designer confirms adding unregistered frames, **append** one line per frame to
`figma-map/frames.jsonl` — never rewrite the shard. Field definitions are in
`figma-map/schema.md`. Store node IDs exactly as MCP returned them.

Then regenerate the index and validate:

```bash
node scripts/build-index.mjs
node scripts/validate-store.mjs
```
