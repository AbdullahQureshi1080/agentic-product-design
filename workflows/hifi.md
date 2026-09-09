# Hi-Fi Phase

> Loaded by the router after wireframes are approved. Load alongside `conventions.md`.
> Wireframes are never modified during hi-fi — they remain the reference throughout.
> When all frames are approved, update the state store, regenerate the index, and report done.

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

Record the choice in `context.md` as `hifi_organization` and in `figma-map/meta.json`.

> **Cross-page prototype constraint:** If any two flows need a live, working prototype link between screens, those flows must be on the same Figma page — the Plugin API rejects cross-page `NAVIGATE`/`OVERLAY` reactions. Surface this constraint now, before creating any pages or frames. If the flows must stay on separate pages, the prototype link will be documentation-only (noted in `context.md`, not a real Figma connection). See `conventions.md → Cross-Page Prototype Constraint`.

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
6. Record the hi-fi frame's node ID as `hifi_node_id` on that frame's line in `figma-map/frames.jsonl`. Store the exact string MCP returned.
7. For each component instance placed: add the screen's `hifi_node_id` to that component's `used_in` array in `figma-map/components.jsonl`. Do this at the end of the frame, not after every layer.
8. When all frames built: run full 5-pass audit from `prompts.md → Section 4`.
9. Report: `APPROVE` / `APPROVE WITH MINOR FIXES` / `REVISE AND REAUDIT`.

---

## Step 5 — Completion

On `APPROVE`:
- Update `figma-map/flows.jsonl` — set flow status `done`, confirm every frame line for the flow has `hifi_node_id` populated. Then run `node scripts/build-index.mjs` and `node scripts/validate-store.mjs`.
- Regenerate the component library section of `context.md` from `figma-map/components.jsonl`. For each component list: name, variant count, and count of `used_in` entries. Overwrite the previous list entirely — the state store is the source of truth, not `context.md`.
- Write one-line decision log entry to `context.md Section 4` for any significant choice.
- Tell designer: "Done. [N] hi-fi frames live in [location] — all layers use token names. Wireframes preserved in [wireframe location]. Ready for dev."
