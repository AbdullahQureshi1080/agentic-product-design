# State Store Schema

> Field definitions for every collection in `figma-map/`.
> Load this file **only** when you need to write a record or resolve a field question.
> It is documentation, not state — it is never loaded as part of routine session work.

---

## Store Layout

| File | Format | Contents |
|------|--------|----------|
| `index.md` | Markdown | Record counts + one row per flow. **Read this first, every session.** |
| `schema.md` | Markdown | This file. Field definitions. |
| `meta.json` | JSON | Project scalars — file key, working page, hi-fi organization. Small, read whole. |
| `flows.jsonl` | JSONL | One record per flow. |
| `frames.jsonl` | JSONL | One record per screen frame. Flattened, keyed to a flow by `flow_id`. |
| `components.jsonl` | JSONL | One record per library component. |
| `archived.jsonl` | JSONL | One record per superseded frame. Append-only. |

Validation and migration scripts live in `scripts/`, deliberately **outside** this
directory, so that a `grep` across `figma-map/` returns only data records and never
script source.

---

## Reading Rules

1. **`index.md` first.** It carries the counts and the flow table. Most questions are
   answered there without opening a shard.
2. **Then grep the shard you need.** `grep '"flow_id":"CORE-01"' figma-map/frames.jsonl`
   returns complete, individually parseable records.
3. **Never load a whole shard into context** unless the task genuinely requires the
   full collection — a coverage scan or a store-wide audit. Per-flow design work
   never does.

---

## JSONL Format

One JSON object per line. No wrapping array, no trailing commas. The file as a whole
is not valid JSON; **every individual line is**. A malformed line costs one record,
not the entire store.

Write records with compact separators (no spaces after `:` or `,`) so grep patterns
like `'"flow_id":"CORE-01"'` match reliably.

**Appending is the default write.** To add records, append lines. Do not read,
mutate, and rewrite a whole shard — that is what the previous monolithic file
required and what this structure exists to avoid. Rewrite a shard only when
updating or deleting an existing record.

---

## Node ID Handling

**Node IDs are opaque strings. Never transform them.**

- Store the exact string the Figma MCP returns.
- Never parse, split, zero-pad, or numerically coerce a node ID.
- Never normalise between the `:` form (`12:34`, returned by the API) and the `-` form
  (`12-34`, used in Figma URLs). Store what you were given.
- Node IDs are always JSON strings, never JSON numbers. `12:34` is not a number, and a
  value like `1234` would be silently corrupted by numeric coercion.

Figma **Variable** IDs are a separate namespace and must carry their full prefix
(`VariableID:6:46`). See `workflows/gotchas.md` — the unprefixed form silently
returns `null`.

---

## Collections

### `meta.json`

Project-level scalars. Read whole; it does not grow with the project.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `product` | string | yes | Product name. |
| `figma_file_key` | string | yes | Segment after `/design/` in the file URL. |
| `figma_file_url` | string | no | Full file URL. |
| `hifi_organization` | string | no | `same-page-sections` \| `page-per-flow` \| `same-page-adjacent` |
| `last_session` | string | no | ISO date. |
| `pages` | object | no | Discovered page names. Populated at import. |

`figma_working_page` deliberately lives in `context.md`, not here — the routers read it
from there during the session-start coverage scan. Do not duplicate it into this file.

---

### `flows.jsonl`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `flow_id` | string | yes | `[DOMAIN]-[NUMBER]`, e.g. `AUTH-01`. Unique. |
| `name` | string | yes | Human-readable flow name. |
| `status` | enum | yes | `todo` \| `wip` \| `review` \| `done` |
| `wireframe_location` | string | no | Figma page or section holding the wireframes. |
| `hifi_location` | string | no | Set in `workflows/hifi.md` Step 3.5. |

```
{"flow_id":"AUTH-01","name":"Sign Up","status":"wip","wireframe_location":"Wireframes","hifi_location":"Hi-Fi"}
```

---

### `frames.jsonl`

Frames are **flat**, not nested under flows. Each carries a `flow_id` foreign key.
This is what makes per-flow `grep` return whole records.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `flow_id` | string | yes | Must resolve to a `flow_id` in `flows.jsonl`. |
| `id` | string | yes | Screen ID, e.g. `AUTH-01/02`. Unique. |
| `label` | string | yes | Screen label. |
| `frame_name` | string | yes | Exact Figma frame name: `[FLOW_ID] / [SCREEN_ID] — [Label]` |
| `wireframe_node_id` | string | yes | Non-empty. See Node ID Handling. |
| `hifi_node_id` | string | **no** | Absent or `""` until the hi-fi phase. A wireframe-stage frame legitimately has no hi-fi node. |
| `status` | enum | yes | `todo` \| `wip` \| `review` \| `done` |

```
{"flow_id":"AUTH-01","id":"AUTH-01/02","label":"Sign Up","frame_name":"AUTH-01 / 02-signup — Sign Up","wireframe_node_id":"12:34","hifi_node_id":"","status":"wip"}
```

---

### `components.jsonl`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Component name, e.g. `Button`. Unique. |
| `node_id` | string | yes | Node ID of the component set. |
| `variants` | string | no | e.g. `Style=Primary\|Secondary, Size=SM\|MD\|LG` |
| `used_in` | array | no | Screen node IDs. **Written once at promotion time and not maintained.** Never treat as an authoritative usage count — live-scan instead. See `workflows/component-extraction.md`. |
| `notes` | string | no | Non-obvious decisions. |

---

### `archived.jsonl`

Superseded frames. Renamed `Archive — [name]` in Figma, never deleted from canvas.
Append-only.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `frame_name` | string | yes | Original name before archiving. |
| `node_id` | string | yes | Node ID. |
| `reason` | string | yes | Why it was superseded. |
| `archived_at` | string | yes | ISO date. |

---

## Status Values

| Status | Meaning |
|--------|---------|
| `todo` | Not started — no Figma frame exists |
| `wip` | Frame exists, design in progress |
| `review` | Design complete, awaiting designer approval |
| `done` | Approved — ready for dev |

**Flow-status rollup:** when a write brings every frame in a flow to `done`, set that
flow's own `status` to `done` in the same edit. The reverse also holds — a flow marked
`done` must not contain a non-`done` frame. `scripts/validate-store.mjs` enforces both.

---

## Validation

```bash
node scripts/validate-store.mjs
```

Checks: every line parses; required fields present; node IDs unique per collection and
non-empty strings; `flow_id` foreign keys resolve; status values in enum; flow-status
rollup consistent; `index.md` counts match actual line counts; and `AGENTS.md` body is
identical to `CLAUDE.md` body.

---

## Backup

The append-only shard structure replaces the previous
"copy the whole file before every write" rule. A failed append damages at most the
last line, and git history is the recovery path. `figma-map.legacy.json` is retained
as the pre-migration snapshot.
