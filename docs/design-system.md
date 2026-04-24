# Design System

> This file defines the design language for [PRODUCT_NAME].
> All LLM sessions must read this file before generating any UI.
> Never hardcode values. Always reference the token names defined here.

---

## Token System

### Naming Convention

All tokens follow this structure:

```
[category]/[variant]/[state]
```

Examples:
- `color/primary/default`
- `color/primary/hover`
- `color/surface/elevated`
- `spacing/sm`
- `radius/md`

---

### Color Tokens

> Replace hex values with your actual brand colors.
> If you use Figma Variables, these names must match exactly.

#### Brand

| Token | Value | Usage |
|-------|-------|-------|
| `color/brand/primary` | `[HEX]` | Primary actions, key highlights |
| `color/brand/secondary` | `[HEX]` | Secondary actions, accents |
| `color/brand/tertiary` | `[HEX]` | Supporting accents |

#### Neutrals

| Token | Value | Usage |
|-------|-------|-------|
| `color/neutral/900` | `[HEX]` | Primary text |
| `color/neutral/700` | `[HEX]` | Secondary text |
| `color/neutral/500` | `[HEX]` | Placeholder text, disabled |
| `color/neutral/300` | `[HEX]` | Borders |
| `color/neutral/100` | `[HEX]` | Dividers, subtle backgrounds |
| `color/neutral/050` | `[HEX]` | Page background |

#### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `color/semantic/success` | `[HEX]` | Success states, confirmations |
| `color/semantic/warning` | `[HEX]` | Warning states |
| `color/semantic/error` | `[HEX]` | Error states, destructive actions |
| `color/semantic/info` | `[HEX]` | Informational states |

#### Surface

| Token | Value | Usage |
|-------|-------|-------|
| `color/surface/base` | `[HEX]` | Default background |
| `color/surface/elevated` | `[HEX]` | Cards, sheets, modals |
| `color/surface/overlay` | `[HEX + OPACITY]` | Modal overlays |

#### Dark Mode (if applicable)

| Light Token | Dark Mode Override | Notes |
|-------------|-------------------|-------|
| `color/neutral/900` | `[HEX]` | Inverted text |
| `color/surface/base` | `[HEX]` | Dark background |
| `color/surface/elevated` | `[HEX]` | Dark elevated surface |

---

### Typography

#### Typefaces

| Role | Font Family | Source |
|------|-------------|--------|
| Display / Heading | `[FONT_NAME]` | [Google Fonts / Custom / System] |
| Body | `[FONT_NAME]` | [Google Fonts / Custom / System] |
| Monospace | `[FONT_NAME]` | [Google Fonts / Custom / System] |

#### Type Scale

All sizes in `px` (Figma) / `rem` (code). Base: `16px = 1rem`.

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `type/display/xl` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Hero, splash |
| `type/display/lg` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Page titles |
| `type/heading/xl` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Section headers |
| `type/heading/lg` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Card titles |
| `type/heading/md` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | List headers |
| `type/heading/sm` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Labels, table headers |
| `type/body/lg` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Long-form body text |
| `type/body/md` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Default body text |
| `type/body/sm` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Secondary body, captions |
| `type/label/lg` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Button text, form labels |
| `type/label/md` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Tags, badges |
| `type/label/sm` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Micro labels, timestamps |
| `type/mono/md` | `[SIZE]px` | `[LH]` | `[WEIGHT]` | Code, data values |

#### Typography Rules

- Never use font sizes outside the type scale.
- Never use font weights outside the defined set.
- Body text maximum width: `[MAX_WIDTH]ch` (typically 65–75ch).
- Heading text must not wrap beyond 2 lines in any viewport.
- All interactive labels use `type/label/*` tokens.

---

### Spacing System

> Spacing is based on a [4px / 8px] base unit. Replace with your actual system.

| Token | Value | Usage |
|-------|-------|-------|
| `spacing/2xs` | `[VALUE]px` | Icon internal padding |
| `spacing/xs` | `[VALUE]px` | Tight element gaps |
| `spacing/sm` | `[VALUE]px` | Compact list items |
| `spacing/md` | `[VALUE]px` | Default padding, gaps |
| `spacing/lg` | `[VALUE]px` | Section padding |
| `spacing/xl` | `[VALUE]px` | Page-level padding |
| `spacing/2xl` | `[VALUE]px` | Section breaks |
| `spacing/3xl` | `[VALUE]px` | Major layout divisions |

#### Spacing Rules

