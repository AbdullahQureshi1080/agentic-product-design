# Product Context

> Claude reads this file at the start of every session.
> You fill in Section 1 and 2. Claude fills in Section 3 from your Figma file.
> Do not edit Section 3 manually — Claude will overwrite it.
> Section 4 is written by Claude as decisions are made.

---

## Section 1 — Product

COMPLETION: [ ] incomplete

```
Product name:
One-line description:
Type:                    (mobile / web / cross-platform / internal tool)
Stage:                   (zero-to-one / MVP / post-launch / scaling)

Primary problem solved:

What this product is NOT:

---

Persona 1
  Name:
  Role / context:
  Primary goal:
  Device:                (mobile / desktop / both)
  Technical literacy:    (low / medium / high)
  Usage frequency:       (daily / weekly / occasional)

Persona 2 (optional)
  Name:
  Role / context:
  Primary goal:
  Device:
  Technical literacy:
  Usage frequency:

---

Technical constraints:
  Framework:
  Design handoff target:
  Min OS / browser:
  Accessibility:         (WCAG 2.1 AA by default)
  Dark mode:             (yes / no / planned)
  RTL:                   (yes / no)
```

---

## Section 2 — Flows

COMPLETION: [ ] incomplete

```
Flow naming: [DOMAIN]-[NUMBER]
Screen naming: [FLOW_ID] / [SCREEN_ID] — [Screen Label]
Figma frame names must match screen naming exactly.

---

[Claude populates this from your description of the user journey.
Tell Claude: "Walk me through what the user does from open to core value."
Claude will generate the flow map and write it here.]

---

Flow relationships:
[Claude generates the navigation tree here.]
```

---

## Section 3 — Design System

COMPLETION: [ ] incomplete

```
Figma file key:
Token source:    (Figma Variables / Tailwind / CSS custom properties / other)

[Claude reads your Figma Variables and text styles via MCP and populates below.
If no Figma Variables exist, tell Claude your brand hex values and it will
generate the full token structure and write it here.]

---

Colors:
  color/brand/primary:
  color/brand/secondary:
  color/neutral/900:
  color/neutral/700:
  color/neutral/500:
  color/neutral/300:
  color/neutral/100:
  color/neutral/050:
  color/semantic/success:
  color/semantic/warning:
  color/semantic/error:
  color/semantic/info:
  color/surface/base:
  color/surface/elevated:
  color/surface/overlay:

Typography:
  Heading font:
  Body font:
  Base size: 16px
  Scale:
    type/display/xl:
    type/display/lg:
    type/heading/xl:
    type/heading/lg:
    type/heading/md:
    type/heading/sm:
    type/body/lg:
    type/body/md:
    type/body/sm:
    type/label/lg:
    type/label/md:
    type/label/sm:

Spacing (base unit: 8px):
  spacing/2xs:  4px
  spacing/xs:   8px
  spacing/sm:   12px
  spacing/md:   16px
  spacing/lg:   24px
  spacing/xl:   32px
  spacing/2xl:  48px
  spacing/3xl:  64px

Radius:
  radius/xs:    4px
  radius/sm:    8px
  radius/md:    12px
  radius/lg:    16px
  radius/xl:    24px
  radius/full:  9999px

Elevation:
  elevation/none:
  elevation/xs:
  elevation/sm:
  elevation/md:
  elevation/lg:

Icon library:
Icon default size: 24px

Component defaults:
  Button min height:     44px (mobile)
  Input min height:      44px (mobile)
  List row min height:   48px (mobile)
  Bottom tab bar height: 83px (mobile)
  Page horizontal padding: spacing/lg
```

---

## Section 4 — Decisions

COMPLETION: not required — Claude writes here during sessions

```
[Claude logs significant design decisions here as they are made.
Format: [DATE] [FLOW_ID] — Decision: [what] — Reason: [why] — Trade-off: [what it rules out]]

---
```
