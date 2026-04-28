---
name: figma-audit
description: Run a 21-constraint design audit on any Figma frame. Works standalone — no project context required.
---

# /figma-audit

Audit any Figma frame against 21 design constraints. Provide a Figma frame URL or node ID to begin.

**Requires:** Figma MCP connected and authenticated.
**Does not require:** context.md, figma-map.json, or any project setup.

---

## How to Use

Type `/figma-audit` then paste a Figma frame URL or node ID. Example:
```
/figma-audit https://figma.com/design/abc123/MyApp?node-id=12:34
```

---

## Audit Process

1. Parse the file key and node ID from the URL.
2. Call `get_screenshot` on the frame.
3. Call `get_design_context` to inspect layer structure, fills, spacing, and components.
4. Check every constraint below (C-01 through C-21).
5. Output the report using the Audit Output Format at the bottom.

---

## Constraints

### Severity Key
- **CRITICAL** — Blocks approval.
- **HIGH** — Must fix before handoff.
- **MEDIUM** — Should fix before handoff.

| ID | Rule | Severity |
|----|------|----------|
| C-01 | No hardcoded color values — all fills must use Variable bindings, not raw hex | CRITICAL |
| C-02 | Vertical autolayout on all screens and frames — `layoutMode = VERTICAL`. Screen zones: nav-bar (FIXED) → content (FILL) → action-bar (FIXED, conditional). `layoutMode = NONE` is a violation. | CRITICAL |
| C-03 | Platform-appropriate frame size — Mobile: 390px. Web desktop: 1440px. Tablet: 768px | CRITICAL |
| C-04 | One primary button per screen section | CRITICAL |
| C-05 | Contrast ≥4.5:1 for text, ≥3:1 for UI elements | CRITICAL |
| C-06 | Interaction targets meet platform minimum — Mobile: ≥44×44px. Web: ≥24×24px (primary actions ≥44px) | CRITICAL |
| C-07 | Visible input labels — label above field, not placeholder-only | CRITICAL |
| C-08 | Destructive actions need confirmation modal before executing | CRITICAL |
| C-09 | System components only — no custom-built buttons, inputs, or nav | HIGH |
| C-10 | No inline style overrides — use component properties and tokens | HIGH |
| C-11 | Spacing tokens only — no raw px gap values | HIGH |
| C-12 | Radius tokens only — no raw px corner radius values | HIGH |
| C-13 | Verb-led button labels — "Save", "Delete account", not "OK" or "Yes" | HIGH |
| C-14 | Empty states designed for every list | HIGH |
| C-15 | Every screen has a back or exit path — Mobile: back/X. Web: breadcrumb or back link, X for modals | HIGH |
| C-16 | Progress indicator on all multi-step flows | HIGH |
| C-17 | Platform navigation zones respected — Mobile: safe area inset. Web: content not obscured by sticky nav | HIGH |
| C-18 | Error states designed alongside happy path | MEDIUM |
| C-19 | No lorem ipsum — all text is realistic content | MEDIUM |
| C-20 | System iconography only — no custom SVGs not in the icon library | MEDIUM |
| C-21 | Correct component for semantic role — Status Badge = read-only label, Chip = selectable option in group, Button = standalone action trigger, Selection Card = single-item selection context | HIGH |
| C-22 | Semantic frame names — no auto-generated defaults: `Frame`, `Frame 2`, `Artboard`, `Group 3` | HIGH |
| C-23 | Component completeness — every visible element is a library instance or has a documented exception. Flag any inline element that matches an existing component pattern. | HIGH |

---

## Audit Output Format

```
FRAME: [frame name or node ID]

CRITICAL: [N] passed, [N] failed
  [C-XX] FAIL: [specific issue + layer name]

HIGH: [N] passed, [N] failed
  [C-XX] FAIL: [specific issue + layer name]

MEDIUM: [N] passed, [N] failed
  [C-XX] FAIL: [specific issue + layer name]

VERDICT: APPROVE | APPROVE WITH MINOR FIXES | REVISE AND REAUDIT
```

### Verdict Criteria

| Verdict | Condition |
|---------|-----------|
| APPROVE | 0 Critical, 0 High |
| APPROVE WITH MINOR FIXES | 0 Critical, ≤2 High (clearly scoped), any Medium |
| REVISE AND REAUDIT | ≥1 Critical, or ≥3 High |