- All spacing values must use tokens. No raw pixel values.
- Horizontal page padding: `spacing/lg` on mobile, `spacing/xl` on desktop.
- List item vertical padding: `spacing/sm` minimum.
- Modal/sheet internal padding: `spacing/lg`.
- Bottom safe area clearance (mobile): `spacing/xl` + system inset.

---

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius/xs` | `[VALUE]px` | Tags, badges, chips |
| `radius/sm` | `[VALUE]px` | Inputs, small cards |
| `radius/md` | `[VALUE]px` | Standard cards |
| `radius/lg` | `[VALUE]px` | Large cards, sheets |
| `radius/xl` | `[VALUE]px` | Modals, bottom sheets |
| `radius/full` | `9999px` | Pills, avatars, FABs |

---

### Elevation / Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `elevation/none` | none | Flat surfaces |
| `elevation/xs` | `[CSS SHADOW]` | Inline cards |
| `elevation/sm` | `[CSS SHADOW]` | Floating cards |
| `elevation/md` | `[CSS SHADOW]` | Dropdowns, tooltips |
| `elevation/lg` | `[CSS SHADOW]` | Sheets, modals |
| `elevation/xl` | `[CSS SHADOW]` | Dialogs, overlays |

---

### Iconography

| Property | Value |
|----------|-------|
| Icon library | [e.g., Phosphor Icons, SF Symbols, Lucide] |
| Default size | [SIZE]px |
| Sizes available | `[16, 20, 24, 32]px` |
| Stroke weight | `[1.5 / 2]px` |
| Color | Always use color tokens, never hardcode |

---

## Component Usage Rules

> These rules govern how components are used. LLMs must follow them when generating screens.

### Buttons

| Variant | Usage | When NOT to use |
|---------|-------|-----------------|
| `Primary` | Single most important action per screen | More than once per screen |
| `Secondary` | Supporting action, alternative to primary | As primary CTA |
| `Ghost` | Low-priority actions, destructive alternatives | As the only action on screen |
| `Destructive` | Delete, remove, cancel — irreversible actions | For safe/neutral actions |
| `Icon-only` | Compact contexts (toolbars, lists) | When label adds important clarity |

Rules:
- Maximum **1 primary button** per screen section.
- Button labels must be verb-led: "Save", "Continue", "Delete", not "OK" or "Yes".
- Minimum touch target: `44×44px` on mobile.
- Full-width buttons only at bottom of screen or in forms.

---

### Inputs

| State | Visual treatment |
|-------|-----------------|
| Default | `color/neutral/300` border |
| Focused | `color/brand/primary` border |
| Error | `color/semantic/error` border + error message below |
| Disabled | `color/neutral/100` background, `color/neutral/500` text |
| Success | `color/semantic/success` border (optional, use sparingly) |

Rules:
- Every input must have a visible label (above the field, not placeholder-only).
- Error messages appear below the field, never inside it.
- Password inputs always include a show/hide toggle.
- Required fields: mark with `*`, explain convention once at form level.

---

### Navigation

| Pattern | Context |
|---------|---------|
| Bottom tab bar | Mobile primary navigation (≤5 items) |
| Top tab bar | Secondary navigation within a section |
| Navigation stack | Detail flows, drill-down |
| Sheet | Contextual, task-focused overlays |
| Modal | Blocking decisions, confirmations |

Rules:
- Bottom tab bar max items: **5**.
- Active tab always shows label + icon.
- Inactive tabs: icon only, or icon + label (consistent across app).
- Back button must appear on all push-navigation screens.

---

### Lists

| Pattern | Usage |
|---------|-------|
| Simple list row | Text-only data |
| Media list row | Image/avatar + text |
| Detail list row | Text + supporting detail + action |
| Grouped list | Settings, categorized content |

Rules:
- Minimum row height: `48px` mobile, `40px` desktop.
- Swipe actions (mobile): max 2 actions. Destructive always on trailing side.
- List dividers use `color/neutral/100`.

---

## Design Principles

These apply to all screens. LLMs must respect them in every output.

1. **Token-only values.** No raw hex, px, or font-size values.
2. **Autolayout everywhere.** All frames use autolayout. No manual positioning.
3. **Mobile-first.** Design for the smallest breakpoint first.
4. **One primary action per screen.** Never compete for user attention.
5. **Accessibility by default.** Minimum 4.5:1 contrast ratio for text. 3:1 for UI components.
6. **Content-driven layout.** Layout follows content hierarchy, not arbitrary aesthetics.
7. **Consistent component usage.** Use system components. Do not invent variants.
