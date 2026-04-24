# Design Constraints

> These are non-negotiable rules. Every LLM output must comply.
> If a generated design violates any rule in this file, it must be regenerated.
> These rules exist to ensure consistency, maintainability, and accessibility.

---

## Rule Set Overview

| # | Rule | Category | Severity |
|---|------|----------|----------|
| C-01 | No hardcoded values | Tokens | CRITICAL |
| C-02 | Use autolayout on all frames | Layout | CRITICAL |
| C-03 | Mobile-first design | Layout | CRITICAL |
| C-04 | One primary action per screen | Interaction | CRITICAL |
| C-05 | All text must meet contrast minimums | Accessibility | CRITICAL |
| C-06 | Minimum touch target 44×44px | Accessibility | CRITICAL |
| C-07 | No placeholder-only labels | Forms | CRITICAL |
| C-08 | Destructive actions require confirmation | Interaction | CRITICAL |
| C-09 | Use system components only | Components | HIGH |
| C-10 | No inline styles or overrides | Tokens | HIGH |
| C-11 | Spacing must use spacing tokens | Tokens | HIGH |
| C-12 | Radius must use radius tokens | Tokens | HIGH |
| C-13 | Button labels must be verb-led | Copy | HIGH |
| C-14 | Empty states are required for every list | Content | HIGH |
| C-15 | Every screen must have a defined back/exit | Navigation | HIGH |
| C-16 | Progress indicator required on multi-step flows | Navigation | HIGH |
| C-17 | Bottom safe area always accounted for | Layout | HIGH |
| C-18 | Error states must be designed alongside happy path | Content | MEDIUM |
| C-19 | No lorem ipsum in design reviews | Content | MEDIUM |
| C-20 | Iconography from system library only | Assets | MEDIUM |

---

## Critical Rules (Must Not Be Violated)

---

### C-01 — No Hardcoded Values

**Rule:** All color, typography, spacing, radius, and elevation values must reference design tokens. No raw hex codes, pixel values, or font names may appear in designs.

**Correct:**
- Fill: `color/brand/primary`
- Font size: `type/body/md`
- Padding: `spacing/md`

**Incorrect:**
- Fill: `#4A90E2`
- Font size: `16px`
- Padding: `12px`

**Why this matters:** Hardcoded values break when themes change, dark mode is introduced, or tokens are updated. A single token update should propagate everywhere.

**Exception:** None. There are no exceptions to this rule.

---

### C-02 — Autolayout on All Frames

**Rule:** Every frame, component, and group that contains more than one element must use autolayout. No manual positioning of elements.

**Correct:**
- Card frame: Vertical autolayout, padding all sides `spacing/md`, gap `spacing/sm`
- Button: Horizontal autolayout, horizontal padding `spacing/md`, vertical padding `spacing/sm`

**Incorrect:**
- Dragging text layers to approximate positions
- Using absolute X/Y coordinates for element placement
- Grouping elements without applying autolayout

**Why this matters:** Manual positioning breaks when content length changes, screen sizes differ, or components are resized. Autolayout ensures components are self-correcting.

---

### C-03 — Mobile-First Design

**Rule:** Design every screen for the smallest target viewport first. Expand to larger breakpoints only after the mobile version is complete and approved.

**Breakpoints:**
| Name | Width |
|------|-------|
| Mobile | `[WIDTH]px` (e.g., 390px) |
| Tablet | `[WIDTH]px` (e.g., 768px) |
| Desktop | `[WIDTH]px` (e.g., 1280px) |

**What mobile-first means:**
- Touch targets sized for fingers, not cursors
- Navigation designed for thumb reach
- Content prioritized by importance, not screen real estate
- No hover-only states as primary affordances

**Why this matters:** [PRODUCT_NAME] is primarily used on [DEVICE_CONTEXT]. Desktop adaptations are secondary.

---

### C-04 — One Primary Action Per Screen

**Rule:** Every screen may have exactly one primary button (the most important action). All other actions are secondary, ghost, or icon-only.

