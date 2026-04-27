---
name: extract-component
description: Extract a reusable component from an existing Figma hi-fi screen. Measures, surveys variants, builds, and validates. Works standalone — no project context required.
---

# /extract-component

Extract a reusable component from an existing Figma hi-fi screen into your component library.

Provide a Figma node URL pointing to one instance of the element you want to extract.

**Requires:** Figma MCP connected + Figma file with Variables set up.
**Does not require:** context.md or figma-map.json.

---

## How to Use

```
/extract-component https://figma.com/design/abc123/MyApp?node-id=45:67
```

---

## Process

### Step 1 — Confirm the component
State what component you believe this node represents, how many times it appears in the file, and what flows it appears in. Wait for confirmation before continuing.

### Step 2 — Measure the reference node
Call `use_figma` to inspect the node. Record exactly:
- width, height
- paddingTop, paddingRight, paddingBottom, paddingLeft
- itemSpacing, cornerRadius
- fontFamily, fontStyle, fontSize, textStyleId
- fills (variable IDs — not hex values)
- strokes, strokeWeight, strokeAlign
- opacity

Do not write any build code until all measurements are recorded.

### Step 3 — Survey variant instances
Find 2–3 more usages of the same element in the file. Compare to the reference node:
- What changes across usages (size, state, color) = variant axes
- What stays constant (structure, radius, font) = base component

### Step 4 — Define the variant matrix
List only variants that exist on screen or are logically required (e.g. Disabled state).
Use Property=Value naming: `Style=Primary`, `Size=MD`, `State=Default`.
Never invent variants for hypothetical use cases.

### Step 5 — Build
Use `use_figma` to create the component set:
- Every fill and stroke bound to a Figma Variable
- Every text node bound to a text style
- No raw hex values, no raw px values
- Add TEXT component property for any user-facing label
- Default width FIXED — instances set to FILL when used full-width

### Step 6 — Validate
Screenshot the built component. Compare visually against the reference node.
Dimensions, visual weight, and color must match. Fix before reporting done.

### Step 7 — Place and report
Move the component set into the component section of the Figma file.
Report: "Component [NAME] — [N] variants. Screenshot attached."
