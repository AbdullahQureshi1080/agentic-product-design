# Conventions

> Loaded alongside `wireframe.md` or `hifi.md` for every design session.
> These rules apply to all phases.

---

## Flow Naming Convention

| Part | Format | Example |
|------|--------|---------|
| Flow ID | `[DOMAIN]-[NUMBER]` | `AUTH-01`, `CORE-02` |
| Screen ID | `[SEQUENCE]-[slug]` | `01-splash`, `03-verify` |
| Figma frame name | `[FLOW_ID] / [SCREEN_ID] — [Label]` | `AUTH-01 / 01-splash — Splash` |

Common domain prefixes: `AUTH`, `ONBOARD`, `CORE`, `SETTINGS`, `EMPTY`, `ERROR`.

---

## Page Status Emoji Convention

Flow pages (one per user flow) use status emoji to reflect completeness:

| Emoji | Meaning |
|-------|---------|
| ✅ | Done — all frames in the flow are approved |
| ⌛ | In progress — at least one frame is still wip or review |
| ⬜ | Not started — no frames have been built yet |

Rules:
- Status emoji apply **only to flow pages**. Never apply them to structural pages: Cover, Components, Playground, Archive.
- Do not combine status emoji with decorative topic emoji on the same page name.
- Status must reflect an honest completeness assessment of the flow, not simply "every currently-listed frame says done" — if frames are known to be missing, the flow is not done.

---

## Cross-Page Prototype Constraint

The Plugin API rejects cross-page `NAVIGATE` and `OVERLAY` prototype reactions. If two flows need a live, working prototype link between screens that live on different Figma pages, that link **cannot be built**.

Decide before building:
- **Co-locate** the linked flows on one page if a working prototype link is needed.
- **Accept documentation-only** — note the intended link in `context.md`, do not attempt a real Figma prototype connection.

Do not discover this after frames already exist on separate pages. Surface it at the moment page structure is decided.

---

## 10x Speed Principles

- For frame build order: see the dependency model in `wireframe.md` — independent screens batch in parallel, dependent screens sequence.
- Read the component library page once at the start of a hi-fi session. Cache component names. Never re-read during design work.
- When fixing a violation: edit the specific layer only. Do not rebuild the whole frame.
- When a designer says "change X": read → minimal change → screenshot → confirm. No pre-flight questions.
- Keep node IDs in session working memory. Never re-search for a known frame.
- When in doubt about a design decision: make the choice that best fits `constraints.md` and `context.md`, note it, move on. Do not pause to ask.
