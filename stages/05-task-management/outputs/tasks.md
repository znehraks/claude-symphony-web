# Task List - claude-symphony Landing Page

> Stage: 05-task-management | Date: 2026-01-30
> Source: refined_requirements.md (35 tasks), design_system.md, project_plan.md

---

## Feature 1.1: Project Foundation

### TASK-001: Initialize Next.js 15 App Router project
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: None
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: `npm run dev` serves page at localhost:3000, App Router structure in place

### TASK-002: Install npm dependencies
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 0.5h
- **Dependencies**: TASK-001
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: All imports resolve — `motion`, `gsap`, `@gsap/react`, `clsx`, `tailwind-merge`, `lucide-react`
- **Note**: Use `motion` package (NOT `framer-motion`). If `framer-motion` exists, replace it.

### TASK-003: Configure Tailwind v4 @theme with colors + keyframes
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-001
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: `@theme inline {}` block in globals.css with all design_system.md colors, theme renders in browser
- **Design System Reference**: Section 1 (Color Palette), Section 2 (Typography), Section 6 (Animation keyframes)

### TASK-004: Create lib/types.ts
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-001
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: TypeScript interfaces defined: `Stage`, `Feature`, `Metric`, `QuickStartStep`, `AIModel`; no TS errors

### TASK-005: Create lib/data.ts
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-004
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: 10 stages, 6 features, 4 metrics, quick-start steps all exported with correct types
- **Data Sources**: Pipeline stages from CLAUDE.md, features from brainstorm ideas.md, metrics from design_system.md

### TASK-006: Create lib/utils.ts (cn helper)
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 0.5h
- **Dependencies**: TASK-002
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: `cn()` merges Tailwind classes correctly using `clsx` + `tailwind-merge`

### TASK-007: Copy MagicUI source files (10 components)
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-002
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: 10 components in `components/magicui/`: particles, magic-card, border-beam, terminal, typing-animation, shimmer-button, rainbow-button, animated-shiny-text, retro-grid, animated-gradient-text
- **Source**: MagicUI GitHub (MIT license, source-copy pattern)
- **Note**: Ensure React 19 compatibility, use `motion/react` import path

### TASK-008: Copy ReactBits source files (SplitText, CountUp)
- **Epic**: Landing Page
- **Feature**: F1.1 Project Foundation
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-002
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: `components/reactbits/split-text.tsx` (GSAP-based) and `components/reactbits/count-up.tsx` (motion-based) render in isolation
- **Source**: ReactBits GitHub (MIT license)

---

## Feature 1.2: Hero Section

