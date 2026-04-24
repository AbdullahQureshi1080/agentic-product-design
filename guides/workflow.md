# Design Workflow

> The complete step-by-step workflow for LLM-assisted product design.
> Follow this process in order. Do not skip steps.

---

## Process Overview

```
Step 1: Define Product        →   docs/product.md
Step 2: Define Flows          →   docs/flows.md
Step 3: Generate Wireframes   →   prompts/wireframe.prompt.md
Step 4: Review Wireframes     →   docs/constraints.md (checklist)
Step 5: Convert to Hi-Fi      →   prompts/hi-fi.prompt.md
Step 6: Refine                →   prompts/refinement.prompt.md
Step 7: Audit                 →   prompts/audit.prompt.md
```

---

## Step 1 — Define the Product

**Goal:** Establish the product context that all future sessions will use.

**Owner:** Product designer + product manager

**Actions:**
1. Open `docs/product.md`
2. Complete every section:
   - Product overview (name, description, type, stage)
   - User personas (1–3, with device context and technical literacy)
   - Feature breakdown (all features with status and primary persona)
   - Technical and business constraints
3. Review with stakeholders. Confirm sign-off before proceeding.

**Done when:**
- All sections of `docs/product.md` are complete
- No `[PLACEHOLDER]` values remain
- Product overview reviewed by ≥1 stakeholder

**Common mistake:** Leaving "current stage" or "technical constraints" blank. These affect how the LLM prioritizes features and what it treats as MVP scope.

---

## Step 2 — Define Flows

**Goal:** Map every user flow and screen before any design begins.

**Owner:** Product designer

**Actions:**
1. Open `docs/flows.md`
2. List every flow using the naming convention: `[DOMAIN]-[NUMBER]`
3. For each flow, list every screen in order with screen IDs
4. Build the flow relationship tree (navigation map)
5. Update `figma/figma-map.json` with the same flow and screen structure

**Done when:**
- All flows are listed in `docs/flows.md`
- Every screen has a unique ID and label
- Navigation relationships are defined
- `figma/figma-map.json` reflects the same structure

**Common mistake:** Starting with only the "happy path" and ignoring error, empty, and edge-case states. Add them as separate screen entries during this step.

---

## Step 3 — Generate Wireframes

**Goal:** Generate low-fidelity layouts for each flow, one flow at a time.

**Owner:** Product designer + LLM

**Actions per flow:**

1. Open `prompts/wireframe.prompt.md`
2. Start your LLM session. Paste the **context block** from the top of the prompt file.
3. Wait for the LLM to confirm it has read all context files.
4. Fill in the **wireframe prompt** with your flow's details:
   - Flow ID and name
   - Screen list with entry points, goals, and exit points
   - Persona context
   - Layout requirements and content
   - States to generate
5. Send the prompt. Receive the wireframe spec.
6. Run the **post-generation checklist** at the bottom of `wireframe.prompt.md`.
7. If the checklist reveals issues, use `prompts/refinement.prompt.md` to address them.
8. When the wireframe is complete, update the screen statuses in `docs/flows.md` from `[todo]` to `[wip]` or `[done]`.

**Scope rule:** One flow per session. Do not attempt multiple flows in a single session — context dilution degrades output quality.

**Done when:**
- All screens in the flow have wireframe specs
- Post-generation checklist passes
- No open questions remain about layout or interaction

---

## Step 4 — Review Wireframes

**Goal:** Confirm the wireframe is structurally correct before spending time on hi-fi.

**Owner:** Product designer (+ stakeholders for key flows)

**Actions:**
1. For each screen, check against `docs/constraints.md` manually:
   - One primary action per screen (C-04)
   - Every screen has a back/exit (C-15)
   - No dead ends in the flow
   - Empty and error states defined
   - Destructive actions have confirmation steps (C-08)
2. Run a lightweight version of `prompts/audit.prompt.md` — Pass 1 (constraints) only.
3. For flows that touch core product or high-traffic paths: share wireframe with 1–2 stakeholders for structural feedback.
4. Collect feedback. Log any decisions made in `docs/decisions.md`.

**Do not:**
- Give feedback on color, typography, or visual style at this stage (wireframes have none)
- Approve wireframes with structural issues — fix them now, not in hi-fi

**Done when:**
- All structural feedback is addressed
- Constraints checklist passes
- Screen statuses updated to `[done]` in `docs/flows.md`

---

## Step 5 — Convert to Hi-Fi

**Goal:** Translate approved wireframes into production-ready, token-compliant UI specs.

