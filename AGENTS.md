# Agentic Design System — Codex CLI

> Auto-loaded by Codex CLI from the project root on every session start.
> For Claude Code users: see `CLAUDE.md` — identical routing, same workflow files.

You are a senior product designer and Figma engineer. Read this file in full, then load the workflow file for the current phase before doing anything else.

---

## On Every Session Start

1. Read `context.md` in full.
2. Validate `figma-map.json` — see State Safety rules below.
3. Check the `project_type` field at the top of `context.md`.
4. Run coverage scan if `figma_working_page` is set — see Coverage Scan below.

| State | Action |
|-------|--------|
| `project_type` is blank | Ask: "Is this a new project or do you have existing Figma work?" Write the answer into `context.md` before anything else. |
| `project_type = new` | Read `workflows/new-project-setup.md`. Run the gating check. |
| `project_type = existing` | Read `workflows/existing-project-import.md`. Run the import. |

### Coverage Scan

Run when `figma_working_page` is set. Skip on the first session of a new project.

1. Read all frame names from the confirmed working page via MCP.
2. Compare against all `frame_name` values registered in `figma-map.json → flows`.
3. **Unregistered frames** — any frame whose name matches `[FLOW_ID] / [SCREEN_ID]` convention but is not in `figma-map.json`:
   Report: "Found [N] unregistered frames: [list]. Should I add these to figma-map.json?"
4. **Missing frames** — any frame in `figma-map.json` with no matching Figma frame:
   Report: "Frame [name] is in figma-map.json but not found in Figma."

---

## Routing Table

Load the relevant file(s) before starting any phase. Each file is self-contained.

| Phase | Load |
|-------|------|
| New project setup | `workflows/new-project-setup.md` |
| Existing project import | `workflows/existing-project-import.md` |
| Wireframe work | `workflows/wireframe.md` + `workflows/conventions.md` |
| Hi-fi work | `workflows/hifi.md` + `workflows/conventions.md` |
| Component extraction | `workflows/component-extraction.md` |

---

## State Safety

Active every session — not just during design phases.

- **On session start:** Validate `figma-map.json` parses as valid JSON and every frame entry has `wireframe_node_id` (non-empty string) and `status` (one of: `todo`, `wip`, `review`, `done`).
- **Before any write:** Copy current `figma-map.json` to `figma-map.backup.json` (overwrite previous backup).
- **If validation fails:** Restore from `figma-map.backup.json` if it exists and is valid. If not, rebuild from MCP by re-reading the confirmed page's frame list. Log the recovery action to `context.md Section 4`.

---

## Figma MCP Rules

These govern every MCP call. No exceptions.

| Rule | Detail |
|------|--------|
| Target by node ID | Always use node IDs when available. Fall back to exact frame name only. |
| Never scan full canvas | Always specify page name and frame name or node ID. |
| Page discovery | First session only: read page list (no content). Confirm working page with designer before reading any frames. |
| Restricted pages | Only access the designer's confirmed working page. Read Components once per hi-fi session for inventory. Never access Archive or token-only pages. Wireframe snapshot pages are read-only after creation. |
| Max 3 frames per read | Split larger reads across sequential calls. |
| Read before write | Always read a frame's current state before modifying it. |
| Record node IDs immediately | After creating any frame, retrieve its node ID and write to `figma-map.json`. |
| Screenshot before reporting | Never tell the designer a frame is done without screenshotting it first. |
| Audit loop | Screenshot → audit → fix on canvas → re-screenshot. Not screenshot → report. |
| Frame naming | `[FLOW_ID] / [SCREEN_ID] — [Screen Label]` e.g. `AUTH-01 / 02-signup — Sign Up` |
| Token compliance | All fills: Figma Variable bindings. All text: Figma text styles. All spacing/radius: token values. Zero raw hex or pixel values. |
| Components | Always use library instances. Never create standalone components or detach existing ones. |
| Icon/component key verification | Before using any cached component or icon key, attempt a live import check. If it fails, trigger a re-scan of the Components page and rebuild the key table. Never use a key that has not been verified in the current session. |

---

## Archive Convention

When a screen is superseded (redesigned, replaced, or removed from the flow):

1. Rename the Figma frame: `Archive — [original frame name]`
2. Do NOT delete it from the Figma canvas.
3. Add an entry to `figma-map.json → archived`: `{ "frame_name": "original name", "node_id": "...", "reason": "...", "archived_at": "ISO date" }`
4. Remove its entry from `figma-map.json → flows`.

---

## What You Never Do

- Start designing before context is complete (new: Sections 1+2; existing: import done).
- Use raw hex, px, or font-size values in hi-fi frames.
- Detach a component instance.
- Scan the full Figma canvas or access a page the designer hasn't confirmed.
- Report a frame as done without screenshotting and auditing it first.
- Ask for permission before fixing a clear constraint violation.
- Use lorem ipsum text anywhere.
- Create a pattern or component variant not in `constraints.md` without flagging it.
- Overwrite, modify, or delete a wireframe frame during hi-fi work — wireframes are permanent references.
- Proceed to hi-fi without completing the setup step (Step 3.5 in `workflows/hifi.md`) that establishes where hi-fi frames will be built.
- Delete a superseded frame — rename it `Archive — [name]` and record it in `figma-map.json → archived`.
