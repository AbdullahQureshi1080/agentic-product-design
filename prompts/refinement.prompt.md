# Refinement Prompt

> Use this prompt to iterate on an existing wireframe or hi-fi design.
> Refinement is scoped and targeted — it addresses specific issues, not full redesigns.
> Use this after receiving initial output that is mostly correct but needs adjustment.

---

## When to Use This Prompt

- Initial wireframe or hi-fi has been generated but has specific issues
- Feedback from review requires targeted changes
- One or more screens need rework without touching others
- A constraint violation was found and needs to be corrected
- Copy or content needs to be updated

**Do NOT use this prompt for:**
- Starting a new flow from scratch (use `wireframe.prompt.md`)
- Full redesigns (use `wireframe.prompt.md` again with updated inputs)
- Structural changes that affect navigation or flow order

---

## Refinement Prompt

```
## Task: Refine Design

### What Is Being Refined
Flow ID: [FLOW_ID]
Flow name: [FLOW_NAME]
Fidelity level: [Wireframe / Hi-fi]
Screen(s) affected: [List only the screens that need changes]

### Current Design Reference
[Paste the current design spec, wireframe description, or Figma frame reference here.
Be specific — paste the actual output that needs changing, not a summary of it.]

### Issues to Address

> List each issue separately. Be precise. Reference constraint IDs where applicable.

**Issue 1**
Screen: [SCREEN_ID] — [SCREEN_NAME]
Problem: [Describe exactly what is wrong. Quote specific elements if possible.]
Constraint violated (if applicable): [C-XX — Rule name]
Required fix: [Describe the specific change needed.]

**Issue 2**
Screen: [SCREEN_ID] — [SCREEN_NAME]
Problem: [Describe exactly what is wrong.]
Constraint violated (if applicable): [C-XX — Rule name]
Required fix: [Describe the specific change needed.]

**Issue 3**
Screen: [SCREEN_ID] — [SCREEN_NAME]
Problem: [Describe exactly what is wrong.]
Required fix: [Describe the specific change needed.]

[Add more issues as needed. Do not bundle unrelated issues — one issue per entry.]

### Scope Boundaries

**Only change:**
- [List the specific elements, components, or sections that should change]

**Do NOT change:**
- [List what must remain unchanged — other screens, navigation structure, etc.]
- The overall layout structure of [SCREEN_NAME] (only fix the specific issue above)
- Any screens not listed in "Screen(s) affected"

### Constraints Reminder

All existing constraints remain in force. Specifically, the refinement must:
- Maintain token compliance (C-01)
- Not introduce any manually positioned elements (C-02)
- Keep the same primary action (C-04) unless explicitly changing it above
- [Add any constraint particularly relevant to this refinement]

### Output Format

For each issue:
1. Confirm the issue understood
2. State the specific change being made
3. Show the revised spec for only the affected element or section
4. Flag any cascading effects on other screens or components

Do not re-output unchanged sections. Only output what changed.
```

---

## Common Refinement Scenarios

### Scenario A: Fixing a Constraint Violation

```
Issue 1
Screen: AUTH-01/02 — Sign Up Entry
Problem: The "Continue" button uses hardcoded color #4A90E2 instead of a token.
Constraint violated: C-01 — No hardcoded values
Required fix: Replace #4A90E2 with token `color/brand/primary`.

Scope: Only change the button fill. Everything else on this screen stays.
```

---

### Scenario B: Adjusting Content Hierarchy

```
Issue 1
Screen: CORE-01/01 — Task List
Problem: The filter controls are positioned above the task list, but they are secondary to
         the primary content. Users should see their tasks immediately.
Required fix: Move filter controls below the page title, collapse them into a single
              "Filter" button that expands on tap. Task list is the first visible element
              after the header.

Scope: Page-level layout reorder only. Individual task row design unchanged.
```

---

### Scenario C: Updating Copy

```
Issue 1
Screen: CORE-01/02 — Add Task Sheet
Problem: The primary button label is "Submit" — this violates the verb-led label rule.
Constraint violated: C-13 — Button labels must be verb-led
Required fix: Change button label to "Save Task".

Issue 2
Screen: EMPTY-01/01 — Task List Empty State
Problem: Headline reads "Nothing here yet." This is vague and gives the user no direction.
Required fix: Change headline to "Add your first task." Change body copy to
              "Tap the + button below to create a task." Add primary CTA: "Add Task".

Scope: Copy changes only on both screens. Layout and component structure unchanged.
```

---

### Scenario D: Adding a Missing State

```
Issue 1
Screen: CORE-01/01 — Task List
Problem: Loading state is not defined. Skeleton loader is missing.
Required fix: Add a skeleton loader state with 3 placeholder rows.
              Each skeleton row should match the approximate height and layout of a real task row.
              Skeleton shimmer: horizontal, left-to-right, `color/neutral/100` base.

Scope: Add the skeleton state only. Default loaded state is unchanged.
```

---

## Refinement Loop

Refinements can be chained. If the first refinement output still has issues:

1. Run the refinement prompt again with the new output as the reference
2. Scope to only the remaining issues
3. Maximum 3 refinement iterations on a single screen before escalating to a full redesign

If after 3 iterations a screen still has fundamental issues, restart with `wireframe.prompt.md`.

---

## Post-Refinement Checklist

- [ ] All listed issues are addressed in the output
- [ ] No unrequested changes were made to unaffected screens
- [ ] All token references are still valid
- [ ] No new constraint violations were introduced
- [ ] Cascading effects (if any) are documented
