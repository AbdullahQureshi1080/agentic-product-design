# Setup Guide

> How to set up this repository locally and connect it to your LLM of choice.

---

## Step 1: Clone or Copy the Repository

**Option A: Clone from GitHub**
```bash
git clone https://github.com/[YOUR_USERNAME]/llm-product-design-system
cd llm-product-design-system
```

**Option B: Download and initialize locally**
```bash
cd ~/Projects
cp -r /path/to/llm-product-design-system .
cd llm-product-design-system
git init
git add .
git commit -m "Initial setup"
```

---

## Step 2: Fill In Your Product Context

These files are the foundation. Fill them in before running any prompts.

### Priority order:

**1. `docs/product.md`** — Do this first.
- Product name, description, type, stage
- User personas (1–3)
- Feature breakdown with statuses

**2. `docs/flows.md`** — Do this second.
- List every user flow
- Add every screen with a screen ID
- Set up the navigation tree

**3. `docs/design-system.md`** — Do this third.
- Fill in your token names and values
- Match them exactly to your Figma Variables or token system
- Confirm typography scale, spacing system, and component rules

**4. `docs/patterns.md`** — Review and adjust.
- Remove patterns your product doesn't use
- Add any product-specific patterns with the same format

**5. `docs/constraints.md`** — Review and adjust.
- All constraints apply by default
- Add product-specific constraints at the bottom if needed
- Do not remove critical constraints

**6. `docs/decisions.md`** — Start empty, update as you go.

---

## Step 3: Set Up the Figma Frame Map

1. Copy `figma/figma-map.example.json` to `figma/figma-map.json`
2. Add your Figma file key (from the URL: `figma.com/design/[FILE_KEY]/...`)
3. Add your Figma page names
4. For each flow, add the frame names exactly as they appear (or will appear) in Figma
5. Node IDs can be left blank until frames are created; fill them in after creation

---

## Step 4: Connect to Your LLM

### Claude (claude.ai or Claude Code)

**Method A: Paste context manually**

At the start of each session, paste the contents of relevant docs into the chat. Use this opening:

```
I am working on a product design session. Please read the following context files
and hold them as your working knowledge for this session.

Do not proceed until you confirm you have read all files.

[PASTE CONTENTS OF docs/product.md]
[PASTE CONTENTS OF docs/flows.md]
[PASTE CONTENTS OF docs/design-system.md]
[PASTE CONTENTS OF docs/patterns.md]
[PASTE CONTENTS OF docs/constraints.md]
```

**Method B: Use Claude Code (CLI)**

If you use Claude Code (the CLI tool):

```bash
cd llm-product-design-system
claude
```

Then in the Claude Code session:
```
/read docs/product.md
/read docs/flows.md
/read docs/design-system.md
/read docs/patterns.md
/read docs/constraints.md
```

Or reference files directly in your prompt:
```
Read docs/product.md, docs/flows.md, docs/design-system.md, docs/patterns.md,
and docs/constraints.md, then generate a wireframe for [FLOW_ID].
```

**Method C: CLAUDE.md project context**

Create a `CLAUDE.md` file at the repo root:

```markdown
# Project Context for Claude Code

At the start of every session, read:
- docs/product.md
- docs/flows.md
- docs/design-system.md
- docs/patterns.md
- docs/constraints.md

These files define the product, flows, design system, patterns, and constraints.
All design output must comply with docs/constraints.md.
```

Claude Code will automatically read this file when you open a session in this directory.

---

### GPT (ChatGPT or API)

**Method A: System prompt**

Set a system prompt (via Custom Instructions or API `system` field):

```
You are a senior product designer. When I give you design tasks, you operate
within the context of my product design system. I will provide context files
at the start of each conversation. Read all files before responding.
Comply with all constraints defined in docs/constraints.md.
```

**Method B: File upload (GPT-4 with file reading)**

Upload the following files at the start of each session:
- `docs/product.md`
- `docs/flows.md`
- `docs/design-system.md`
- `docs/patterns.md`
- `docs/constraints.md`

Then prompt: "Read all attached files before we begin. Confirm when done."

---

## Step 5: Run Your First Prompt

Open `prompts/wireframe.prompt.md`.

1. Fill in the bracketed values for your flow
2. Send the context block first (paste and confirm)
3. Send the wireframe prompt
4. Review output against the post-generation checklist in the prompt file

---

## Directory Reference

```
llm-product-design-system/
│
├── docs/                    ← Fill these in for your product
│   ├── product.md           ← START HERE
│   ├── flows.md             ← Fill second
│   ├── design-system.md     ← Fill third
│   ├── patterns.md          ← Review and adjust
│   ├── constraints.md       ← Review and adjust
│   └── decisions.md         ← Update as decisions are made
│
├── prompts/                 ← Use these for design sessions
│   ├── wireframe.prompt.md  ← For new flows
│   ├── hi-fi.prompt.md      ← After wireframes are approved
│   ├── refinement.prompt.md ← For targeted iteration
│   └── audit.prompt.md      ← Before any design is approved
│
├── figma/
│   └── figma-map.example.json ← Copy to figma-map.json, fill in
│
├── guides/
│   ├── setup.md             ← This file
│   ├── workflow.md          ← Step-by-step design workflow
│   └── figma-mcp.md         ← Figma + MCP connection guide
│
└── README.md
```

---

## Common Setup Issues

**Issue:** LLM keeps ignoring constraints.
**Fix:** Paste `docs/constraints.md` in full at the top of the session. Add a line: "You must flag any constraint violation before delivering output."

**Issue:** LLM generates screens not in my flow map.
**Fix:** Be explicit in the prompt: "Only generate screens listed in this prompt. Do not add screens not listed here."

**Issue:** LLM uses wrong component names or token names.
**Fix:** Make sure your `docs/design-system.md` is fully filled in with your exact token and component names. Vague or empty token sections lead to invented names.

**Issue:** Context is too long for the LLM's context window.
**Fix:** For each session, only load the files relevant to that session's scope. For wireframing: `product.md` + `flows.md` + `constraints.md`. For hi-fi: all five files.