### TASK-009: Build Particles background component
- **Epic**: Landing Page
- **Feature**: F1.2 Hero Section
- **Priority**: Must (P0)
- **Estimated Time**: 3h
- **Dependencies**: TASK-007
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: Canvas renders 40 particles on desktop (20 on mobile) in 3 AI colors (violet #8b5cf6, emerald #10b981, amber #f59e0b), `aria-hidden="true"`
- **Reduced Motion**: Static dots, no movement

### TASK-010: Implement Hero with SplitText animation
- **Epic**: Landing Page
- **Feature**: F1.2 Hero Section
- **Priority**: Must (P0)
- **Estimated Time**: 3h
- **Dependencies**: TASK-008, TASK-009, TASK-005
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: `<h1>` with gradient text, SplitText character stagger (40ms/char spring), subtitle + badge with AnimatedShinyText, no hydration warnings
- **Typography**: Display (64px desktop / 40px mobile), font-extrabold
- **Reduced Motion**: Instant display, no stagger

### TASK-011: Build CopyCommand component
- **Epic**: Landing Page
- **Feature**: F1.2 Hero Section
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-006
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: Displays `npx claude-symphony my-project`, click copies to clipboard, shows "Copied!" feedback with checkmark, `aria-live="polite"` for announcement
- **Touch Target**: >=44x44px on mobile

### TASK-012: Hero responsive + reduced-motion fallbacks
- **Epic**: Landing Page
- **Feature**: F1.2 Hero Section
- **Priority**: Must (P0)
- **Estimated Time**: 1h
- **Dependencies**: TASK-010, TASK-011
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: 3 breakpoints (mobile/tablet/desktop), h1 text-4xl→text-6xl, instant display with `prefers-reduced-motion`, skip-to-content link as first focusable element

---

## Feature 1.3: Quick Start Section

### TASK-013: Build Terminal UI component
- **Epic**: Landing Page
- **Feature**: F1.3 Quick Start Section
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-007
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: Terminal with dark theme (`bg-terminal` #0d1117), header bar (`bg-terminal-header` #161b22) with 3 traffic light dots, `rounded-xl`, max-width 720px
- **Ambient**: `shadow-[0_0_40px_rgba(139,92,246,0.1)]`

### TASK-014: Implement typing animation with scroll trigger
- **Epic**: Landing Page
- **Feature**: F1.3 Quick Start Section
- **Priority**: Must (P0)
- **Estimated Time**: 1.5h
- **Dependencies**: TASK-013, TASK-005
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: IntersectionObserver at 30% viewport triggers typing (60ms/char), sequential output display after typing, runs once only
- **Reduced Motion**: Full text shown immediately, no typing animation

### TASK-015: Quick Start responsive + reduced-motion
- **Epic**: Landing Page
- **Feature**: F1.3 Quick Start Section
- **Priority**: Must (P0)
- **Estimated Time**: 0.5h
- **Dependencies**: TASK-014
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 1
- **Acceptance Criteria**: Full-width on mobile, max-w-[720px] on desktop, instant text without motion

---

## Feature 1.4: Pipeline Visualizer

### TASK-016: Build StageCard component with MagicCard
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Must (P0)
- **Estimated Time**: 3h
- **Dependencies**: TASK-007, TASK-005
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Card renders stage number, name, AI model badge (color-coded), hover spotlight effect from MagicCard, `ring-1 ring-white/[0.06]` border, `rounded-xl`
- **Badge Colors**: Claude violet, Gemini emerald, Codex amber per design_system.md Section 1 (AI Badge Colors)

### TASK-017: Build responsive pipeline grid (3 breakpoints)
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Must (P0)
- **Estimated Time**: 4h
- **Dependencies**: TASK-016
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Mobile: 1 column, Tablet: 2 columns, Desktop: 5 columns × 2 rows (01-05 top, 06-10 bottom)
- **Section Spacing**: py-16/sm:py-20/lg:py-24, max-w-7xl

### TASK-018: Implement CSS connectors (desktop only)
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Should (P1)
- **Estimated Time**: 2h
- **Dependencies**: TASK-017
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Visual arrows/lines between adjacent cards on desktop (lg: breakpoint), hidden on mobile/tablet, CSS-only (no JS)

### TASK-019: Build detail panel with AnimatePresence
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Must (P0)
- **Estimated Time**: 3h
- **Dependencies**: TASK-016
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Click card → inline panel slides in (200ms ease-out), shows description + AI model + execution mode + inputs/outputs, click again → closes, Escape key closes, `aria-expanded` + `aria-controls`
- **Reduced Motion**: Instant toggle, no slide animation

### TASK-020: Add staggered entrance animation
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Should (P1)
- **Estimated Time**: 2h
- **Dependencies**: TASK-017
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: IntersectionObserver at 20% triggers stagger (100ms between cards, 500ms entrance each), fade+translateY, triggerOnce
- **Reduced Motion**: Instant display

### TASK-021: Pipeline responsive QA + reduced-motion
- **Epic**: Landing Page
- **Feature**: F1.4 Pipeline Visualizer
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-017, TASK-019, TASK-020
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: All 3 breakpoints clean, detail panel works on touch devices, all motion respects reduced-motion, keyboard navigable (Tab through cards, Enter/Space to toggle, Escape to close)

---

## Feature 1.5: Features Section

### TASK-022: Build Feature card with MagicCard + BorderBeam
- **Epic**: Landing Page
- **Feature**: F1.5 Features Section
- **Priority**: Should (P1)
- **Estimated Time**: 3h
- **Dependencies**: TASK-007, TASK-005
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Card with spotlight hover (MagicCard), border beam animation (CSS keyframes), icon from Lucide, title + description text
- **Reduced Motion**: Static border, opacity-only hover

### TASK-023: Build Features responsive grid (3 breakpoints)
- **Epic**: Landing Page
- **Feature**: F1.5 Features Section
- **Priority**: Should (P1)
- **Estimated Time**: 2h
- **Dependencies**: TASK-022
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns, gap-4 mobile / gap-6 desktop

### TASK-024: Features stagger animation + reduced-motion
- **Epic**: Landing Page
- **Feature**: F1.5 Features Section
- **Priority**: Should (P1)
- **Estimated Time**: 1h
- **Dependencies**: TASK-023
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Stagger entrance (100ms, IntersectionObserver 0.2), instant without motion

---

## Feature 1.6: Metrics Section

### TASK-025: Build CountUp component with ReactBits
- **Epic**: Landing Page
- **Feature**: F1.6 Metrics Section
- **Priority**: Should (P1)
- **Estimated Time**: 2h
- **Dependencies**: TASK-008
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Numbers animate from 0 to target (2000ms ease-out), supports prefix/suffix (e.g., "<", "+", "%"), `font-mono` for metric numbers
- **Reduced Motion**: Final value immediately

### TASK-026: Build Metrics grid with scroll trigger
- **Epic**: Landing Page
- **Feature**: F1.6 Metrics Section
- **Priority**: Should (P1)
- **Estimated Time**: 1.5h
- **Dependencies**: TASK-025, TASK-005
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: 2×2 mobile, 4-col desktop, IntersectionObserver at 50% triggers CountUp, triggerOnce
- **Metrics**: 10 Pipeline Stages | 109+ Automated Tests | <5ms Infrastructure Speed | 0% Context Usage

### TASK-027: Metrics reduced-motion fallback
- **Epic**: Landing Page
- **Feature**: F1.6 Metrics Section
- **Priority**: Should (P1)
- **Estimated Time**: 0.5h
- **Dependencies**: TASK-026
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Shows final numbers immediately without animation

---

## Feature 1.7: CTA Section

### TASK-028: Build CTA with AnimatedGradientText + RetroGrid
- **Epic**: Landing Page
- **Feature**: F1.7 CTA Section
- **Priority**: Should (P1)
- **Estimated Time**: 2h
- **Dependencies**: TASK-007
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Headline with animated gradient (violet→emerald→amber), RetroGrid background, max-w-[640px] centered
- **Reduced Motion**: Static gradient, static grid

### TASK-029: Integrate RainbowButton + copy command
- **Epic**: Landing Page
- **Feature**: F1.7 CTA Section
- **Priority**: Should (P1)
- **Estimated Time**: 1h
- **Dependencies**: TASK-028, TASK-011
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: RainbowButton as primary CTA, secondary GitHub link, install command repeated with copy button
- **Touch Target**: All links ≥44x44px on mobile (apply `py-3` per D-U2)

### TASK-030: CTA responsive + reduced-motion
- **Epic**: Landing Page
- **Feature**: F1.7 CTA Section
- **Priority**: Should (P1)
- **Estimated Time**: 1h
- **Dependencies**: TASK-029
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 2
- **Acceptance Criteria**: Full-width stacked CTAs on mobile, centered on desktop, instant display without motion

---

## Feature 1.8: Optimization & Polish

### TASK-031: Implement next/dynamic lazy loading
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-016 through TASK-030 (all sections)
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: Hero + QuickStart eagerly loaded (~79KB), Pipeline + Features + Metrics + CTA lazy-loaded via `next/dynamic`, below-fold sections load on scroll
- **Reference**: Decision D-U5 from HANDOFF 04

### TASK-032: Build skeleton components
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 1.5h
- **Dependencies**: TASK-031
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: Each lazy section has a matching skeleton with shimmer animation, fixed heights prevent CLS, `aria-hidden="true"`

### TASK-033: Bundle size audit + optimization
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-031
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: Total JS <150KB gzip verified with `@next/bundle-analyzer`, initial load <80KB, lazy chunks <50KB total

### TASK-034: Lighthouse optimization (LCP, CLS, INP)
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: TASK-033
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: Lighthouse Performance 95+, LCP <2.5s (SSR h1), CLS <0.1 (skeleton heights), INP <200ms

### TASK-035: SEO: metadata, Open Graph, semantic HTML
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 1.5h
- **Dependencies**: TASK-001
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: `<title>`, `<meta description>`, Open Graph tags (og:title, og:description, og:image), Twitter Card, semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`), heading hierarchy h1>h2>h3

### TASK-036: Accessibility: keyboard nav, ARIA, contrast
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Must (P0)
- **Estimated Time**: 2h
- **Dependencies**: All section tasks
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: Skip-to-content link, visible focus indicators (2px violet ring), all decorative elements `aria-hidden`, `aria-expanded`/`aria-controls` for pipeline, `aria-live="polite"` for copy feedback, all text meets WCAG AA contrast (use #708599 for muted on cards per D-U1), 16 keyboard tab stops
- **Reference**: design_system.md Section 9

### TASK-037: Cross-browser testing
- **Epic**: Landing Page
- **Feature**: F1.8 Optimization
- **Priority**: Should (P1)
- **Estimated Time**: 1h
- **Dependencies**: TASK-034, TASK-036
- **Assigned Stage**: 06-implementation
- **AI Model**: ClaudeCode
- **Sprint**: 3
- **Acceptance Criteria**: No visual breakage in Chrome, Firefox, Safari; Canvas Particles renders in all browsers; CSS keyframe animations work

---

## Dependency Graph

```
TASK-001 (Next.js init)
├── TASK-002 (deps) ──── TASK-006 (utils.ts)
│                   ├── TASK-007 (MagicUI) ─── TASK-009 (Particles)
│                   │                      ├── TASK-013 (Terminal)
│                   │                      ├── TASK-016 (StageCard)
│                   │                      ├── TASK-022 (FeatureCard)
│                   │                      └── TASK-028 (CTA)
│                   └── TASK-008 (ReactBits) ── TASK-010 (Hero SplitText)
│                                           └── TASK-025 (CountUp)
├── TASK-003 (Tailwind)
└── TASK-004 (types.ts) ── TASK-005 (data.ts) ── TASK-010, TASK-014, TASK-016, TASK-026

TASK-009 + TASK-010 + TASK-011 + TASK-012 = Hero Section Complete
TASK-013 + TASK-014 + TASK-015 = Quick Start Complete
TASK-016..021 = Pipeline Complete
TASK-022..024 = Features Complete
TASK-025..027 = Metrics Complete
TASK-028..030 = CTA Complete

All sections → TASK-031..037 (Optimization & Polish)
```

---

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 37 |
| P0 (Must) | 25 |
| P1 (Should) | 12 |
| Total Estimate | 66h |
| Sprint 1 Tasks | 15 (26h) |
| Sprint 2 Tasks | 14 (27.5h) |
| Sprint 3 Tasks | 8 (12.5h) |
| AI Model | ClaudeCode (all tasks) |
| Target Stage | 06-implementation |
