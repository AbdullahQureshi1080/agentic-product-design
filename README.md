# Agentic Design System

A Claude Code workflow for designing production-grade products in Figma at 10x speed.

Built for designers at AI-native companies who use Claude Code and Figma MCP.

---

## What It Does

You define the product. Claude builds it in Figma.

Claude reads your context, maps your flows, generates wireframes on canvas, applies your design system, audits every frame against 20 constraints, and iterates — all via Figma MCP. You review in Figma in real-time. Devs get token-annotated frames ready for Dev Mode.

---

## What's In The Repo

```
CLAUDE.md          — system brain (never edit this)
context.md         — the only file you fill in
constraints.md     — 20 design rules + UX patterns
prompts.md         — wireframe, hi-fi, refinement, audit prompts
figma-map.json     — auto-managed frame map (never edit this)
```

---

## How To Start

```bash
git clone https://github.com/AbdullahQureshi1080/agentic-product-design
cd agentic-product-design
claude
```

Claude will read `context.md`, tell you what's missing, and guide you through filling it in before any design work begins.

**First session takes ~15 minutes to set up context. Every session after that starts designing immediately.**

---

## Prerequisites

### 1. Claude Code
The CLI that runs this system. Install it and authenticate via Google or your Anthropic account.

```bash
npm install -g @anthropic-ai/claude-code
claude login
```

- Download: [claude.ai/code](https://claude.ai/code)
- Docs: [docs.anthropic.com/en/docs/claude-code/overview](https://docs.anthropic.com/en/docs/claude-code/overview)

### 2. Figma MCP Plugin
The official Figma plugin for Claude. Connects Claude Code to your Figma file — no API key or JSON config required. Authenticates via your Figma account through the CLI.

```bash
claude mcp add figma@claude-plugins-official
```

On first use, Claude will prompt you to authenticate with your Figma account (Google or email). That's it — no manual config files.

- Figma MCP docs: [help.figma.com](https://help.figma.com)

### 3. Figma Account
A Figma file with a dedicated **Flows** page. Variables set up for hi-fi (or Claude will help you build the token structure from your brand colors).

- Sign up: [figma.com](https://figma.com)
- Figma Variables docs: [help.figma.com/hc/en-us/articles/15339657135383](https://help.figma.com/hc/en-us/articles/15339657135383)
