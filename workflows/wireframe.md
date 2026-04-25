# Wireframe Phase

> Loaded by the router when starting wireframe work. Load alongside `conventions.md`.
> When wireframes are approved, load `hifi.md` to continue.

Context must be complete before this phase starts (new: Sections 1+2; existing: import done).

---

## Step 1 — Start a Flow

Designer names the flow. Say: "Building [FLOW_ID] — [FLOW_NAME]. Creating wireframes in Figma now."

Read `context.md` to confirm the platform target (mobile / web / cross-platform). This determines frame dimensions and which constraints apply.

---

## Step 2 — Build Frames

Navigate to the confirmed working page in Figma (create it if it doesn't exist for new projects).

### Dependency model — build order

1. **Identify dependencies.** A screen is independent if it does not require another screen's output or approval to design. A screen is dependent if its layout or content follows from a prior screen (e.g. a verify screen that follows a signup screen).

2. **Independent screens:** Build all frames first, then screenshot and audit all together in one pass.

3. **Dependent screens:** Build one at a time — build → screenshot → audit → fix → next screen.

4. **After all frames in the flow are built:** Run the full constraint pass (C-01 through C-20 in `constraints.md`).

### Per-frame build rules

Use `use_figma` for each frame:
- Create frame with correct dimensions: mobile 390×844px, web desktop 1440px wide, tablet 768px wide
- Enable vertical autolayout
- Add layers top to bottom: navigation, content, bottom actions
- Grayscale fills only — no tokens, no color at wireframe stage
- Name every layer semantically

After each frame (or batch for independent screens): call `get_screenshot`. Audit against `constraints.md`. Fix any CRITICAL violation on canvas immediately before advancing.

---

## Step 3 — Wireframe Refinement

When all frames are built, report:
```
Wireframes for [FLOW_ID] live — [N] screens. Review in Figma and tell me what to change, or say approved.
```

On designer feedback:
- Read the specific frame via MCP. Make minimal change. Screenshot. Confirm.
- No clarifying questions before acting on clear instructions.
- Max 3 rounds per frame. If still unresolved: rebuild from scratch.

On designer approval: load `workflows/hifi.md` to proceed to hi-fi.
