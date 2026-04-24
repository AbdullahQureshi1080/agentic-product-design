# Figma + MCP Connection Guide

> How to connect an LLM to Figma via the Model Context Protocol (MCP).
> This guide covers setup, frame targeting, token efficiency, and naming conventions.

---

## What Is Figma MCP

The Figma MCP server allows LLMs (like Claude) to read from and write to Figma files programmatically — without manual copy-paste or screenshot handoff.

Capabilities via MCP:
- Read frame content, component structure, and design metadata
- Write new frames, components, and nodes to Figma
- Inspect token usage and layer properties
- Reference specific frames by node ID instead of scanning the full file

This guide tells you how to use MCP efficiently and avoid common mistakes that waste tokens or produce incorrect output.

---

## Setup

### 1. Install the Figma MCP Server

**For Claude Code:**

Add to your MCP settings (`~/.claude/mcp.json` or project `.claude/mcp.json`):

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "[YOUR_FIGMA_API_KEY]"
      }
    }
  }
}
```

**Get your Figma API key:**
1. Figma → Account Settings → Security → Personal access tokens
2. Create a token with "Read" and "Write" scopes
3. Copy and paste into the config above

**Restart Claude Code** after modifying MCP settings.

---

### 2. Verify Connection

In a Claude Code session:

```
Use the Figma MCP to get the file metadata for file key [YOUR_FILE_KEY].
```

If connected, Claude will return the file name, pages, and last modified date.

If it fails: check that your API key is valid and that the MCP server is listed in `/mcp` output.

---

### 3. Prepare Your Figma File

Before using MCP for design work, your Figma file must:

1. **Follow the frame naming convention** (see below)
2. **Have a dedicated "Flows" page** for all screen designs
3. **Have Components and Tokens on separate pages** (never accessed via MCP)
4. **Use Figma Variables** for color, typography, and spacing tokens

If your file is not set up this way, MCP reads will return noisy, unstructured data.

---

## Frame Naming Convention

**This is required.** LLMs target frames by name. Inconsistent naming breaks targeting.

### Format

```
[FLOW_ID] / [SCREEN_ID] — [Screen Label]
```

### Rules

- Use ` / ` (space-slash-space) between flow ID and screen ID
- Use ` — ` (space-em-dash-space) between screen ID and label
- Flow IDs are uppercase: `AUTH-01`, `CORE-01`
- Screen IDs include the sequence number: `01-splash`, `02-signup`
- Labels are title case: `Splash Screen`, `Sign Up Entry`

### Examples

```
AUTH-01 / 01-splash — Splash Screen
AUTH-01 / 02-signup — Sign Up Entry
AUTH-01 / 03-verify — Email Verification
CORE-01 / 01-home — Task List
CORE-01 / 02-add — Add Task Sheet
CORE-01 / 03-detail — Task Detail
SETTINGS-01 / 01-home — Settings Home
SETTINGS-01 / 05-delete — Delete Account
```

### Why This Matters

When you ask Claude to "update the Task Detail screen," it must find that frame in Figma. If the frame is named `Screen 3` or `Detail v2 FINAL`, the MCP cannot reliably target it. Consistent, semantic naming makes frame targeting deterministic.

---

## Frame Targeting — How to Reference Frames

### Always target by node ID when you have it

The most reliable way to reference a frame is by its Figma node ID.

Node IDs look like: `123:456` or `4567:891`

**Get a node ID:**
1. In Figma, right-click a frame → "Copy link to selection"
2. The URL contains the node ID after `node-id=`
3. Convert `-` to `:` in the node ID (URL encodes `:` as `-`)
4. Add to `figma/figma-map.json`

**In your prompt:**

```
Using the Figma MCP, read the frame with node ID [NODE_ID] in file [FILE_KEY].
Do not scan the full canvas — read only this frame.
```

---

### When node ID is not available, target by frame name

```
Using the Figma MCP, find the frame named exactly:
"CORE-01 / 01-home — Task List"
in the "Flows" page of file [FILE_KEY].
Read only this frame — do not scan other frames.
```

---

### Never ask the LLM to scan the full canvas

**Incorrect (expensive and unreliable):**
```
Read the Figma file and find all screens related to the task flow.
```

**Correct:**
```
Read the following frames from the "Flows" page of file [FILE_KEY]:
- "CORE-01 / 01-home — Task List" (node: [NODE_ID])
- "CORE-01 / 02-add — Add Task Sheet" (node: [NODE_ID])
- "CORE-01 / 03-detail — Task Detail" (node: [NODE_ID])
Do not read any other frames.
```

Full-canvas scans:
- Consume large amounts of token context
- Return noisy data (component library, archived frames, etc.)
- Slow down the session significantly
- Often fail on large files

---

## Token Efficiency Rules

These rules keep MCP sessions fast and within context limits.

### Rule 1: Maximum 3 frames per MCP read call

Each frame read returns significant data. Reading 3–5 frames at once is the practical limit before context quality degrades.

If you need to work on more frames, split into multiple sessions.

---

### Rule 2: Specify the page

Always specify which page to read from. Never let the MCP default to the first page.

```
Read from the "Flows" page only. Do not access "Components", "Tokens", or "Archive".
```

---

### Rule 3: Never access the component library page via MCP

The Components page contains hundreds of components with complex nesting. Reading it costs enormous token usage and rarely provides useful context for screen-level design work.

If you need to know what components are available, refer to `docs/design-system.md` — not the Figma Components page.

---

### Rule 4: Specify depth

By default, MCP reads return deeply nested layer trees. For most design tasks, you only need 2–3 levels of depth.

```
Read frame [FRAME_NAME]. Return layers up to 3 levels deep only.
```

---

### Rule 5: Read before write

Always read a frame before writing to it. Writing to a frame without reading its current state risks overwriting existing content.

```
Step 1: Read frame "CORE-01 / 01-home — Task List" (node [NODE_ID]).
Step 2: Based on the current content, make the following changes: [CHANGES].
Step 3: Write the updated frame back.
```

---

### Rule 6: Update node IDs after creation

When you create a new frame via MCP, get its node ID immediately and update `figma/figma-map.json`.

```
After creating the frame, return its node ID so I can record it in figma-map.json.
```

---

## Write Workflow (Creating New Frames)

When using MCP to write designs to Figma:

### Step 1: Confirm the design spec

Have a complete hi-fi spec (from `prompts/hi-fi.prompt.md`) before writing to Figma. Do not write wireframes or incomplete specs.

### Step 2: Load the Figma context

```
Using the Figma MCP:
File: [FILE_KEY]
Page: Flows

