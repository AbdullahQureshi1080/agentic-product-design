# Product Context

> This file is the primary context document for all LLM design sessions.
> Fill in every section before running any prompts.
> The more complete this file, the less you need to re-explain in each session.

---

## Product Overview

**Product Name:** [PRODUCT_NAME]

**One-line description:**
[A single sentence describing what the product does and for whom.]

**Product type:**
[ ] Mobile app (iOS / Android / both)
[ ] Web app (desktop-first)
[ ] Web app (mobile-first)
[ ] Cross-platform
[ ] Internal tool
[ ] Other: [SPECIFY]

**Current stage:**
[ ] Concept / zero-to-one
[ ] Early MVP
[ ] Post-launch, iterating
[ ] Scaling / platform phase

**Core problem this product solves:**
[Describe the specific pain point or gap in 2–4 sentences. Be concrete. Avoid marketing language.]

**What this product is NOT:**
[Explicitly state what is out of scope. This prevents LLMs from hallucinating features.]

---

## User Personas

> Define 1–3 primary personas. Each persona should inform how you prioritize flows and UI complexity.

### Persona 1: [PERSONA_NAME]

- **Role / context:** [Who they are in their life or work]
- **Primary goal:** [What they are trying to accomplish with this product]
- **Key frustrations:** [What currently slows them down or blocks them]
- **Technical literacy:** [Low / Medium / High]
- **Device context:** [Mobile primary / Desktop primary / Both equally]
- **Usage frequency:** [Daily / Weekly / Occasional]
- **Success looks like:** [What a successful session looks like for this persona]

---

### Persona 2: [PERSONA_NAME]

- **Role / context:** [Who they are in their life or work]
- **Primary goal:** [What they are trying to accomplish with this product]
- **Key frustrations:** [What currently slows them down or blocks them]
- **Technical literacy:** [Low / Medium / High]
- **Device context:** [Mobile primary / Desktop primary / Both equally]
- **Usage frequency:** [Daily / Weekly / Occasional]
- **Success looks like:** [What a successful session looks like for this persona]

---

### Persona 3 (optional): [PERSONA_NAME]

- **Role / context:** [Who they are in their life or work]
- **Primary goal:** [What they are trying to accomplish with this product]
- **Key frustrations:** [What currently slows them down or blocks them]
- **Technical literacy:** [Low / Medium / High]
- **Device context:** [Mobile primary / Desktop primary / Both equally]
- **Usage frequency:** [Daily / Weekly / Occasional]
- **Success looks like:** [What a successful session looks like for this persona]

---

## Feature Breakdown

> List all features by category. Mark status for each. Do not include aspirational features unless they are actively being designed.

### Status key

| Symbol | Meaning |
|--------|---------|
| `[live]` | In production |
| `[building]` | In active development |
| `[designing]` | Being designed now |
| `[planned]` | On roadmap, not started |
| `[exploring]` | Under consideration |

---

### Core Features

| Feature | Description | Status | Primary Persona |
|---------|-------------|--------|-----------------|
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |

---

### Secondary Features

| Feature | Description | Status | Primary Persona |
|---------|-------------|--------|-----------------|
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |

---

### Admin / Settings

| Feature | Description | Status | Primary Persona |
|---------|-------------|--------|-----------------|
| [FEATURE_NAME] | [What it does, one sentence] | [STATUS] | [PERSONA] |

---

## Technical Constraints

> Constraints that directly affect what the UI can or cannot do.

- **Framework / platform:** [e.g., React Native, SwiftUI, Next.js]
- **Design handoff target:** [e.g., Figma → React Native via CodeConnect]
- **Token source of truth:** [e.g., Figma Variables, style-dictionary, Tailwind config]
- **Minimum supported OS / browser:** [e.g., iOS 16+, Chrome 110+]
- **Accessibility requirement:** [e.g., WCAG 2.1 AA]
- **RTL support required:** [Yes / No]
- **Dark mode required:** [Yes / No / Planned]
- **Animation constraints:** [e.g., Respect prefers-reduced-motion, no complex animations on low-end devices]

---

## Business Constraints

> Constraints that affect design scope and prioritization.

- **Launch deadline (if applicable):** [DATE or N/A]
- **Design resources:** [e.g., 1 designer, part-time]
- **Key stakeholder priorities:** [What the business cares most about — retention, conversion, etc.]
- **Monetization model:** [Free / Subscription / Per-use / Enterprise] — affects what flows are prioritized

---

## Example (Do Not Use)

> The following shows how this file might look when filled in. Delete before use.

```
Product Name: Fieldnote
One-line description: A mobile-first note-taking app for field researchers who work offline.
Product type: Mobile app (iOS / Android / both)
Current stage: Early MVP

Core problem: Field researchers lose structured data when they have no connectivity.
              Existing apps require a network connection to sync or don't support
              structured templates.

What this is NOT: A general-purpose note app, a team collaboration tool,
                  or a replacement for lab notebooks.

Persona 1: The Field Researcher
  Role: Academic or NGO researcher working in areas with poor connectivity
  Primary goal: Capture structured observations without losing data
  Technical literacy: Medium
  Device: Mobile primary
  Usage frequency: Daily during fieldwork, weekly otherwise
```
