# UX Patterns

> This file catalogs every interaction pattern used in [PRODUCT_NAME].
> Before using any pattern in a prompt, verify it is listed here.
> Do not introduce patterns not in this list without adding them first.

---

## Pattern Index

| Pattern | Category | Mobile | Desktop |
|---------|----------|--------|---------|
| Bottom Sheet | Overlay | Primary | Avoid |
| Modal Dialog | Overlay | Confirmation only | Primary |
| Tooltip | Overlay | Avoid | Informational |
| Inline Expansion | Navigation | Supported | Supported |
| Push Navigation | Navigation | Primary | Avoid |
| Tab Navigation | Navigation | Bottom bar | Top bar |
| Drawer | Navigation | Avoid | Secondary nav |
| Form — Single Page | Forms | Short tasks | Short tasks |
| Form — Multi-step | Forms | Long onboarding | Long onboarding |
| Inline Edit | Forms | Supported | Primary |
| Selection — Single | Selection | Radio / Tap row | Radio / Dropdown |
| Selection — Multi | Selection | Checkbox list | Checkbox list |
| Segmented Control | Selection | 2–3 options | 2–5 options |
| Swipe Action | List | Trailing: primary | N/A |
| Pull to Refresh | List | Primary | N/A |
| Infinite Scroll | List | Primary | Primary |
| Skeleton Loader | Loading | Primary | Primary |
| Spinner | Loading | Inline only | Inline only |
| Progress Bar | Loading | Multi-step | Multi-step |
| Toast | Feedback | Non-blocking | Non-blocking |
| Banner | Feedback | Persistent alerts | Persistent alerts |
| Empty State | Feedback | All zero-data states | All zero-data states |
| Confirmation Dialog | Destructive | Required | Required |

---

## Patterns — Detailed

---

### Bottom Sheet

**What it is:** A panel that slides up from the bottom of the screen, partially covering the content behind it.

**When to use:**
- Contextual actions triggered from a list item or button
- Secondary task that does not require navigating away (add comment, share, select option)
- Filter and sort controls
- Picker overlays (date, time, category)

**When NOT to use:**
- Full-form entry with many fields (use a push screen instead)
- Confirmation dialogs (use Modal Dialog)
- On desktop (use Dropdown or Modal)

**Rules:**
- Must include a drag handle at top
- Must be dismissible by swipe down or tap on overlay
- Maximum height: 90% of screen height
- If content scrolls inside sheet, drag handle remains sticky
- Bottom padding: `spacing/xl` + system safe area inset
- Background overlay: `color/surface/overlay`

**Anti-patterns:**
- Nesting a sheet inside a sheet
- Using a sheet for a destructive confirmation
- Opening a sheet from within another sheet

---

### Modal Dialog

**What it is:** A centered dialog that blocks interaction with the page behind it.

**When to use:**
- Confirmation of destructive or irreversible actions
- Critical decisions that require explicit user acknowledgment
- Short, focused tasks that cannot be deferred

**When NOT to use:**
- Informational content (use Toast or Banner)
- Navigation (use Push or Sheet)
- Long forms (use Push screen)

**Rules:**
- Maximum 2 actions: primary + cancel
- Title must be a direct question or clear statement
- Body text: 1–3 sentences maximum
- Destructive action always uses `Destructive` button variant
- Cancel is always available
- Overlay background: `color/surface/overlay`

**Anti-patterns:**
- Modal with 3+ actions
- Modal opened automatically (not triggered by user)
- Modal that contains navigation

---

### Toast

**What it is:** A brief, non-blocking notification that appears and auto-dismisses.

**When to use:**
- Confirming a completed action ("Saved", "Copied", "Deleted")
- Low-priority errors that do not block the user
- Undo offers (e.g., "Task deleted — Undo")

**When NOT to use:**
- Critical errors that require user action (use Banner or Modal)
- Information the user needs to act on
- Multiple toasts in sequence

**Rules:**
- Auto-dismiss: 3–5 seconds
- Position: bottom of screen, above bottom tab bar
- Maximum 1 toast visible at a time
- Optional: single Undo action link
- Text: maximum 60 characters
- No icons required (optional semantic icon)

