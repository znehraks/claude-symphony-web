# Key Decisions - Stage 01: Brainstorm

> Date: 2026-01-30
> Stage: 01-brainstorm

---

## D1: Scope — 6 Sections for Launch
- **Decision**: Hero → Quick Start → Pipeline → Features → Metrics → CTA
- **Deferred**: Sub-Agent Bento Grid, Fork Toggle, Symphony Stream, Narrative Scroll
- **Rationale**: Core value proposition delivered in 6 sections. Additional sections add complexity without proportional conversion value.

## D2: Pipeline Connectors — CSS Only
- **Decision**: CSS pseudo-element connectors (dashed lines) between pipeline cards
- **Alternative Rejected**: SVG Animated Beams (highest complexity-to-impact ratio)
- **Upgrade Path**: Can add SVG beams post-launch without architecture changes

## D3: Background Effects — CSS Gradients
- **Decision**: CSS gradient backgrounds for Metrics section
- **Alternative Rejected**: Canvas-based Flickering Grid
- **Rationale**: Full Canvas for background is disproportionate. CSS achieves 80% visual impact at 10% effort.

## D4: Text Animations — Max 2 Types
- **Decision**: SplitText (hero headline only) + CSS gradient text (section titles)
- **Alternative Rejected**: 5+ different text effects (Aurora, Blur, Shiny, Gradient, etc.)
- **Rationale**: Consistency > variety. Multiple effects feel scattered.

## D5: Mobile Strategy — Simplified
- **Decision**: Single column pipeline, no connectors, static gradients (no mouse tracking)
- **Particles**: Reduced from 40 → 20 on mobile
- **Magic Card**: Static gradient on touch devices

## D6: Headline Copy
- **Primary**: "Orchestrate Claude, Gemini, and Codex" (clear, names all 3 providers)
- **Sub-headline**: "10-Stage Pipeline from Brainstorming to Deployment"
- **A/B Alternative**: "Stop Chatting. Start Conducting." (Gemini creative suggestion)

## D7: Source-Copy Scope (Animation Components)
- **Include**: particles, magic-card, border-beam, terminal, shimmer-button, rainbow-button, animated-shiny-text, retro-grid, typing-animation, animated-gradient-text
- **Include (ReactBits)**: split-text, count-up
- **Exclude**: orbiting-circles, neon-gradient-card, animated-grid-pattern, flickering-grid, blur-text, aurora-text, number-ticker, scroll-velocity
- **Rationale**: Exclude unused/over-scoped components to minimize maintenance burden

## D8: Performance Budget
- **Bundle Target**: <150KB gzip total
- **Strategy**: `next/dynamic` with `ssr: false` for below-fold sections
- **Initial Load**: Hero + QuickStart (~60-70KB)
- **Lazy**: Pipeline, Features, Metrics, CTA (loaded on scroll)
