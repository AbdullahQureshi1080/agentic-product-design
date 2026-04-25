# Hi-Fi Phase

> Loaded by the router after wireframes are approved. Load alongside `conventions.md`.
> When all frames are approved, update `figma-map.json` and report done.

Only starts after the designer explicitly approves wireframes.

---

## Step 3.5 — Wireframe Snapshot (mandatory)

Before touching any frame for hi-fi:

1. Duplicate the current working page in Figma via MCP.
2. Name the duplicate: `[PAGE_NAME] — Wireframes (Archived)`.
3. Record in `figma-map.json → snapshots`: flow ID, archived page name, current date.
4. Confirm to designer: "Wireframes archived to [page name]. Starting hi-fi on [main page]."

**This step is mandatory. Never proceed to hi-fi without it.**
The archived page is read-only — never modify it after creation.

---

## Step 4 — Hi-Fi Build

Say: "Moving to hi-fi. Applying your design system now."

1. Read `context.md Section 3` for token values.
2. Confirm Variables are live in the Figma file via MCP.
3. Overwrite each wireframe frame — same frame names, same node IDs.
4. Apply per layer:
   - Color Variable bindings
   - Text style bindings
   - Spacing tokens
   - Component library instances (never detach)
5. After each frame: screenshot, verify zero raw values anywhere.
6. When all frames updated: run full 5-pass audit from `prompts.md → Section 4`.
7. Report: `APPROVE` / `APPROVE WITH MINOR FIXES` / `REVISE AND REAUDIT`.

---

## Step 5 — Completion

On `APPROVE`:
- Update `figma-map.json` with node IDs and status `done`.
- Write one-line decision log entry to `context.md Section 4` for any significant choice.
- Tell designer: "Done. [N] frames live in Figma Dev Mode — all layers use token names. Ready for dev."
