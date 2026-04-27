---
name: scan-coverage
description: Scan a Figma page for unregistered screens — frames that match the flow naming convention but aren't tracked in figma-map.json. Works standalone — only needs a Figma page URL.
---

# /scan-coverage

Scan a Figma page and report any frames that look like flow screens but aren't registered in your project.

**Requires:** Figma MCP connected.
**Does not require:** context.md or figma-map.json (but uses figma-map.json if present).

---

## How to Use

```
/scan-coverage https://figma.com/design/abc123/MyApp?node-id=0:1
```

Or just provide the file URL — the skill will ask which page to scan.

---

## Process

### Step 1 — Identify the page
If a node ID pointing to a page is provided, use it. Otherwise, read the file's page list and ask: "Which page should I scan for coverage?"

### Step 2 — Read all frame names
Call `get_metadata` or equivalent to read all top-level frame names on the confirmed page. Do not read frame content — names only.

### Step 3 — Check naming convention
The flow naming convention is: `[FLOW_ID] / [SCREEN_ID] — [Label]`
Examples: `AUTH-01 / 01-splash — Splash`, `CORE-02 / 03-home — Home`

Classify every frame:
- **Matches convention** → tracked screen candidate
- **Does not match** → skip (may be a section, component, or annotation frame)

### Step 4 — Compare against figma-map.json
If `figma-map.json` exists in the project:
- **Unregistered** — frame matches convention but has no entry in figma-map.json
- **Missing** — entry in figma-map.json has no matching frame on this page
- **Registered** — frame exists in both Figma and figma-map.json

If figma-map.json does not exist: report all convention-matching frames as unregistered.

### Step 5 — Report

```
COVERAGE SCAN — [Page Name]
Total frames on page: [N]
Matching naming convention: [N]

REGISTERED: [N]
  [list frame names]

UNREGISTERED (in Figma, not in figma-map.json): [N]
  [list frame names]
  → Should these be added to figma-map.json?

MISSING (in figma-map.json, not in Figma): [N]
  [list frame names]
  → These may have been renamed, archived, or deleted.
```
