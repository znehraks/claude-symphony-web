# Project Brief

## Project Name
claude-symphony-web

## One-line Description
Dark-themed landing page showcasing claude-symphony, a Multi-AI Orchestration Framework with a 10-stage pipeline from brainstorming to deployment.

## Problem Definition
Developers building complex software projects need a way to orchestrate multiple AI models (Claude, Gemini, Codex) across different stages of development. claude-symphony solves this, but needs a compelling landing page that communicates:
- What it does (10-stage pipeline orchestration)
- Why it matters (multi-AI collaboration, context management, sub-agents)
- How to get started (simple npx command)

## Target Users
1. **AI-Forward Developers** - Engineers who already use AI coding assistants and want structured orchestration
2. **Tech Leads / Architects** - Decision makers evaluating AI development frameworks
3. **Open Source Contributors** - Developers looking for interesting projects to contribute to

## Core Features (Draft)
1. Hero section with particle animation background showing AI orchestration
2. Interactive 10-stage pipeline visualizer with animated connections
3. Quick Start terminal with typing animation
4. Feature cards highlighting key capabilities
5. Metrics dashboard with animated counters
6. CTA section for GitHub and getting started

## Success Criteria
- Lighthouse Performance 95+
- LCP < 2.5s, CLS < 0.1
- JS Bundle < 150KB gzipped
- Clear communication of value proposition in first viewport
- Responsive across mobile/tablet/desktop

## Constraints
- Technology: Next.js 15 (App Router), Tailwind CSS, Framer Motion
- Animation libraries: MagicUI + ReactBits (source copy, not npm)
- Theme: Dark orchestration ("Dark Orchestration" theme)
- Color palette: Violet (#8b5cf6) for Claude, Emerald (#10b981) for Gemini, Amber (#f59e0b) for Codex
- Must respect prefers-reduced-motion

## Key Technical Facts
- **AI Models**: 4 roles (claudecode, claude, gemini, codex), 3 providers (Anthropic, Google, OpenAI)
- **Sub-Agents**: 5 Tier 1 agents (validation ~15s, handoff-generator ~30s, output-synthesis ~35s, architecture-review ~40s, research-analysis ~45s)
- **Install command**: `npx claude-symphony my-project` (no init needed)
- **Key features**: Sprint Mode (3 sprints default), Epic Cycles, Test-First Flow, Loop-back, Dynamic Model Selection, Pipeline Forking
- **Metrics**: 10 pipeline stages, 109+ automated tests, <5ms infrastructure speed, 0% context usage for sub-agents

## References
- GitHub repository: claude-symphony
- MagicUI: magicui.design
- ReactBits: reactbits.dev