**Anti-patterns:**
- Toast for errors that block the user's task
- Stacking multiple toasts
- Toast that requires reading before it disappears

---

### Empty State

**What it is:** The screen or section state shown when there is no content to display.

**When to use:**
- First-time user with no data yet
- User has cleared or deleted all items
- Search returns zero results
- Filter returns zero results

**Structure (required):**
1. Illustration or icon (optional but recommended)
2. Headline: what is missing (concise, 3–6 words)
3. Body: why it's empty + what to do (1–2 sentences)
4. Primary CTA: action to resolve the empty state (when applicable)

**When NOT to use a CTA:**
- When the user has no action to take (e.g., zero search results — offer to clear filters instead)

**Anti-patterns:**
- Empty state that says only "No data"
- Empty state with no guidance on what to do
- Generic empty state reused across different features

---

### Selection — Single (Radio / Row Tap)

**What it is:** Selecting exactly one item from a list of options.

**When to use:**
- Mutually exclusive choices (priority, category, plan type)
- Options where only one can be active at a time

**Patterns to use:**
- Mobile: Tap-to-select rows with a checkmark on the selected row, or native radio inputs
- Desktop: Radio buttons with labels, or a dropdown if >5 options

**Rules:**
- Always have a pre-selected default when one is logical
- Selection must be immediately reflected (no confirm button needed for simple selections)
- If inside a form, confirm button applies the selection

**Anti-patterns:**
- Toggle switches for mutually exclusive choices (use radio instead)
- Checkbox for single-select scenarios

---

### Selection — Multi (Checkbox)

**What it is:** Selecting one or more items from a list.

**When to use:**
- Filtering by multiple categories
- Bulk actions (delete, move, export)
- Settings with multiple options that can all be active

**Rules:**
- Show selection count in header or action bar when items are selected
- Bulk action bar appears at bottom when ≥1 item selected
- "Select all" option if list can be long
- Clear visual distinction between selected and unselected states

**Anti-patterns:**
- Checkboxes for mutually exclusive choices (use radio instead)
- Multi-select with no indication of how many are selected

---

### Form — Multi-step

**What it is:** A form split across multiple screens or steps.

**When to use:**
- Onboarding flows (≥4 distinct input groups)
- Complex creation flows (new project, detailed profile setup)
- Any form where showing all fields at once would overwhelm

**Rules:**
- Progress indicator required (step dots or "Step X of Y")
- Each step: 1–3 fields maximum
- Back always available (never trap user in a step)
- Validation per step, not at final submit
- "Skip" offered for optional steps
- Final step shows summary before submission

**Anti-patterns:**
- Multi-step form with no progress indicator
- Validating all steps only at the end
- No back navigation between steps

---

### Skeleton Loader

**What it is:** A placeholder that mimics the layout of content while it loads.

**When to use:**
- Loading list items
- Loading card content
- Loading profile or detail screens

**Rules:**
- Skeleton must match the approximate shape of the real content
- Animation: horizontal shimmer only (left-to-right)
- Duration: matches expected load time; if content takes >5s, show spinner instead
- Never show real UI elements mixed with skeleton elements on the same row

**Anti-patterns:**
- Full-screen spinner instead of skeleton (use skeleton for content-heavy views)
- Skeleton that does not resemble the actual content layout

---

### Confirmation Dialog (Destructive)

**What it is:** A modal that confirms an irreversible or high-risk action.

**When to use:**
- Delete (item, account, content)
- Logout (when data may be lost)
- Cancel a paid plan
- Any action that cannot be undone

**Required structure:**
1. Title: "Delete [Item Name]?" — specific, not generic
2. Body: one sentence explaining the consequence ("This cannot be undone.")
3. Primary action: Destructive button — verb-first ("Delete", "Cancel Plan")
4. Secondary action: Ghost or Secondary button — "Keep", "Go Back"

**Rules:**
- Primary button is the destructive action (right or bottom-most)
- Cancel / Keep is never the destructive button
- Do not use "Yes" / "No" as button labels

**Anti-patterns:**
- "Are you sure?" as the title (vague)
- OK / Cancel as button labels
- Confirmation for non-destructive actions (creates fatigue)
