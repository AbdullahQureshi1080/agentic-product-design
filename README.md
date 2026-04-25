# Agentic Design System

An agentic workflow for designing production-grade products in Figma at 10x speed.

Built for designers at AI-native companies who use an AI coding agent and Figma MCP.

---

## What It Does

You define the product. Your agent builds it in Figma.

The agent reads your context, maps your flows, generates wireframes on canvas, applies your design system, audits every frame against 20 constraints, and iterates — all via Figma MCP. You review in Figma in real-time. Devs get token-annotated frames ready for Dev Mode.

Works with **Claude Code**, **Codex CLI**, and any agent that supports MCP servers and reads a project-root instruction file.

---

## What's In The Repo

```
CLAUDE.md              — router for Claude Code (auto-loaded, never edit)
AGENTS.md              — router for Codex CLI (auto-loaded, never edit)
context.md             — the only file you fill in
constraints.md         — 20 design rules + UX patterns (works standalone too)
prompts.md             — wireframe, hi-fi, refinement, audit prompts
figma-map.json         — auto-managed frame map (never edit)

workflows/
  new-project-setup.md       — guided context fill-in for new projects
  existing-project-import.md — 7-step import from an existing Figma file
  wireframe.md               — wireframe build + dependency model
  hifi.md                    — hi-fi apply + mandatory wireframe snapshot
  component-extraction.md    — measure → build → validate component workflow
  conventions.md             — naming conventions + speed principles
```

---

## How To Start

Pick your agent and run it from the repo root:

**Claude Code**
```bash
git clone https://github.com/AbdullahQureshi1080/agentic-product-design
cd agentic-product-design
claude
```

**Codex CLI**
```bash
git clone https://github.com/AbdullahQureshi1080/agentic-product-design
cd agentic-product-design
codex
```

The agent reads `context.md`, tells you what's missing, and guides you through filling it in before any design work begins.

**First session takes ~10–15 minutes to set up context. Every session after that starts designing immediately.**

---

## Before Your First Session

The more precise you are upfront, the faster the agent works and the fewer tokens you burn.

### New project — have these ready

- Product name and one sentence on what it does
- Who the primary user is and what device they use
- The main thing your user does in the product (the agent maps the screens from this)
- Your brand primary color (the agent generates the full token system from this)
- Your Figma file key if you have one (Variables are extracted automatically)

### Existing project — have these ready

- Your Figma file URL (the agent parses the file key)
- Which Figma page has your main screens (any name — not required to be "Flows")
- A rough sense of what's done vs. in progress (you don't need to be exact)

The agent will read your page list, inventory your frames, extract your Variables and text styles, check your component library, and ask you 4 short product questions. **You do not fill in `context.md` manually for existing projects — it is populated from your Figma file.**

### How to describe existing work precisely

Precision saves tokens and avoids back-and-forth. Use this pattern:

| Instead of | Say |
|------------|-----|
| "I have some screens done" | "Frames 1–8 on the Screens page are approved. Frame 9 is in progress. Everything after that is not started." |
| "The design system is set up" | "I have Figma Variables for colors and typography. No spacing tokens. Buttons and inputs are in the component library but navigation components are missing." |
| "Continue from where we left off" | "We finished CORE-01 wireframes. They're approved. Start CORE-02 wireframes next." |

---

## Prerequisites

### 1. An AI coding agent with MCP support

**Claude Code** (Anthropic)
```bash
npm install -g @anthropic-ai/claude-code
claude login
```
- Download: [claude.ai/code](https://claude.ai/code)
- Docs: [docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview)
- Instruction file: auto-loads `CLAUDE.md` from project root

**Codex CLI** (OpenAI)
```bash
npm install -g @openai/codex
codex login
```
- Docs: [developers.openai.com/codex/cli](https://developers.openai.com/codex/cli)
- Instruction file: auto-loads `AGENTS.md` from project root

Other agents (Cursor, Windsurf, etc.) that support MCP servers and a project-level instruction file will also work — point them at the relevant instruction file and the Figma remote MCP server.

---

### 2. Figma MCP

**Claude Code** — uses the official Figma desktop plugin. No JSON config required.
```bash
claude mcp add figma@claude-plugins-official
```
Authenticate with your Figma account on first use.
- Docs: [help.figma.com](https://help.figma.com)

**Codex CLI and all other agents** — uses the Figma remote MCP server. No desktop app required.
```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```
Authenticate via Figma OAuth on first use.
- Docs: [developers.figma.com/docs/figma-mcp-server/remote-server-installation](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation)

---

### 3. Figma Account

A Figma file with Variables set up for hi-fi (or the agent will help you build the token structure from your brand colors).

- Sign up: [figma.com](https://figma.com)
- Figma Variables docs: [help.figma.com/hc/en-us/articles/15339657135383](https://help.figma.com/hc/en-us/articles/15339657135383)
