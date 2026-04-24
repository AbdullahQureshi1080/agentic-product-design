# User Flows

> This file maps all user flows in the product. It is used by LLM sessions to
> understand scope, naming, and sequencing before generating any screens.
> Every flow referenced in a prompt must be listed here first.

---

## Naming Conventions

### Flow IDs

All flows use the format: `[DOMAIN]-[NUMBER]`

- `AUTH-01`, `AUTH-02` — Authentication flows
- `ONBOARD-01` — Onboarding flows
- `CORE-01`, `CORE-02` — Core product flows
- `SETTINGS-01` — Settings / account flows
- `EMPTY-01` — Empty states
- `ERROR-01` — Error flows

### Screen IDs

Screens within a flow use the format: `[FLOW_ID]/[SCREEN_NUMBER]-[SCREEN_NAME]`

Example: `AUTH-01/01-splash`, `AUTH-01/02-login`, `AUTH-01/03-verify`

### Figma Frame Naming

All Figma frames must follow this convention exactly:

```
[FLOW_ID] / [SCREEN_ID] — [Screen Label]
```

Example:
```
AUTH-01 / 01-splash — Splash Screen
AUTH-01 / 02-login — Login
CORE-01 / 01-home — Home Feed
```

This naming is required for MCP frame targeting. See `guides/figma-mcp.md`.

---

## Flow Map

> List every flow. For each flow, list its screens in order.
> Mark which screens are designed, in progress, or not started.

### Status key

| Symbol | Meaning |
|--------|---------|
| `[done]` | Designed and approved |
| `[wip]` | In progress |
| `[todo]` | Not started |
| `[blocked]` | Blocked on decision |

---

### AUTH — Authentication

**AUTH-01: Sign Up**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| AUTH-01/01 | Splash | [todo] | |
| AUTH-01/02 | Sign Up Entry | [todo] | Email or social |
| AUTH-01/03 | Email Verification | [todo] | 6-digit code |
| AUTH-01/04 | Profile Setup | [todo] | Optional step |
| AUTH-01/05 | Permissions | [todo] | Notifications, location |
| AUTH-01/06 | Welcome / Landing | [todo] | First home state |

**AUTH-02: Sign In**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| AUTH-02/01 | Sign In Entry | [todo] | |
| AUTH-02/02 | Forgot Password | [todo] | |
| AUTH-02/03 | Reset Sent Confirmation | [todo] | |

---

### ONBOARD — Onboarding

**ONBOARD-01: First-run Experience**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| ONBOARD-01/01 | [SCREEN_NAME] | [todo] | |
| ONBOARD-01/02 | [SCREEN_NAME] | [todo] | |
| ONBOARD-01/03 | [SCREEN_NAME] | [todo] | |

---

### CORE — Core Product Flows

**CORE-01: [PRIMARY_FLOW_NAME]**

> [Describe what the user is trying to accomplish in this flow.]

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| CORE-01/01 | [SCREEN_NAME] | [todo] | |
| CORE-01/02 | [SCREEN_NAME] | [todo] | |
| CORE-01/03 | [SCREEN_NAME] | [todo] | |
| CORE-01/04 | [SCREEN_NAME] | [todo] | |

**CORE-02: [SECONDARY_FLOW_NAME]**

> [Describe what the user is trying to accomplish in this flow.]

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| CORE-02/01 | [SCREEN_NAME] | [todo] | |
| CORE-02/02 | [SCREEN_NAME] | [todo] | |
| CORE-02/03 | [SCREEN_NAME] | [todo] | |

---

### SETTINGS — Settings & Account

**SETTINGS-01: Account Management**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| SETTINGS-01/01 | Settings Home | [todo] | |
| SETTINGS-01/02 | Edit Profile | [todo] | |
| SETTINGS-01/03 | Notifications | [todo] | |
| SETTINGS-01/04 | Privacy | [todo] | |
| SETTINGS-01/05 | Delete Account | [todo] | Destructive flow |

---

### EMPTY — Empty States

**EMPTY-01: Empty States per Feature**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| EMPTY-01/01 | [FEATURE] — No Data | [todo] | |
| EMPTY-01/02 | [FEATURE] — No Results | [todo] | |
| EMPTY-01/03 | [FEATURE] — First Use | [todo] | |

---

### ERROR — Error States

**ERROR-01: System Errors**

| Screen ID | Screen Label | Status | Notes |
|-----------|-------------|--------|-------|
| ERROR-01/01 | No Internet | [todo] | |
| ERROR-01/02 | Server Error | [todo] | |
| ERROR-01/03 | Session Expired | [todo] | |
| ERROR-01/04 | Permission Denied | [todo] | |

---

## Flow Relationships

> Document how flows connect. Useful for LLMs understanding navigation state.

```
Splash (AUTH-01/01)
  ├── New user → Sign Up (AUTH-01/02)
  │     └── Success → Onboarding (ONBOARD-01/01)
  │           └── Complete → Core Home (CORE-01/01)
  └── Returning user → Sign In (AUTH-02/01)
        └── Success → Core Home (CORE-01/01)
```

> Add your product's full navigation tree above using the same format.

---

## Flow Design Principles

These rules apply to every flow. Reference them when prompting:

1. **Every flow must have an exit.** Users must always be able to go back or cancel.
2. **Error states are part of the flow.** Design them alongside the happy path.
3. **Empty states are first-run experiences.** They should orient, not confuse.
4. **Destructive actions require confirmation.** One extra step before delete / logout / cancel.
5. **Progress must be visible.** Multi-step flows show progress indicator.
6. **No dead ends.** Every screen must have a clear primary action.

---

## Example (Do Not Use)

> A real filled-in example for a task management app. Delete before use.

```
CORE-01: Create Task

  CORE-01/01 — Task List (Home)
    User sees all tasks. CTA to add new task.

  CORE-01/02 — Add Task Sheet
    Bottom sheet. Title, due date, priority.

  CORE-01/03 — Task Detail
    Full task view. Edit, complete, delete actions.

  CORE-01/04 — Delete Confirmation Modal
    "Delete this task?" — destructive confirm dialog.

Figma frames:
  CORE-01 / 01 — Task List
  CORE-01 / 02 — Add Task Sheet
  CORE-01 / 03 — Task Detail
  CORE-01 / 04 — Delete Confirmation
```
