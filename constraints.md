# Constraints + Patterns

> Single source of truth. Referenced by CLAUDE.md and prompts.md.
> Never duplicated elsewhere. Claude checks this file during every audit pass.

---

## Constraints

### Severity Key
- **CRITICAL** — Blocks approval. Must be fixed before any step advances.
- **HIGH** — Must be fixed before handoff.
- **MEDIUM** — Should be fixed before handoff. Does not block.

---

| ID | Rule | Severity | Correct | Incorrect |
|----|------|----------|---------|-----------|
| C-01 | No hardcoded values | CRITICAL | `color/brand/primary` | `#4A90E2` |
| C-02 | Autolayout on all frames | CRITICAL | Vertical autolayout, gap `spacing/sm` | Elements manually positioned by X/Y |
| C-03 | Mobile-first | CRITICAL | Design 390px frame first | Design desktop, shrink down |
| C-04 | One primary button per screen | CRITICAL | Single `Primary` button per screen section | Two `Primary` buttons side by side |
| C-05 | Contrast ≥4.5:1 (text), ≥3:1 (UI) | CRITICAL | `color/neutral/900` on white = 16:1 | `color/neutral/500` on white = 3.2:1 for body text |
| C-06 | Touch targets ≥44×44px | CRITICAL | Icon 24px with 10px padding frame = 44×44px | Icon 24px, no padding, directly tappable |
| C-07 | Visible input labels | CRITICAL | Label above field + placeholder inside | Placeholder only, no label |
| C-08 | Destructive actions need confirmation | CRITICAL | Delete → confirmation modal with "Delete" + "Cancel" | Delete executes immediately on tap |
| C-09 | System components only | HIGH | `Button/Primary` from library | Custom button built from scratch |
| C-10 | No inline style overrides | HIGH | Use component properties and tokens | Detach + manually change fill color |
| C-11 | Spacing tokens only | HIGH | Gap: `spacing/md` | Gap: `16` (raw value) |
| C-12 | Radius tokens only | HIGH | Corner radius: `radius/md` | Corner radius: `12` (raw value) |
| C-13 | Verb-led button labels | HIGH | "Save", "Delete account", "Try again" | "OK", "Yes", "Submit" |
| C-14 | Empty states for all lists | HIGH | Every list has a designed empty state | List with zero items shows blank white screen |
| C-15 | Every screen has back or exit | HIGH | Push screens: back button top-left. Sheets: X top-right or swipe-down | Screen with no way out |
| C-16 | Progress indicator on multi-step flows | HIGH | Step dots or "Step 2 of 4" | Multi-step form with no progress shown |
| C-17 | Bottom safe area on mobile | HIGH | Bottom CTA has `spacing/xl` + safe area inset | CTA sits flush against screen bottom |
| C-18 | Error states alongside happy path | MEDIUM | Error state designed for every form and data fetch | Error state noted as "to do later" |
| C-19 | No lorem ipsum | MEDIUM | "Olivia Chen", "Due tomorrow", "3 tasks" | "Lorem ipsum dolor sit amet" |
| C-20 | System iconography only | MEDIUM | Phosphor icon `check-circle` at 24px | Custom SVG not in icon library |

---

## Patterns

Each pattern entry: what it is, when to use, when NOT to use, key rules, anti-patterns.

---

### Bottom Sheet

A panel that slides up from the bottom, partially covering content behind it.

**Use when:** Contextual actions from a list item, pickers (date, category), filter/sort, short secondary tasks that don't require navigation away.

**Don't use when:** Full forms with many fields (use push screen), confirmation dialogs (use Modal), on desktop (use Dropdown or Modal).

**Rules:**
- Drag handle required at top
- Swipe-down or overlay tap dismisses it
- Max height: 90% of screen
- If sheet content scrolls: drag handle stays sticky
- Bottom padding: `spacing/xl` + safe area

**Anti-patterns:** Sheet inside a sheet. Sheet for destructive confirmations. Sheet that opens another sheet.

---

### Modal Dialog

A centered dialog that blocks interaction with everything behind it.

**Use when:** Confirmation of destructive or irreversible actions. Critical decisions requiring explicit acknowledgment.

**Don't use when:** Informational content (use Toast or Banner), navigation, long forms.

