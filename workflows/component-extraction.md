# Component Extraction

> Loaded by the router when extracting reusable components from existing hi-fi screens.
> This is not a design phase — you are measuring and codifying what already exists on screen.
> Complete one component fully before loading this file again for the next.

---

## Step 1 — Pick one component

Take one item from the component audit list. State the component name, how many times it appears, and which flows it appears in. Do not start on the next component until the current one is approved.

---

## Step 2 — Find the reference node

Identify the most complete, most polished usage of this element in the Userflows section. This is your ground truth. Get its exact node ID.

---

## Step 3 — Measure the reference node

Call `use_figma` to inspect the reference node. Record exactly:
- width, height
- paddingTop, paddingRight, paddingBottom, paddingLeft
- itemSpacing, cornerRadius
- fontFamily, fontStyle, fontSize, textStyleId
- fills (variable IDs, not hex values)
- strokes, strokeWeight, strokeAlign
- opacity

Do not write any build code until all measurements are recorded.

---

## Step 4 — Survey variant instances

Find 2–3 more usages of the same element across different flows. Compare them to the reference node to identify variant axes — what changes (size, state, color) vs. what is constant (structure, radius, font).

---

## Step 5 — Define the variant matrix

List only the variants that exist on screen or are logically required (e.g. Disabled state). Use Property=Value naming: `Style=Primary`, `Size=MD`, `State=Default`. Never invent variants for hypothetical use cases.

---

## Step 6 — Build

Use `use_figma` to create the component set. Rules:
- Every fill and stroke must be bound to an existing Figma Variable
- Every text node must be bound to an existing text style
- No raw hex values, no raw px values anywhere
- Add a TEXT component property for any user-facing label
- Default width should be FIXED at a sensible default — instances set to FILL when used full-width on screens

---

## Step 7 — Validate against reference

Screenshot the built component. Compare visually against the reference node. Dimensions, visual weight, and color must match. Fix before moving on — never report a component done without this check.

---

## Step 8 — Place in component section

Move the component set into the designated component section in the Figma file. Verify placement via `get_metadata`.

---

## Step 9 — Record and advance

- Add entry to `figma-map.json → components`: node ID, variant spec, notes, and `used_in` array (populated with node IDs of all screens identified during Step 4 variant survey).
- Remove name from `components_todo` list.
- Regenerate the component library section of `context.md` from `figma-map.json → components`. List name, variant count, and `used_in` count per component. Overwrite entirely — `figma-map.json` is the source of truth, not `context.md`.
- Log any non-obvious decisions to `context.md Section 4`.
- Report to designer: "Component [NAME] is live — [N] variants. Screenshot attached. Ready for #[NEXT]."

---

---

## Component Library Health Audit

Run this periodically — after every N flows are completed, or on request. Never rely solely on the `used_in` field in `figma-map.json` for this: it is written once at promotion time and is not maintained as screens evolve.

### Trigger

- After every 3–4 flows are marked done, or when explicitly requested.

### Method

1. Run a live `findAllWithCriteria({ types: ['INSTANCE'] })` scan across all pages.
2. Group instances by `mainComponent` (or parent `COMPONENT_SET` for variant groups).
3. For each group, count which flows the instance appears in by checking parent frame names.

### Tiering

| Usage | Action |
|-------|--------|
| 3+ flows | Promotion-ready — add to the promotion list if not already a library component |
| 2 flows | Watchlist — log it, re-check at the next audit |
| Visually similar but semantically distinct | Log as "not a candidate" with the explicit reason, so future audits don't re-flag it |

### Output

Report the audit findings before taking any promotion action. Do not promote a component without the designer's confirmation.

---

## Rules

- One component at a time. Never start the next until the current is approved.
- The screen is always the source of truth — not memory, not assumption.
- Measure before building, always.
- Validation screenshot is mandatory before reporting done.
- The `used_in` field in `figma-map.json` is written once and is not maintained — never treat it as an authoritative usage count. Always live-scan for usage audits.