**Correct:**
- Home screen: Primary CTA is "Create New [Item]"
- Form screen: Primary CTA is "Save" or "Continue"
- Detail screen: Primary CTA is the main action (e.g., "Book", "Submit", "Pay")

**Incorrect:**
- Two primary buttons on the same screen
- Primary button that is not the most critical action for the user at this moment

**Exception:** Two-pane desktop layouts may have one primary per pane.

---

### C-05 — Contrast Minimums

**Rule:** All text must meet WCAG 2.1 AA contrast ratios at minimum.

| Text type | Minimum contrast ratio |
|-----------|----------------------|
| Normal text (<18px, non-bold) | 4.5:1 |
| Large text (≥18px, or ≥14px bold) | 3:1 |
| UI components and graphical objects | 3:1 |

**How to check:** Use the contrast checker built into Figma, or [Contrast.app](https://contrastapp.co).

**Common failure:** Using `color/neutral/500` text on a white background. Check before using any neutral below `color/neutral/700` for body text.

---

### C-06 — Minimum Touch Target 44×44px

**Rule:** Every interactive element on mobile must have a minimum tap area of 44×44px, even if the visual element is smaller.

**Implementation:**
- If an icon is 24px, add padding to bring the touch frame to 44px
- Use invisible hit area extensions in Figma to document this
- List rows: minimum height 48px (includes touch padding)

---

### C-07 — No Placeholder-Only Labels

**Rule:** Every input field must have a visible label above it. Placeholder text may exist inside the field but cannot be the only label.

**Correct:**
```
Email address         ← visible label above
[name@example.com]    ← placeholder inside field
```

**Incorrect:**
```
[Email address]       ← placeholder only, no separate label
```

**Why this matters:** Placeholder text disappears when the user starts typing, leaving them without context for what they were entering.

---

### C-08 — Destructive Actions Require Confirmation

**Rule:** Any action that permanently deletes, removes, or cancels something that cannot be recovered must present a confirmation dialog before executing.

**Trigger list (minimum):**
- Delete account
- Delete any user-created content
- Cancel a paid subscription
- Remove a team member
- Clear all data / reset app

**Dialog structure:** See `docs/patterns.md → Confirmation Dialog`.

---

## High-Priority Rules

---

### C-09 — Use System Components Only

**Rule:** Do not create one-off component variants for individual screens. If a new variant is needed, add it to the component library and document it in `docs/design-system.md`.

---

### C-10 — No Inline Styles or Overrides

**Rule:** Do not detach components and apply manual style overrides. Use component properties and tokens only. If an override is needed, it means a new variant is needed.

---

### C-13 — Button Labels Must Be Verb-Led

**Rule:** All button and CTA text must start with an action verb.

| Correct | Incorrect |
|---------|-----------|
| "Save changes" | "Changes" |
| "Continue" | "Next" (acceptable only in multi-step flows) |
| "Delete account" | "Account deletion" |
| "Send message" | "Message" |
| "Try again" | "OK" |

---

### C-14 — Empty States Required for Every List

**Rule:** Every screen or section that displays a list must have a designed empty state. Empty states are not optional.

**Minimum content:**
- Headline (what is empty)
- One sentence of guidance
- CTA (if there is an action to take)

---

### C-15 — Every Screen Must Have a Back/Exit

**Rule:** No screen may trap the user. Every screen reachable via navigation must have a way to go back or close.

**Back:** Appears on all push navigation screens (top left, standard back button)
**Close:** Appears on all sheets and modals (top right X, or swipe-to-dismiss)

---

### C-17 — Bottom Safe Area

**Rule:** On mobile, all bottom-positioned UI elements (buttons, tab bars, CTAs) must account for the device's safe area inset.

**In Figma:** Use `spacing/xl` + mark safe area padding separately.
**In code:** Use `SafeAreaView` (React Native) or `env(safe-area-inset-bottom)` (web).

---

## Enforcement

When running an LLM audit (`prompts/audit.prompt.md`), the model must check every output against this constraint list. Any violation must be called out by constraint ID (e.g., "Violates C-01: hardcoded color `#FF0000` on button background").

All design reviews must reference this file.
