# Hi-Fi Translation Prompt

> Use this prompt to convert approved wireframes into production-quality UI designs.
> Hi-fi output must be fully token-compliant and component-complete.
> Only run this after wireframes have been reviewed and approved.

---

## Prerequisites

Before using this prompt:
- [ ] Wireframe for this flow is approved (no structural changes pending)
- [ ] Design system is documented in `docs/design-system.md`
- [ ] All patterns are defined in `docs/patterns.md`
- [ ] Constraints file is current (`docs/constraints.md`)

Do not run hi-fi generation on unapproved wireframes. Changes at hi-fi stage are expensive.

---

## Context Block (Paste at Top of Every Session)

```
You are a senior product designer translating approved wireframes into production-ready UI.
I am building [PRODUCT_NAME].

Read and internalize all five context files before proceeding:
1. docs/product.md
2. docs/flows.md
3. docs/design-system.md
4. docs/patterns.md
5. docs/constraints.md

You are generating high-fidelity UI specs. All output must be:
- Token-compliant (no hardcoded values — C-01)
- Component-based (use system components — C-09)
- Autolayout-structured (C-02)
- Accessible (contrast and touch target compliant — C-05, C-06)

Confirm when you have read the context. I will then provide the wireframe and hi-fi task.
```

---

## Hi-Fi Prompt

```
## Task: Translate Wireframe to Hi-Fi

### Source
Flow ID: [FLOW_ID]
Flow name: [FLOW_NAME]
Approved wireframe: [Paste or reference the wireframe description from the wireframe session]

### Screens to Render
Translate the following screens to hi-fi:

1. [SCREEN_ID] — [SCREEN_NAME]
2. [SCREEN_ID] — [SCREEN_NAME]
3. [SCREEN_ID] — [SCREEN_NAME]

### Visual Style Direction

**Overall tone:** [e.g., Clean and minimal / Warm and approachable / Dense and data-focused]
**Brand weight:** [e.g., Brand color used sparingly as accent / Brand color as dominant tone]
**Surface treatment:** [e.g., White surfaces, no gradients / Dark mode first / Subtle background texture]
**Illustration / iconography style:** [e.g., Phosphor Icons, outlined, 20px / SF Symbols / Custom SVG set]

### Token Usage (All Required)

**Typography — use these tokens:**
- Page/screen title: `type/heading/xl`
- Section header: `type/heading/md`
- Body content: `type/body/md`
- Supporting detail / caption: `type/body/sm`
- Labels / buttons: `type/label/lg`
- Timestamps / metadata: `type/label/sm`

**Colors — use these tokens:**
- Primary brand: `color/brand/primary`
- Text primary: `color/neutral/900`
- Text secondary: `color/neutral/700`
- Surface background: `color/surface/base`
- Card / elevated: `color/surface/elevated`
- Borders: `color/neutral/300`
- Primary button: `color/brand/primary` background, white text
- Destructive: `color/semantic/error`

**Spacing — use these tokens:**
- Screen horizontal padding: `spacing/lg`
- Section vertical gap: `spacing/xl`
- Card internal padding: `spacing/md`
- List row vertical padding: `spacing/sm`
- Between form fields: `spacing/md`

**Radius — use these tokens:**
- Card: `radius/md`
- Button: `radius/sm`
- Input: `radius/sm`
- Sheet/modal: `radius/xl` (top corners only)
- Badge/tag: `radius/xs`

### Component Specifications

For each component on each screen, specify:

**Buttons:**
- [SCREEN]: Primary button — "[LABEL]" — `type/label/lg`, `color/brand/primary` bg, `radius/sm`, height `[HEIGHT]px`
- [SCREEN]: Secondary button — "[LABEL]" — `color/surface/elevated` bg, `color/neutral/300` border

**Inputs:**
- [SCREEN]: Text input — label "[LABEL]" above field, `color/neutral/300` border default, `color/brand/primary` border on focus
- [SCREEN]: [Input type] — [specific treatment]

**Navigation:**
- Bottom tab bar: [List 4–5 tab items with icons and labels]
- Active tab: `color/brand/primary` icon + label
- Inactive tab: `color/neutral/500` icon, no label

**Cards:**
- [SCREEN]: Card dimensions — full width, `radius/md`, `elevation/sm`, `color/surface/elevated` bg, `spacing/md` padding

**List rows:**
- [SCREEN]: Row height — `[HEIGHT]px`, left: [CONTENT], right: [CONTENT or CHEVRON], divider `color/neutral/100`

### States to Render

For each screen, render:
- [ ] Default state
- [ ] Loading / skeleton state
- [ ] Empty state
- [ ] Error state
- [ ] Any hover/pressed states (desktop only)

### Interaction Annotations

For each screen, add:
- Tap target annotations on all interactive elements
- Transition annotations: "[Element] tapped → [Destination screen or overlay]"
- Sheet/modal triggers and their source elements

### Figma Output Specification

If generating for Figma:
- Frame name format: `[FLOW_ID] / [SCREEN_ID] — [Screen Label]`
  Example: `CORE-01 / 01 — Task List`
- Frame size: [390×844px for mobile / 768×1024px for tablet / 1280×800px for desktop]
- All components must be from the component library (detach = never)
- All text styles must use Figma text styles, not manual overrides
- All color fills must use Figma variables, not raw hex

### Constraints Check (Run Before Finalizing)

Verify every screen against:
- [ ] C-01: No hardcoded values
- [ ] C-02: Autolayout on all frames
- [ ] C-03: Mobile-first — smallest breakpoint complete first
- [ ] C-04: One primary button per screen
- [ ] C-05: Contrast ratio ≥4.5:1 for all text
- [ ] C-06: Touch targets ≥44×44px
- [ ] C-07: All inputs have visible labels
- [ ] C-08: Destructive actions have confirmation dialog
- [ ] C-14: Empty states designed for all lists
- [ ] C-15: Every screen has a back or close action
- [ ] C-17: Bottom safe area accounted for

Report any violations before delivering output.

### Output Format

For each screen, provide:
1. Screen ID and name
2. Frame spec (dimensions, background)
3. Layer structure (top to bottom):
   - Layer name
   - Component or element type
   - Token references for all properties
   - Dimensions (using autolayout logic, not fixed values where possible)
4. Interaction annotations
5. Any open questions or constraint violations found
```

---

## Post-Generation Checklist

After receiving hi-fi output:

- [ ] Every screen from the wireframe is represented
- [ ] All token references are named (no raw values)
- [ ] All components are named system components (no custom one-offs)
- [ ] Loading, empty, and error states are all present
- [ ] Destructive flows have confirmation steps
- [ ] Frame names follow Figma naming convention
- [ ] No open questions left unresolved

If issues found: use `prompts/refinement.prompt.md` or `prompts/audit.prompt.md`.
