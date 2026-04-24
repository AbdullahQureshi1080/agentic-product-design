# Design Decision Log

> This file records significant design decisions made for [PRODUCT_NAME].
> Log a decision whenever you make a non-obvious choice that:
> - A future designer might question or reverse without context
> - Involved trade-offs between valid options
> - Was driven by a constraint not visible in the design itself
> - Differs from a common convention or pattern

---

## How to Log a Decision

Copy the template below and fill it in. Do not summarize — write enough that someone reading this 6 months from now understands the full context.

### Decision Template

```markdown
## [DEC-XXX] [Short title of the decision]

**Date:** [YYYY-MM-DD]
**Author:** [Name or role]
**Status:** [Decided / Revisiting / Superseded by DEC-XXX]

### Context
[What situation or problem triggered this decision? What were we trying to accomplish?]

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| [Option A] | [Why it was attractive] | [Why it was not chosen] |
| [Option B] | [Why it was attractive] | [Why it was not chosen] |

### Decision
[What we decided and why. Be specific. Reference constraints, user research, or technical limitations that drove the decision.]

### Consequences
[What this decision enables. What it rules out or makes harder. Any follow-up work it creates.]

### Revisit Trigger
[Under what circumstances should this decision be revisited? e.g., "If retention data shows users dropping off at X step."]
```

---

## Decision Log

---

## [DEC-001] [Title of your first decision]

**Date:** [YYYY-MM-DD]
**Author:** [Name or role]
**Status:** Decided

### Context
[Fill in.]

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| [Option A] | | |
| [Option B] | | |

### Decision
[Fill in.]

### Consequences
[Fill in.]

### Revisit Trigger
[Fill in.]

---

## Example Entries (Delete Before Use)

> The following examples show how decisions should be documented.

---

## [EXAMPLE-001] Bottom sheet vs full-screen modal for item creation

**Date:** 2026-01-15
**Author:** Lead Designer
**Status:** Decided

### Context
We needed to decide how to present the "Create New Task" form. Users trigger it from the home screen FAB. The form has 4 fields: title (required), due date (optional), priority (optional), notes (optional).

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Bottom sheet | Feels fast and lightweight. User can see their list behind it. Less disorienting than a full navigation transition. | Limited vertical space. If we add more fields later, it gets cramped. |
| Full push screen | More room for fields. Easier to add fields later. Standard pattern for creation. | Feels heavy for a simple task. Adds a navigation transition that slows the perceived flow. |

### Decision
Bottom sheet. The form has 4 fields — it fits comfortably. The lightweight feel is critical for high-frequency actions (users create multiple tasks per day). If we add ≥6 fields in the future, revisit.

### Consequences
- Enables fast task creation without a full nav transition
- Maximum 5 fields in this sheet before it needs redesign
- Keyboard behavior in the sheet must be tested carefully (sheet resizes with keyboard)

### Revisit Trigger
If task creation form grows beyond 5 fields, or if user testing reveals keyboard conflicts.

---

## [EXAMPLE-002] Tab bar vs hamburger menu for primary navigation

**Date:** 2026-01-20
**Author:** Lead Designer
**Status:** Decided

### Context
Product has 4 primary sections: Home, Search, Activity, Profile. Needed to decide how to expose them.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Bottom tab bar | Thumb-accessible. All sections always visible. Standard iOS/Android pattern. Fastest switching. | Consumes permanent screen space. Limited to 5 items. |
| Hamburger/drawer | Hides navigation and frees screen space. Scales to many items. | Hidden navigation reduces discoverability. Lower engagement with secondary sections. |

### Decision
Bottom tab bar with 4 items. All sections are first-class features that users need frequent access to. Hidden navigation would suppress engagement with Search and Activity.

### Consequences
- Navigation is locked at 4 tabs. A 5th primary section would require a redesign.
- Screen real estate is permanently allocated to the tab bar (~83px).

### Revisit Trigger
If product roadmap introduces a 5th first-class section that cannot be nested under an existing tab.
