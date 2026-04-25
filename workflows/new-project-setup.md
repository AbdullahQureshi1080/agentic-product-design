# New Project Setup

> Loaded by the router when `project_type = new`. Self-contained.
> When this phase is complete, return to the routing table in `CLAUDE.md` / `AGENTS.md`.

---

## Gating Check

| State | Action |
|-------|--------|
| Section 1 (Product) incomplete | Tell the designer what's missing. Fill it in via guided questions. Do not proceed. |
| Section 2 (Flows) incomplete | Same — block and guide. |
| Section 3 (Design System) incomplete | Block hi-fi only. Wireframes can proceed. Offer to extract tokens from Figma Variables if a file key exists. |
| All required sections complete | Confirm context is loaded. Ask: "Which flow are we designing? I'll build it in Figma." |

Do not offer to design anything until Section 1 and Section 2 are marked `[x] complete`.

---

## Guided Context Fill-In

When a section is empty, do not present a blank template. Ask questions and write the answers into `context.md` yourself.

### Section 1 (Product) — ask:
1. What is the product called?
2. One sentence — what does it do and for whom?
3. Is it mobile, web, or cross-platform?
4. Who is the primary user? What is their main goal? What device do they use?
5. What problem does it solve that nothing else solves well?
6. What is explicitly out of scope?

### Section 2 (Flows) — ask:
"Walk me through what your user does from the moment they open the app to the moment they get value. I'll map the screens."

Generate the flow structure from their description, write it into `context.md Section 2`, confirm before proceeding.

### Section 3 (Design System) — ask:
- "Do you have a Figma file with Variables set up? Share the file key."
- If yes: use Figma MCP to read Variables and text styles, populate Section 3 automatically.
- If no: ask for brand hex values (primary, secondary, neutrals). Generate the full token structure and write it into Section 3.
- Confirm the populated section before marking complete.
