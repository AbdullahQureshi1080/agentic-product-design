---
name: import-figma
description: Import an existing Figma project — discovers pages, inventories frames, extracts design system tokens, and creates context.md and figma-map.json from scratch. Works standalone.
---

# /import-figma

Import an existing Figma project into the Agentic Design System. Creates `context.md` and `figma-map.json` from scratch — no prior setup needed.

**Requires:** Figma MCP connected.
**Creates:** `context.md` and `figma-map.json` in the current directory.

---

## How to Use

```
/import-figma https://figma.com/design/abc123/MyApp
```

---

## Process

### Step 1 — Parse file key
Extract the file key from the URL (segment after `/design/`).

### Step 2 — Discover pages
Read the file's page list (names only — no frame content).
Present to the designer:
```
I found these pages: [list]
Which page has your main screens/flows?
```
Accept any page name.

### Step 3 — Discover frames
Read frame names from the confirmed page only. Present the full list:
```
I found [N] frames on [PAGE_NAME]: [list]

For each, tell me: done / in progress / not started.
You can group them: "1–8 done, 9–12 in progress, rest not started."
```

### Step 4 — Extract design system
Read Figma Variables and text styles. Report:
- Color variables → color token map
- Text styles → type scale
- Number variables → spacing and radius tokens

If tokens are missing: "I found colors but no spacing tokens. Should I generate from an 8px base?"

### Step 5 — Inventory components
Read the components page once. Report what's available:
```
Your library has [N] components: [list key ones]
```

### Step 6 — Ask 4 product questions
1. What is this product called?
2. Who is the primary user and what do they do?
3. Mobile, web, or both?
4. What is explicitly out of scope for this design work?

### Step 7 — Create project files
Write `context.md` with all gathered information.
Write `figma-map.json` with file key, page name, and frame inventory.

Report:
```
Import complete.

Product: [name]
Figma page: [page name]
Flows mapped: [N] ([N] done, [N] in progress, [N] not started)
Design system: [N] color tokens, [N] text styles, [N] spacing tokens
Components: [N] in library

Still needed: [any gaps]

What would you like to work on first?
```
