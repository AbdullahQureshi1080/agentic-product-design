# Prompt Library

> All prompts produce MCP-executable output — a structured layer plan Claude uses
> to make `use_figma` calls directly. Output is not a spec document for the designer.
> Context (product, flows, tokens, constraints) is already loaded by CLAUDE.md.
> Do not re-state constraints here. Reference `constraints.md` by ID only.

---

## Section 1 — Wireframe

**When:** Building a flow for the first time. Context Sections 1 and 2 must be complete.
**Output:** A frame-by-frame build plan Claude executes on the Figma canvas via MCP.
**Fidelity:** Grayscale only. No tokens. Structure and hierarchy only.

---

### Wireframe Build Plan Template

```
FLOW: [FLOW_ID] — [FLOW_NAME]
DEVICE: [390px mobile / 768px tablet / 1280px desktop]
PAGE: Flows

For each screen below, produce:
  FRAME: [exact Figma frame name]
  DIMENSIONS: [width × height]px
  AUTOLAYOUT: [vertical / horizontal], gap [token], padding [token all sides or T R B L]
  LAYERS (top to bottom):
    [LAYER_NAME] | [component type or shape] | [fill: grayscale %] | [notes]
  PRIMARY_ACTION: [button label and position]
  STATES: [which states to build: default / loading / empty / error]
  TRANSITIONS: [what each interactive element leads to]

---

SCREEN 1
  FRAME: [FLOW_ID] / [SCREEN_ID] — [Label]
  Entry: [what triggers this screen]
  Goal: [what the user achieves here]
  Exit points: [where they can go]
  Content: [realistic data — no lorem ipsum]
  Primary action: [label]
  States required: [list]

SCREEN 2
  [repeat]

SCREEN 3
  [repeat]
```

**What to avoid:**
- Inventing screens not listed in `context.md Section 2`
- Adding features not in `context.md Section 1`
- Using patterns not in `constraints.md`
- Any color other than grayscale
- Lorem ipsum text anywhere

---

## Section 2 — Hi-Fi

**When:** Wireframes for this flow are approved by the designer.
**Prerequisite:** `context.md Section 3` must be complete. Figma Variables must be live in the file.
**Output:** A token-mapped layer plan Claude uses to overwrite wireframe frames via MCP.
**Fidelity:** Full token compliance. Component instances. No raw values anywhere.

---

### Hi-Fi Build Plan Template

```
FLOW: [FLOW_ID] — [FLOW_NAME]
SOURCE FRAMES: [list node IDs from figma-map.json — these frames will be overwritten]
VISUAL TONE: [Clean minimal / Warm approachable / Dense data / Bold expressive]

TOKEN MAP (apply to all frames in this flow):
  Text primary:         color/neutral/900
  Text secondary:       color/neutral/700
  Text placeholder:     color/neutral/500
  Surface base:         color/surface/base
  Surface elevated:     color/surface/elevated
  Border default:       color/neutral/300
  Primary action:       color/brand/primary (fill) + white (text)
  Destructive:          color/semantic/error
  Page H-padding:       spacing/lg
  Section gap:          spacing/xl
  Card padding:         spacing/md
  Row V-padding:        spacing/sm
  Card radius:          radius/md
  Button radius:        radius/sm
  Input radius:         radius/sm
  Sheet radius (top):   radius/xl

For each screen, specify overrides to the above defaults:

SCREEN [SCREEN_ID]:
  COMPONENT INSTANCES (from library — never create standalone):
    [layer name] → [LibraryComponent/Variant] → props: [key=value]
  TOKEN OVERRIDES (only list layers that differ from the TOKEN MAP above):
    [layer name] → [property]: [token]
  TEXT STYLES (bind all text layers to named styles):
    [layer name] → [type/scale/variant token]
  STATES (hi-fi version — same structure as wireframe, now with tokens):
    Loading: skeleton fill color/neutral/100, shimmer animation
    Empty: illustration + type/heading/md + type/body/sm + Button/Primary (if CTA exists)
    Error: color/semantic/error border on affected inputs + error text in type/body/sm
```

**Token compliance check (Claude runs this after writing each frame):**
- Zero raw hex values in any fill, stroke, or effect
- Zero raw px values in any spacing or radius property
- All text layers bound to a text style
- All interactive components are library instances (not standalone)
- All fills on components use Variable bindings, not detached color values

---

## Section 3 — Refinement

**When:** A specific issue is found in a wireframe or hi-fi frame. Scoped to minimum change.
**Output:** A minimal diff — only what changes, with updated token references.
**Do not use for:** Full redesigns, structural navigation changes, adding new screens.

---

### Refinement Request Template