Read the current state of the "Flows" page. List all existing frame names only
(do not read their contents). I want to see what already exists before creating new frames.
```

### Step 3: Create frames one at a time

Do not batch-create all frames in one call. Create one, verify it, then create the next.

```
Create a new frame on the "Flows" page with the following spec:

Frame name: "CORE-01 / 01-home — Task List"
Frame size: 390 × 844px
Background: [TOKEN: color/surface/base]

Contents:
[Paste the hi-fi spec for this frame, layer by layer]

After creation, return the node ID of the new frame.
```

### Step 4: Verify after creation

After each frame is created, ask Claude to read it back:

```
Read the frame you just created (node [NODE_ID]).
Confirm: (1) name matches exactly, (2) dimensions are correct, (3) all layers are present.
```

### Step 5: Record node IDs

Update `figma/figma-map.json` with the node ID immediately after creation.

---

## Common MCP Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Frame not found" | Frame name doesn't match exactly | Check for extra spaces or wrong dash type — use ` — ` not `-` |
| "API rate limit" | Too many MCP calls in sequence | Wait 10 seconds between calls; reduce frames per call |
| "Node not found" | Node ID is stale (frame was deleted/moved) | Re-read the page to get current node IDs |
| "Context too large" | Too many frames read at once | Reduce to 1–2 frames per read; split into sessions |
| Write creates wrong structure | Spec was incomplete | Provide full layer-by-layer spec; don't rely on LLM to infer structure |
| Component appears detached | Component not in library | Verify component exists in Figma library before referencing it |

---

## Session Template (MCP Design Session)

Copy this template to start every MCP-enabled design session:

```
## Figma MCP Design Session

### Context
Product: [PRODUCT_NAME]
File key: [FILE_KEY]
File URL: [FILE_URL]
Working page: Flows

Read the following context files first (attached or pasted):
- docs/product.md
- docs/flows.md
- docs/design-system.md
- docs/constraints.md

### Session Goal
[One sentence: what are we creating or updating today?]

### Frames in Scope
[List exact frame names and node IDs from figma-map.json]

### Rules for This Session
- Do not scan the full canvas
- Do not access pages: Components, Tokens, Archive
- Read before write
- Maximum 3 frames per read call
- Return node IDs after any new frame creation
- All values must use token names, not raw values
- Report any constraint violations before writing to Figma

### Confirm ready.
```
