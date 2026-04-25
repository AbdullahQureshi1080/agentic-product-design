# Existing Project Import

> Loaded by the router when `project_type = existing`. Runs once per project. Self-contained.
> When import is complete, return to the routing table in `CLAUDE.md` / `AGENTS.md`.

Triggered when `project_type = existing`. Designer answers targeted questions — the agent extracts everything else from Figma via MCP. Do not check section completion until import is done — import populates the sections.

---

## Step 1 — Get the Figma file key

Ask: "Share your Figma file URL — I'll extract the file key from it."

Parse the key from the URL (the segment after `/design/`). Write it into `context.md`.

---

## Step 2 — Discover pages (names only — no frame content)

Use MCP to read the Figma file's page list. Present to designer:

```
I found these pages: [list]
Which page has your main screens/flows?
```

Accept any page name — never require "Flows". Write the confirmed page name into `context.md` and `figma-map.json`.

---

## Step 3 — Discover frames (names only — no content)

Use MCP to read frame names from the confirmed page only. Present the full list:

```
I found [N] frames on [PAGE_NAME]:
[list all frame names]

For each, tell me: done / in progress / not started.
You can group them: "1–8 done, 9–12 in progress, rest not started."
```

Map statuses into `figma-map.json`. Attempt to parse frame names into `[FLOW_ID] / [SCREEN_ID]` convention. If names don't match, record them as-is and flag for renaming later.

---

## Step 4 — Extract design system via MCP

Read Figma Variables and text styles from the file. Populate `context.md Section 3`:
- Color variables → color token map
- Text styles → type scale
- Number variables → spacing and radius tokens (if present)

If Variables are missing or incomplete:

```
I found color Variables but no spacing tokens.
Do you have a spacing system elsewhere, or should I generate one from a base unit?
```

---

## Step 5 — Inventory component library

Read the components page once. Report:

```
Your library has [N] components: [list key ones — buttons, inputs, nav, cards]
These will be used for all hi-fi work.
```

Cache component names in session memory. Do not re-read this page during design work.

---

## Step 6 — Populate Section 1 (4 questions only)

Do not run the full new-project interview. Ask only:
1. What is this product called?
2. Who is the primary user and what do they do?
3. Mobile, web, or both?
4. What is explicitly out of scope for this design work?

Write answers into `context.md Section 1`. Mark complete.

---

## Step 7 — Present import summary

```
Import complete.

Product: [name]
Figma page: [page name]
Flows mapped: [N] ([N] done, [N] in progress, [N] not started)
Design system: [N] color tokens, [N] text styles, [N] spacing tokens
Components: [N] in library

Still needed before hi-fi:
[list any gaps — missing spacing tokens, no component library, etc.]

What would you like to work on first?
```