```
FRAME: [exact frame name] | NODE ID: [from figma-map.json]
FIDELITY: [wireframe / hi-fi]
ISSUE:
  Problem: [specific description — quote layer names where possible]
  Constraint violated: [C-XX if applicable]
  Fix required: [specific change — be explicit]
SCOPE:
  Change only: [layer name or section]
  Do not change: [everything else on this frame + all other frames]
```

**Execution:**
1. Claude reads the frame via MCP.
2. Applies only the described change to only the listed layer.
3. Screenshots the updated frame.
4. Confirms: "Fixed [ISSUE] on [FRAME]. Screenshot attached."

**Iteration limit:** 3 rounds per frame. If the issue persists after 3 rounds: rebuild the frame entirely using the wireframe prompt (Section 1), then re-apply hi-fi (Section 2).

---

## Section 4 — Audit

**When:** All frames in a flow are built. Runs automatically per CLAUDE.md workflow.
**Input:** Screenshots of all frames in the flow (Claude takes these via MCP).
**Output:** Violation report + pass/fail verdict.

---

### 5-Pass Audit

Run all 5 passes on the screenshots. Reference `constraints.md` for all rules and pattern definitions.

---

**Pass 1 — Constraint Compliance**

Check C-01 through C-20 against every frame. For each violation:
```
Frame: [FRAME_NAME]
Constraint: C-XX — [rule name]
Element: [specific layer or element]
Detail: [what exactly is wrong]
Fix: [specific change required]
Severity: [Critical / High / Medium]
```
Report PASS for each constraint with no violations.

---

**Pass 2 — UX Quality**

For each frame, assess:

*Clarity*
- Is the primary action immediately obvious without instruction?
- Does information hierarchy lead the eye from most to least important?
- Would a first-time user know what to do?

*Completeness*
- Are default, loading, empty, and error states all present?
- Does every list have an empty state?
- Does every flow have a clear exit or back action?

*Consistency*
- Are components used consistently across all frames in this flow?
- Do patterns match `constraints.md` definitions?
- Does this flow feel like the same product as other flows in `figma-map.json`?

*Copy*
- Are all labels specific and verb-led (C-13)?
- Do error messages state what happened AND what to do?
- Is any copy ambiguous?

Report each issue as:
```
Frame: [FRAME_NAME]
Category: [Clarity / Completeness / Consistency / Copy]
Finding: [what the problem is]
Severity: [Critical / High / Medium / Low]
Fix: [specific recommendation]
```

---

**Pass 3 — Design System Compliance**

Verify against `context.md Section 3`:
- All text layers use named text styles (not manual size/weight overrides)
- All color fills use Variable bindings (not raw hex)
- All spacing and radius values use token names
- All interactive elements are library component instances
- Icons are from the system library at the correct size

---

**Pass 4 — Pattern Compliance**

For each UX pattern used in the frames, verify against `constraints.md → Patterns`:
- Used in an appropriate context
- No anti-patterns present
- All pattern-specific rules followed (e.g., bottom sheet has drag handle, max height 90%)

---

**Pass 5 — Flow Completeness**

Against `context.md Section 2`:
- All screens listed for this flow are present in Figma
- All frame names match the naming convention exactly
- All navigation transitions match the flow relationships
- No screens exist in Figma that are not listed in context.md (flag any undocumented additions)

---

### Audit Output Format

```
AUDIT REPORT — [FLOW_ID] [FLOW_NAME]
Frames audited: [N]
Fidelity: [wireframe / hi-fi]

SUMMARY
  Critical violations:  [N]
  High violations:      [N]
  Medium violations:    [N]
  UX issues:            [N]
  Verdict: [APPROVE / APPROVE WITH MINOR FIXES / REVISE AND REAUDIT]

PASS 1 — Constraints
  [violations or PASS]

PASS 2 — UX Quality
  [findings or PASS]

PASS 3 — Design System
  [violations or PASS]

PASS 4 — Patterns
  [violations or PASS]

PASS 5 — Flow Completeness
  [findings or PASS]

REQUIRED FIXES (Critical → High → Medium)
  1. [Frame] — [Fix]
  2. [Frame] — [Fix]
  ...
```

---

### Verdict Criteria

| Verdict | Condition |
|---------|-----------|
| **APPROVE** | 0 Critical, 0 High |
| **APPROVE WITH MINOR FIXES** | 0 Critical, ≤2 High (clearly scoped), any Medium/Low |
| **REVISE AND REAUDIT** | ≥1 Critical, or ≥3 High |

On REVISE AND REAUDIT: apply all Critical/High fixes via Section 3 (Refinement), re-screenshot, re-run this audit before reporting to designer.
