# Design Audit Prompt

> Use this prompt to perform a structured critique of a completed design.
> The audit checks for constraint violations, UX quality, and consistency.
> Run this before any design is marked "approved" or handed off.

---

## When to Use This Prompt

- Before a design is approved for development handoff
- After a round of hi-fi generation to catch violations
- When reviewing a design produced by another designer or AI session
- As a final gate before any design is pushed to Figma

---

## Context Block

```
You are a senior product designer and design systems expert performing a structured audit.
I am building [PRODUCT_NAME].

Read and internalize all context files before auditing:
1. docs/product.md — product overview, personas, features
2. docs/flows.md — flow map and naming conventions
3. docs/design-system.md — tokens, components, typography, spacing
4. docs/patterns.md — UX patterns and when to use each
5. docs/constraints.md — non-negotiable design rules

Your job is to audit the design I provide against ALL of these documents.
Be critical. Surface every issue. Do not pass violations.

Confirm when ready. I will provide the design to audit.
```

---

## Audit Prompt

```
## Task: Design Audit

### Audit Target
Flow ID: [FLOW_ID]
Flow name: [FLOW_NAME]
Fidelity: [Wireframe / Hi-fi]
Screens: [List all screens being audited]

### Design to Audit
[Paste the full design spec, screen-by-screen, exactly as generated.
Do not summarize. Include all layer specs, token references, and component names.]

### Audit Scope

Run ALL of the following audit passes:

---

#### Pass 1 — Constraint Compliance (docs/constraints.md)

For each screen, check every constraint:

| Constraint | Check |
|-----------|-------|
| C-01: No hardcoded values | All fills, text, spacing use tokens |
| C-02: Autolayout | No manual positioning |
| C-03: Mobile-first | Designed for smallest breakpoint first |
| C-04: One primary action | Max 1 primary button per screen |
| C-05: Contrast ≥4.5:1 | All text passes contrast check |
| C-06: Touch targets ≥44px | All interactive elements meet minimum |
| C-07: Visible input labels | No placeholder-only labels |
| C-08: Destructive confirmation | Delete / cancel flows have confirmation |
| C-09: System components only | No invented variants or detached components |
| C-10: No inline overrides | No manual style overrides |
| C-11: Spacing tokens | All spacing uses token names |
| C-12: Radius tokens | All radius values use token names |
| C-13: Verb-led labels | All buttons start with action verbs |
| C-14: Empty states defined | All lists have empty states |
| C-15: Back/exit on all screens | No dead ends |
| C-16: Progress indicator | Multi-step flows show progress |
| C-17: Bottom safe area | Mobile: safe area accounted for |
| C-18: Error states designed | Error states alongside happy path |
| C-19: No lorem ipsum | All content is realistic |
| C-20: System iconography | Icons from approved library only |

Report each violation as:
```
[SCREEN_ID] — [SCREEN_NAME]
Violation: C-XX — [Rule name]
Element: [Specific element that violates]
Detail: [What exactly is wrong]
Fix required: [Specific change needed]
```

Report "PASS" for each constraint that has no violations.

---

#### Pass 2 — UX Quality

Evaluate the following for each screen:

**Clarity**
- Is the primary action obvious without explanation?
- Is the hierarchy of information clear (most important → least important)?
- Would a first-time user understand what to do?

**Completeness**
- Are all required states designed? (default, loading, empty, error)
- Are all user paths covered? (happy path, error path, back/exit)
- Does every list have an empty state?

**Consistency**
- Are components used consistently across screens in this flow?
- Are patterns (from docs/patterns.md) applied consistently?
- Does this flow feel like the same product as other flows?

**Copy quality**
- Are all labels specific and actionable?
- Is the error message copy helpful? (tells user what happened AND what to do)
- Are button labels verb-led?
- Is any copy ambiguous or jargon-heavy?

Report findings as:
```
[SCREEN_ID] — [SCREEN_NAME]
Issue: [Category — Clarity / Completeness / Consistency / Copy]
Finding: [What the problem is]
Severity: [Critical / High / Medium / Low]
Recommendation: [Specific fix]
```

---

#### Pass 3 — Design System Compliance (docs/design-system.md)

Check:
- Typography: Are all text elements using defined type tokens?
- Color: Are all fills using defined color tokens?
- Spacing: Are all gaps and padding using spacing tokens?
- Components: Are all components named components from the system?
- Icons: Are all icons from the approved icon library at the approved size?
- Elevation: Are shadows using elevation tokens?
- Radius: Are border radii using radius tokens?

Report same format as Pass 1.

---

#### Pass 4 — Pattern Compliance (docs/patterns.md)

For each UX pattern used in the design:
- Is it used in a context where it is appropriate (per docs/patterns.md)?
- Are the anti-patterns being violated?
- Are the pattern rules being followed?

Flag any:
- Pattern used in an inappropriate context
- Anti-pattern in use
- Pattern rules being violated (e.g., sheet taller than 90% of screen)

---

#### Pass 5 — Flow Completeness (docs/flows.md)

For the flow being audited:
- Are all screens defined in docs/flows.md present in this design?
- Are all screen IDs and names matching docs/flows.md exactly?
- Do all navigation transitions match the flow relationships defined in docs/flows.md?
- Are there screens in the design NOT listed in docs/flows.md? (flag these — undocumented additions)

---

### Audit Output Format

Structure your full audit report as:

```
# Audit Report — [FLOW_ID] [FLOW_NAME]
Date: [DATE]
Screens audited: [LIST]
Fidelity: [LEVEL]

