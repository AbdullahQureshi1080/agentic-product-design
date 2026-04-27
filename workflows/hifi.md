# Hi-Fi Phase

> Loaded by the router after wireframes are approved. Load alongside `conventions.md`.
> Wireframes are never modified during hi-fi — they remain the reference throughout.
> When all frames are approved, update `figma-map.json` and report done.

Only starts after the designer explicitly approves wireframes.

---

## Step 3.5 — Hi-Fi Setup (mandatory)

Before building any hi-fi frames, establish where they will live. Ask the designer:

```
Where should I build the hi-fi designs?

A) Same page, separate sections — wireframes stay in a "Wireframes" section,
   hi-fi builds in a "Hi-Fi" section on the same page.

B) Separate page per flow — e.g., "AUTH-01 — Wireframes" and "AUTH-01 — Hi-Fi"
   as distinct Figma pages.

C) Same page, hi-fi adjacent — hi-fi frames placed directly to the right of
   each wireframe frame on the same page, no formal sections.
```

Record the choice in `context.md` as `hifi_organization` and in `figma-map.json`.

Create the hi-fi destination (section or page) via MCP before building any frames.
Confirm to designer: "Hi-fi will be built in [location]. Wireframes stay untouched as reference."

**Wireframes are never modified, overwritten, or deleted. They serve as the reference for the entire hi-fi phase.**

---

## Step 4 — Hi-Fi Build

Say: "Moving to hi-fi. Applying your design system now."

1. Read `context.md Section 3` for token values.
2. Confirm Variables are live in the Figma file via MCP.
3. For each screen, **create a new hi-fi frame** in the designated hi-fi location. Do not touch the wireframe frame.
   - Reference the wireframe frame visually — read its structure, layout, and layer hierarchy via MCP.
   - Build the hi-fi frame from that reference: same layout, same content, same hierarchy — with the design system applied.
   - Name hi-fi frames with the same convention: `[FLOW_ID] / [SCREEN_ID] — [Label]`
4. Apply per layer:
   - Color Variable bindings
   - Text style bindings
   - Spacing tokens
   - Component library instances (never detach)
5. After each frame: screenshot, verify zero raw values anywhere.
6. Record the hi-fi frame's node ID in `figma-map.json → flows → frames → hifi_node_id`.
7. For each component instance placed: add the screen's `hifi_node_id` to that component's `used_in` array in `figma-map.json → components`. Do this at the end of the frame, not after every layer.
8. When all frames built: run full 5-pass audit from `prompts.md → Section 4`.
9. Report: `APPROVE` / `APPROVE WITH MINOR FIXES` / `REVISE AND REAUDIT`.

---

## Step 5 — Completion

On `APPROVE`:
- Update `figma-map.json` — set flow status `done`, confirm all `hifi_node_id` fields are populated.
- Regenerate the component library section of `context.md` from `figma-map.json → components`. For each component list: name, variant count, and count of `used_in` entries. Overwrite the previous list entirely — `figma-map.json` is the source of truth, not `context.md`.
- Write one-line decision log entry to `context.md Section 4` for any significant choice.
- Tell designer: "Done. [N] hi-fi frames live in [location] — all layers use token names. Wireframes preserved in [wireframe location]. Ready for dev."
