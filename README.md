# LLM Product Design System

A structured, reusable workflow for designing products with LLM assistance — from product definition through production-ready UI.

---

## What This Is

A local repository that acts as the **single source of truth** for LLM-assisted product design. It gives every AI session the context it needs to produce consistent, constraint-compliant, production-quality designs — across any product, any flow, any fidelity level.

This system is not a UI kit. It is a **workflow operating system**: structured documents, scoped prompts, and explicit conventions that make LLM output reliable and repeatable.

---

## Who It Is For

- Product designers using Claude, GPT, or any LLM to accelerate UI work
- Design engineers who generate or review Figma output programmatically
- Teams that want consistent AI-assisted design without re-explaining context every session

---

## Repository Structure

```
llm-product-design-system/
├── docs/
│   ├── product.md          # Product overview, personas, features
│   ├── flows.md            # User flow map and naming conventions
│   ├── design-system.md    # Tokens, typography, spacing, components
│   ├── patterns.md         # UX patterns and when to use them
│   ├── constraints.md      # Non-negotiable design rules
│   └── decisions.md        # Decision log
├── prompts/
│   ├── wireframe.prompt.md     # Wireframe generation prompt
│   ├── hi-fi.prompt.md         # Hi-fi translation prompt
│   ├── refinement.prompt.md    # Iterative refinement prompt
│   └── audit.prompt.md         # Design audit prompt
├── figma/
│   └── figma-map.example.json  # Frame mapping for Figma MCP
├── guides/
│   ├── setup.md            # How to set up and connect this repo
│   ├── workflow.md         # Step-by-step design workflow
│   └── figma-mcp.md        # Figma + MCP connection guide
└── README.md
```

---

## Quick Start

**1. Clone or copy this repo locally.**

```bash
git clone https://github.com/[YOUR_USERNAME]/llm-product-design-system
cd llm-product-design-system
```

**2. Fill in your product context.**

Edit these files first — they are the foundation for every prompt session:

- `docs/product.md` — your product, personas, features
- `docs/flows.md` — your user flows
- `docs/design-system.md` — your token system and component rules

**3. Load context into your LLM session.**

At the start of every design session, paste this into the chat:

```
Read the following files and hold them as context for this session:
- docs/product.md
- docs/flows.md
- docs/design-system.md
- docs/patterns.md
- docs/constraints.md
```

**4. Run a prompt.**

Copy a prompt from `/prompts`, fill in the bracketed placeholders, and send it.

---

## Example Workflow

```
Define product (product.md)
  → Map flows (flows.md)
    → Generate wireframes (wireframe.prompt.md)
      → Review against constraints (constraints.md)
        → Convert to hi-fi (hi-fi.prompt.md)
          → Refine (refinement.prompt.md)
            → Audit (audit.prompt.md)
```

Full detail in `guides/workflow.md`.

---

## Figma Integration

If you use Figma via MCP, read `guides/figma-mcp.md` before your first session. It explains how to reference frames instead of scanning the full canvas, how to name frames for LLM targeting, and how to avoid token overuse.

---

## Customization

Every file in `/docs` is a template. Replace all `[PLACEHOLDER]` values with your product's real content. The more complete your `docs/` folder, the less you need to explain in each prompt session.

---

## Contributing

This is a living system. When you make a significant design decision, log it in `docs/decisions.md`. When you establish a new pattern, add it to `docs/patterns.md`. The repo grows with the product.