**Owner:** Product designer + LLM

**Prerequisites (hard requirements):**
- [ ] Wireframe for this flow is approved (Step 4 complete)
- [ ] `docs/design-system.md` is fully populated with real token values
- [ ] `figma/figma-map.json` has frame names defined for this flow

**Actions per flow:**

1. Open `prompts/hi-fi.prompt.md`
2. Start your LLM session. Paste the **context block**.
3. Wait for confirmation.
4. Fill in the **hi-fi prompt**:
   - Reference the approved wireframe (paste the spec)
   - Specify visual style direction
   - Enumerate all token references per element type
   - List all states to render
   - Specify Figma frame names
5. Receive hi-fi spec.
6. Run the **post-generation checklist** from the hi-fi prompt file.
7. If issues found: use `prompts/refinement.prompt.md`.

**Token discipline:** The LLM must reference token names, not values. If the output says `#4A90E2` instead of `color/brand/primary`, do not accept it. Use refinement to fix.

**Done when:**
- All screens have hi-fi specs with token-compliant values
- All states are rendered
- Frame names match `figma/figma-map.json`

---

## Step 6 — Refine

**Goal:** Iterate on specific issues without redesigning the whole flow.

**Owner:** Product designer + LLM

**When to use this step:**
- Specific screens have issues after hi-fi generation
- Feedback from stakeholder review requires targeted changes
- Constraint violations found during review
- Copy or content needs updating

**Actions:**
1. Open `prompts/refinement.prompt.md`
2. List the specific issues, scoped to specific screens and elements
3. Paste the current design spec as the reference
4. Send the prompt. Receive targeted fixes only.
5. Verify the fixes did not introduce new issues.

**Iteration limit:** Maximum 3 refinement rounds per screen. If a screen still has fundamental issues after 3 rounds, restart with the wireframe prompt.

**Done when:**
- All identified issues are resolved
- No new constraint violations introduced
- Refinement changes do not affect out-of-scope screens

---

## Step 7 — Audit

**Goal:** Final quality gate before development handoff.

**Owner:** Product designer

**When to run:**
- After hi-fi is complete and refinement rounds are done
- Before any design is marked "approved" or sent to engineering

**Actions:**
1. Open `prompts/audit.prompt.md`
2. Paste the complete hi-fi spec for the flow
3. Run all 5 audit passes
4. Review the audit report:
   - **APPROVE:** Proceed to handoff
   - **APPROVE WITH MINOR FIXES:** Apply fixes, verify manually, then handoff
   - **REVISE AND REAUDIT:** Apply all Critical/High fixes, re-run audit

**Actions after approval:**
1. Update screen statuses in `docs/flows.md` to `[done]`
2. Log any significant decisions in `docs/decisions.md`
3. Update node IDs in `figma/figma-map.json` after creating frames in Figma
4. Prepare handoff annotation (tokens, interactions, measurements)

---

## Workflow Timing Reference

> Rough time estimates per flow, assuming 3–5 screens.

| Step | Time (solo designer + LLM) |
|------|---------------------------|
| Step 1: Define product | 1–3 hours (once per product) |
| Step 2: Define flows | 1–2 hours (once per product) |
| Step 3: Wireframes (per flow) | 30–60 minutes |
| Step 4: Wireframe review | 30–60 minutes |
| Step 5: Hi-fi (per flow) | 60–120 minutes |
| Step 6: Refinement (per flow) | 30–60 minutes |
| Step 7: Audit (per flow) | 20–40 minutes |

---

## Parallel Work Rules

Some steps can run in parallel. Some cannot.

| Rule | Reason |
|------|--------|
| Steps 1 and 2 must complete before Step 3 | LLM needs complete product + flow context |
| Wireframes for independent flows can be done in parallel | They do not depend on each other |
| Hi-fi cannot start until the wireframe for that flow is approved | Changes at hi-fi stage are expensive |
| Audit must be the last step before handoff | It gates approval |
| Decisions must be logged throughout | Not deferred to end |

---

## Maintaining the System

- **When you make a significant design decision:** Log it in `docs/decisions.md`
- **When you establish a new pattern:** Add it to `docs/patterns.md`
- **When you add a new token:** Add it to `docs/design-system.md`
- **When you add a new flow or screen:** Add it to `docs/flows.md` and `figma/figma-map.json`
- **When you complete a screen:** Update its status in `docs/flows.md`

The system only works if these files stay current. Stale docs lead to inconsistent LLM output.
