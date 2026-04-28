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

4. **After all frames in the flow are built:** Run the full constraint pass (C-01 through C-23 in `constraints.md`).

### Screen architecture standard

Every screen on every platform uses the same 3-zone VERTICAL auto-layout structure:

```
screen  →  layoutMode: VERTICAL, platform-appropriate dimensions
  nav-bar     FIXED height   — navigation component
  content     FILL height    — all page content (scrollable)
  action-bar  FIXED height   — conditional, only when CTA must always be visible
```

Platform dimensions and zone heights:

| Platform | Frame width | nav-bar | action-bar |
|----------|-------------|---------|------------|
| Mobile | 390px | 56px (Screen Header) | 80px (CTA bar) or omit |
| Tablet | 768px | 60px (Tablet Nav) | 80px or omit |
| Web desktop | 1440px | 64px (Top Navigation) | Omit — CTAs inline in content |

**action-bar is conditional.** Use it only when the primary action must remain permanently visible (e.g. checkout, save). Omit it when actions are inline within content.

### Per-frame build rules

Use `use_figma` for each frame:
- Create frame with correct dimensions per platform (see above)
- Set `layoutMode = VERTICAL` — never use absolute positioning (`layoutMode = NONE`)
- Build the 3 zones in order: nav-bar → content → action-bar (if needed)
- Name every layer semantically — never leave auto-generated names (`Frame`, `Frame 2`, `Artboard`)
- Grayscale fills only — no tokens, no color at wireframe stage

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
