# Plugin API Gotchas

> Read once per session alongside `context.md`. Append-only as new behaviors are discovered.
> These are non-obvious Plugin API behaviors grounded in real bugs — not speculative.

---

## Variable IDs must be fully prefixed

**Expected:** A bare variable ID like `'6:46'` works in `getVariableByIdAsync`.
**What actually happens:** `getVariableByIdAsync('6:46')` silently returns `null`. `setBoundVariableForPaint` silently no-ops. The fill quietly stays unbound — no error is thrown.
**Workaround:** Always use the full prefixed form: `'VariableID:6:46'`. Verify the ID format when reading Variables via MCP before passing them to any binding call.

---

## `node.clone()` prototype reactions are undefined behavior

**Expected:** Cloning a node either reliably preserves or reliably drops prototype reactions pointing outside the cloned subtree.
**What actually happens:** Observed both behaviors across different clones in the same session. The behavior is not consistent and has not been root-caused.
**Workaround:** Always verify reactions after any `node.clone()` call. Do not assume either outcome.

---

## Cross-page prototype reactions are rejected outright

**Expected:** A `NAVIGATE` or `OVERLAY` prototype reaction can link frames on different Figma pages.
**What actually happens:** The Plugin API rejects cross-page reactions. If two flows on separate pages need a live prototype link, it cannot be built.
**Workaround:** Decide before building: either co-locate the linked flows on one page, or accept the link is documentation-only (note it in `context.md`, not a real prototype connection). See also the cross-page prototyping note in `conventions.md`.

---

## New frames have an implicit opaque white fill

**Expected:** A newly created `createAutoLayout()` or `createFrame()` node starts transparent.
**What actually happens:** It starts with a default opaque white fill. Left unset, this fill visibly ghosts behind child content in dark or transparent-background designs.
**Workaround:** Explicitly set or clear the fill on every new frame node before adding children.

---

## Auto-layout children ignore manual `y` unless positioned absolutely

**Expected:** Setting `child.y = 100` inside an auto-layout parent repositions the child.
**What actually happens:** The auto-layout engine silently resets the child to its flow position on every relayout. The manual `y` value has no effect.
**Workaround:** Set `child.layoutPositioning = 'ABSOLUTE'` before setting `child.y` (or `child.x`). Only do this for elements that genuinely need to escape document flow.

---

## Custom vector icons need explicit SCALE constraints

**Expected:** An icon placed inside an instance resizes cleanly when the containing instance is resized.
**What actually happens:** Without an explicit `SCALE` constraint on the child geometry, the icon distorts or breaks on resize.
**Workaround:** Set `SCALE` constraints on vector icon child geometry explicitly after creation.

---

## Pages cannot be deleted via the Plugin API

**Expected:** `page.remove()` exists and removes the page.
**What actually happens:** `page.remove()` is not supported. There is no page deletion in the Plugin API.
**Workaround:** Rename the page to mark it as archived (e.g., `Archive — [original name]`) rather than deleting it. This mirrors the frame Archive Convention.

---

## `get_figjam` can time out on large boards

**Expected:** `get_figjam` reliably reads a FigJam board regardless of size.
**What actually happens:** On large boards, the call times out before returning content.
**Workaround:** Fall back to tiled high-resolution `get_screenshot` calls. Divide the board into quadrants and take one screenshot per quadrant to extract content when `get_figjam` fails.
