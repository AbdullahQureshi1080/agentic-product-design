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

**First session takes ~10–15 minutes to set up context. Every session after that starts designing immediately.**

---

## Before Your First Session

The more precise you are upfront, the faster Claude works and the fewer tokens you burn.

### New project — have these ready

- Product name and one sentence on what it does
- Who the primary user is and what device they use
- The main thing your user does in the product (Claude maps the screens from this)
- Your brand primary color (Claude generates the full token system from this)
- Your Figma file key if you have one (Claude extracts Variables automatically)

### Existing project — have these ready

- Your Figma file URL (Claude parses the file key)
- Which Figma page has your main screens (any name — not required to be "Flows")
- A rough sense of what's done vs. in progress (you don't need to be exact)

Claude will then read your page list, inventory your frames, extract your Variables and text styles, check your component library, and ask you 4 short product questions. **You do not fill in `context.md` manually for existing projects — Claude populates it from your Figma file.**

### How to describe existing work precisely

Precision saves tokens and avoids back-and-forth. Use this pattern:

| Instead of | Say |
|------------|-----|
| "I have some screens done" | "Frames 1–8 on the Screens page are approved. Frame 9 is in progress. Everything after that is not started." |
| "The design system is set up" | "I have Figma Variables for colors and typography. No spacing tokens. Buttons and inputs are in the component library but navigation components are missing." |
| "Continue from where we left off" | "We finished CORE-01 wireframes. They're approved. Start CORE-02 wireframes next." |

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