## Summary
Total violations: [N]
  Critical: [N]
  High: [N]
  Medium: [N]
  Low: [N]
UX issues: [N]
Recommendation: [APPROVE / APPROVE WITH MINOR FIXES / REVISE AND REAUDIT]

---

## Pass 1 — Constraint Compliance
[Results per constraint, per screen]

## Pass 2 — UX Quality
[Results per screen]

## Pass 3 — Design System Compliance
[Results per screen]

## Pass 4 — Pattern Compliance
[Results per screen]

## Pass 5 — Flow Completeness
[Results]

---

## Required Fixes Before Approval
[Numbered list of every fix required, in priority order (Critical → High → Medium → Low)]

1. [FIX — Screen — Detail]
2. [FIX — Screen — Detail]
...

## Optional Improvements
[Non-blocking improvements that would strengthen the design]
```

---

### Audit Severity Definitions

| Severity | Definition | Blocks handoff? |
|----------|-----------|-----------------|
| Critical | Constraint violation (C-01 through C-20). Must be fixed. | Yes |
| High | UX issue that would cause user confusion or task failure. Must be fixed. | Yes |
| Medium | Design system inconsistency or copy issue. Should be fixed before handoff. | Recommended |
| Low | Minor polish or optimization. Can be addressed post-launch. | No |
```

---

## Audit Pass/Fail Criteria

| Result | Criteria |
|--------|----------|
| **APPROVE** | 0 Critical, 0 High violations |
| **APPROVE WITH MINOR FIXES** | 0 Critical, ≤2 High (clearly scoped fixes), any number of Medium/Low |
| **REVISE AND REAUDIT** | ≥1 Critical violation, or ≥3 High violations |

After fixes are applied to a "REVISE AND REAUDIT" result, run this audit prompt again on the revised design before approving.

---

## Post-Audit Actions

If result is **APPROVE:**
- Mark screens as `[done]` in `docs/flows.md`
- Log any significant decisions made during this flow in `docs/decisions.md`
- Proceed to development handoff

If result is **APPROVE WITH MINOR FIXES:**
- Apply fixes using `prompts/refinement.prompt.md`
- Do not re-run full audit — designer to verify fixes manually
- Mark screens as `[done]` after fixes confirmed

If result is **REVISE AND REAUDIT:**
- Apply all Critical and High fixes
- Re-run this audit prompt on revised design
- Do not approve until re-audit passes
