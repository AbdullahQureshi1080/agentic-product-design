# Wireframe Generation Prompt

> Use this prompt to generate low-fidelity wireframes for a specific flow or screen.
> Wireframes establish layout, hierarchy, and interaction — not visual polish.
> Replace all [BRACKETED] values before sending.

---

## When to Use This Prompt

- Starting design on a new flow or screen for the first time
- Exploring layout options before committing to a direction
- Getting LLM output to review before moving to hi-fi

---

## Context Block (Paste at Top of Every Session)

> Paste this at the start of your chat session before sending the wireframe prompt.
> Attach or paste the content of each file listed.

```
You are a senior product designer. I am building [PRODUCT_NAME].

Before generating any output, read and internalize the following context files:

1. docs/product.md — product overview, personas, features
2. docs/flows.md — user flow map and naming conventions
3. docs/design-system.md — tokens, components, spacing system
4. docs/patterns.md — UX patterns and when to use them
5. docs/constraints.md — non-negotiable design rules

Do not proceed until you confirm you have read all five files.
When confirmed, I will give you the wireframe task.
```

---

## Wireframe Prompt

```
## Task: Generate Wireframe

### Flow
Flow ID: [FLOW_ID]
Flow name: [FLOW_NAME]
Description: [One sentence — what is the user trying to accomplish in this flow?]

### Screens to Generate
Generate wireframes for the following screens in this flow:

1. [SCREEN_ID] — [SCREEN_NAME]
   Entry point: [What triggers this screen? e.g., "User taps 'Create' on home screen"]
   User goal: [What does the user want to do on this screen?]
   Exit points: [Where can the user go from here?]

2. [SCREEN_ID] — [SCREEN_NAME]
   Entry point: [What triggers this screen?]
   User goal: [What does the user want to do on this screen?]
   Exit points: [Where can the user go from here?]

3. [SCREEN_ID] — [SCREEN_NAME]
   Entry point: [What triggers this screen?]
   User goal: [What does the user want to do on this screen?]
   Exit points: [Where can the user go from here?]

### Primary Persona
Designing for: [PERSONA_NAME]
Their context: [Briefly describe what state they are in — first-time user, returning user, on mobile, etc.]

### Layout Requirements
- Device: [Mobile 390px / Tablet 768px / Desktop 1280px]
- Navigation pattern: [Bottom tab bar / Push navigation / Sheet / Modal / Other]
- Layout priority: [List what the user needs to see first, second, third on screen]

### Content to Include

**Real content (not lorem ipsum):**
- [Specific label, heading, or data value to show]
- [Specific label, heading, or data value to show]
- [Use realistic placeholder data — e.g., "Olivia Chen", "3 items", "Due tomorrow"]

**Actions required on each screen:**
- [SCREEN_NAME]: Primary action = [ACTION]. Secondary action = [ACTION] (if any).
- [SCREEN_NAME]: Primary action = [ACTION]. Secondary action = [ACTION] (if any).

### States to Include
For each screen, generate:
- [ ] Default / loaded state
- [ ] Loading / skeleton state
- [ ] Empty state (if applicable)
- [ ] Error state (if applicable)

### Constraints (Non-Negotiable)
Apply all rules from docs/constraints.md. Specifically for this flow:
- [Any constraint particularly relevant to this flow — e.g., "This is a destructive flow — confirmation dialog required (C-08)"]
- [e.g., "This form must have visible labels, not placeholder-only (C-07)"]
- [e.g., "Touch targets minimum 44×44px (C-06)"]

### Output Format
Describe each wireframe as a structured layout spec:

For each screen:
1. Screen title and ID
2. Top area: [navigation bar, header, status]
3. Scrollable content area: [content blocks, in order from top to bottom]
4. Bottom area: [tab bar, CTA button, bottom sheet trigger]
5. Overlays: [any sheets, modals, or tooltips on this screen]
6. State transitions: [what triggers each exit point]

Do NOT describe colors, fonts, or visual style.
DO describe hierarchy, component types, and interaction triggers.

### What to Avoid
- Do not invent flows or screens not listed above
- Do not add features not defined in docs/product.md
- Do not use patterns not listed in docs/patterns.md without flagging it
- Do not position elements manually — describe layout in terms of stacking and grouping
- Do not use lorem ipsum text
```

---

## Post-Generation Checklist

After receiving wireframe output, verify:

- [ ] All screens in the scope are covered
- [ ] Empty and error states are defined
- [ ] No screen is a dead end (C-15)
- [ ] One primary action per screen (C-04)
- [ ] Loading state specified for data-fetching screens
- [ ] Destructive actions have confirmation step (C-08)
- [ ] Content uses realistic data, not lorem ipsum
- [ ] All patterns used are from docs/patterns.md

If anything fails: iterate using `prompts/refinement.prompt.md`.

---

## Example (Filled In)

> This shows what a completed wireframe prompt looks like. Delete before use.

```
## Task: Generate Wireframe

### Flow
Flow ID: CORE-01
Flow name: Create Task
Description: User creates a new task from the home screen.

### Screens to Generate

1. CORE-01/01 — Task List (Home)
   Entry point: App launch or tab tap
   User goal: See existing tasks, create a new one
   Exit points: Tap task → CORE-01/03. Tap FAB → CORE-01/02.

2. CORE-01/02 — Add Task Sheet
   Entry point: Tap FAB on CORE-01/01
   User goal: Enter task title, due date, priority
   Exit points: Save → CORE-01/01. Cancel → CORE-01/01.

3. CORE-01/03 — Task Detail
   Entry point: Tap any task row on CORE-01/01
   User goal: View full task, mark complete, delete
   Exit points: Back → CORE-01/01. Delete → Confirmation Modal.

### Primary Persona
Designing for: The Daily Planner
Their context: Returning user, has 6 existing tasks, adding a new task quickly on mobile.

### Layout Requirements
- Device: Mobile 390px
- Navigation pattern: Bottom tab bar (Tasks, Search, Activity, Profile)
- Layout priority: Task list > Add button > Filter controls

### Content to Include
Real content:
- Tasks: "Review Q2 report", "Call Marco", "Buy groceries"
- Dates: "Due today", "Due tomorrow", "No due date"
- User name: "Olivia"

Actions:
- Task List: Primary = FAB "Add Task". Secondary = none.
- Add Task Sheet: Primary = "Save Task". Secondary = "Cancel".
- Task Detail: Primary = "Mark Complete". Secondary = "Delete" (destructive).

### States to Include
- Task List: Default (has tasks), Empty state (no tasks yet)
- Add Task Sheet: Default, Error (title missing)
- Task Detail: Default

### Constraints
- Add Task Sheet uses bottom sheet pattern (patterns.md)
- Delete on Task Detail must trigger confirmation dialog (C-08)
- All form fields in Add Task must have visible labels (C-07)
```