**Rules:**
- Max 2 actions: primary + cancel
- Title is a direct question or clear statement
- Body: 1–3 sentences max
- Destructive action uses `Button/Destructive`
- Cancel always available

**Anti-patterns:** Modal with 3+ actions. Auto-opening modal (not user-triggered). Modal that navigates.

---

### Toast

A brief, auto-dismissing non-blocking notification.

**Use when:** Confirming completed actions ("Saved", "Copied"). Low-priority errors. Undo offers.

**Don't use when:** Critical errors requiring action (use Banner or Modal). Information that must be read before acting. Multiple sequential toasts.

**Rules:**
- Auto-dismiss: 3–5 seconds
- Position: above bottom tab bar
- Max 1 toast visible at a time
- Max 60 characters of text
- Optional single Undo action

**Anti-patterns:** Toast for blocking errors. Stacked toasts. Toast that disappears before the user can read it.

---

### Empty State

The state shown when a list or section has no content.

**Use when:** First-time user with no data, user has deleted all items, search or filter returns zero results.

**Required structure:**
1. Illustration or icon (optional)
2. Headline: what's missing (3–6 words)
3. Body: why + what to do (1–2 sentences)
4. CTA: action to resolve it (when applicable — omit for zero search results, offer "clear filters" instead)

**Anti-patterns:** "No data" as the only text. Generic empty state reused across features. Empty state with no direction.

---

### Confirmation Dialog (Destructive)

A modal that confirms an action that cannot be undone.

**Triggers:** Delete any user content, delete account, cancel paid plan, remove a team member, clear all data.

**Required structure:**
1. Title: "[Verb] [Specific Thing]?" e.g. "Delete this task?"
2. Body: "This cannot be undone." (one sentence on consequence)
3. Primary: `Button/Destructive` — "Delete", "Cancel Plan", "Remove"
4. Secondary: `Button/Ghost` — "Keep", "Go Back"

**Anti-patterns:** "Are you sure?" as title (vague). "Yes" / "No" as labels. "OK" / "Cancel". Destructive button on the left or top.

---

### Selection — Single (Radio / Row Tap)

Selecting exactly one option from a list.

**Use when:** Mutually exclusive choices — priority, category, plan type.

**Rules:**
- Mobile: tap-to-select rows with trailing checkmark, or native radio
- Desktop: radio buttons, or dropdown if >5 options
- Pre-select a logical default when one exists
- Selection reflects immediately (no confirm button for simple selections)

**Anti-patterns:** Toggle switch for mutually exclusive choices. Checkbox for single-select.

---

### Selection — Multi (Checkbox)

Selecting one or more items from a list.

**Use when:** Filtering by multiple categories, bulk actions, settings where multiple can be active.

**Rules:**
- Show selection count in header or action bar when ≥1 selected
- Bulk action bar appears at bottom when ≥1 selected
- "Select all" if list can be long

**Anti-patterns:** Checkbox for mutually exclusive choices. Multi-select with no count shown.

---

### Form — Multi-step

A form split across multiple screens or steps.

**Use when:** Onboarding flows (≥4 distinct input groups), complex creation flows, any form where all fields at once would overwhelm.

**Rules:**
- Progress indicator required (step dots or "Step X of Y")
- Max 3 fields per step
- Back always available
- Validate per step, not only at final submit
- Optional steps offer "Skip"
- Final step shows summary before submit

**Anti-patterns:** No progress indicator. Validation only at the end. No back navigation.

---

### Skeleton Loader

A placeholder that mimics content layout while data loads.

**Use when:** Loading lists, cards, detail screens — any content-heavy view.

**Rules:**
- Shape must approximate real content layout
- Animation: horizontal shimmer, left-to-right only
- If load takes >5s: switch to spinner
- Never mix real elements with skeleton elements on the same row

**Anti-patterns:** Full-screen spinner instead of skeleton on content-heavy views. Skeleton that looks nothing like the actual content.

---

### Swipe Actions (Mobile Lists)

Swipe gesture on a list row revealing contextual actions.

**Use when:** Primary list actions the user takes frequently (delete, archive, complete).

**Rules:**
- Max 2 actions per row
- Destructive action always on trailing (right) side
- Leading (left) side: non-destructive only (e.g., mark read, pin)
- Swipe action icon + label, not icon only

**Anti-patterns:** 3+ swipe actions. Destructive action on leading side. Swipe action for navigation (use tap instead).
