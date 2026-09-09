# Figma Map — Index

> **Generated file. Do not edit by hand.** Regenerate with `node scripts/build-index.mjs`.
> `scripts/validate-store.mjs` fails if this file disagrees with the shards.

**Read this file first, every session.** Most questions are answered here without
opening a shard. Then grep the one shard you need. Never load a whole shard into
context unless the task requires the full collection.

---

## Project

| Field | Value |
|-------|-------|
| Product | — |
| Figma file key | — |
| Hi-fi organization | — |
| Last session | — |

## Shards

| shard | records |
|-------|---------|
| flows.jsonl | 0 |
| frames.jsonl | 0 |
| components.jsonl | 0 |
| archived.jsonl | 0 |

Field definitions: `figma-map/schema.md`.

## Flows

| flow | name | location | status | frames done |
|------|------|----------|--------|-------------|
| — | _no flows registered yet_ | — | — | — |

---

## Grep Recipes

```bash
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
```
