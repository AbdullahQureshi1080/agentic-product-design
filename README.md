# LLM Product Design System

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
git clone https://github.com/[YOUR_USERNAME]/llm-product-design-system
cd llm-product-design-system
claude
```

Claude will read `context.md`, tell you what's missing, and guide you through filling it in before any design work begins.

**First session takes ~15 minutes to set up context. Every session after that starts designing immediately.**

---

## Prerequisites

- Claude Code (CLI)
- Figma account with MCP server configured
- A Figma file (with Variables set up for hi-fi, or Claude will help you build the token structure)

Figma MCP setup: [github.com/GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)
