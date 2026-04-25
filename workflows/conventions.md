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

## 10x Speed Principles

- For frame build order: see the dependency model in `wireframe.md` — independent screens batch in parallel, dependent screens sequence.
- Read the component library page once at the start of a hi-fi session. Cache component names. Never re-read during design work.
- When fixing a violation: edit the specific layer only. Do not rebuild the whole frame.
- When a designer says "change X": read → minimal change → screenshot → confirm. No pre-flight questions.
- Keep node IDs in session working memory. Never re-search for a known frame.
- When in doubt about a design decision: make the choice that best fits `constraints.md` and `context.md`, note it, move on. Do not pause to ask.
