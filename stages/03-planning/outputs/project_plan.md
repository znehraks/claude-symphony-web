# Project Plan - claude-symphony Landing Page

> Stage: 03-planning | Date: 2026-01-30

---

## 1. Milestones

| # | Milestone | Description | Key Deliverables |
|---|-----------|-------------|------------------|
| M1 | Foundation | Next.js 15 setup, Tailwind v4, colors, data.ts, component primitives | Working dev server, theme, data layer |
| M2 | The Hook | Hero with GSAP SplitText + Particles, Terminal with typing | Above-fold complete and polished |
| M3 | Core Complexity | 10-stage pipeline grid, CSS connectors, detail panels, responsive | Pipeline Visualizer working at all breakpoints |
| M4 | Social Proof & CTA | Magic Cards features, CountUp metrics, Rainbow Button CTA | All sections rendered |
| M5 | Optimization & Polish | Dynamic imports, Lighthouse 95+, a11y, responsive QA | Production-ready |

---

## 2. Sprint Planning (3 Sprints)

### Sprint 1: Setup & High Impact (M1 + M2)

**Goal**: Project foundation + above-fold sections

| Task | Description | Section |
|------|-------------|---------|
| 1.1 | Initialize Next.js 15 App Router project | Foundation |
| 1.2 | Install all npm dependencies | Foundation |
| 1.3 | Configure Tailwind v4 `@theme` with project colors + keyframes in globals.css | Foundation |
| 1.4 | Create `lib/types.ts` (TypeScript interfaces) | Foundation |
| 1.5 | Create `lib/data.ts` (all static content data) | Foundation |
| 1.6 | Create `lib/utils.ts` (`cn()` helper) | Foundation |
| 1.7 | Copy MagicUI component source files to `components/magicui/` | Foundation |
| 1.8 | Copy ReactBits component source files to `components/reactbits/` | Foundation |
| 1.9 | Build Hero section: Particles background + SplitText headline + copy command | Hero |
| 1.10 | Build QuickStart section: Terminal UI + TypingAnimation | Quick Start |

**Completion Criteria**: Dev server runs, hero displays with animation, terminal types commands.

### Sprint 2: Core Sections (M3 + M4)

**Goal**: All 6 sections implemented

| Task | Description | Section |
|------|-------------|---------|
| 2.1 | Build Pipeline data structure (10 stages) in lib/data.ts | Pipeline |
| 2.2 | Build Pipeline responsive grid (mobile/tablet/desktop) | Pipeline |
| 2.3 | Implement CSS connectors between pipeline cards (desktop only) | Pipeline |
| 2.4 | Build Pipeline detail panel with AnimatePresence | Pipeline |
| 2.5 | Build Features section: 6 cards with MagicCard + BorderBeam | Features |
| 2.6 | Build Metrics section: 4 CountUp numbers with scroll trigger | Metrics |
| 2.7 | Build CTA section: RainbowButton + RetroGrid + animated text | CTA |
| 2.8 | Wire up `app/page.tsx` with all sections + data props | Integration |

**Completion Criteria**: All 6 sections render, pipeline cards clickable, metrics count up on scroll.

### Sprint 3: Polish & Optimization (M5)

**Goal**: Production-ready, Lighthouse 95+

| Task | Description | Area |
|------|-------------|------|
| 3.1 | Implement `next/dynamic` lazy loading for below-fold sections | Performance |
| 3.2 | Add skeleton/placeholder components for lazy sections | UX |
| 3.3 | Implement `prefers-reduced-motion` fallbacks for all animations | A11y |
| 3.4 | Responsive QA across 3 breakpoints (mobile/tablet/desktop) | Quality |
| 3.5 | Lighthouse optimization: LCP, CLS, INP, bundle size audit | Performance |
| 3.6 | SEO: metadata, Open Graph tags, semantic HTML audit | SEO |
| 3.7 | Keyboard navigation and ARIA attributes | A11y |
| 3.8 | Cross-browser testing (Chrome, Firefox, Safari) | Quality |

**Completion Criteria**: Lighthouse 95+, <150KB bundle, no CLS, reduced-motion works, all breakpoints clean.

---

## 3. Implementation Order

Based on complexity analysis and dependency chain:

```
Sprint 1 (Foundation + Above-fold)
├── 1. Project Setup (Next.js 15, deps, Tailwind v4)
├── 2. Data Layer (types.ts, data.ts, utils.ts)
├── 3. UI Components (MagicUI + ReactBits source copy)
├── 4. Hero Section (Particles + SplitText)
└── 5. Quick Start Section (Terminal + Typing)

Sprint 2 (Below-fold + Integration)
├── 6. Pipeline Visualizer (most complex)
├── 7. Features Section (Magic Cards)
├── 8. Metrics Section (CountUp)
├── 9. CTA Section (Rainbow Button)
└── 10. Page Assembly (app/page.tsx)

Sprint 3 (Polish)
├── 11. Dynamic Imports + Skeletons
├── 12. Accessibility (reduced-motion, keyboard, ARIA)
├── 13. Responsive QA
├── 14. Performance Optimization
└── 15. SEO + Final Audit
```

---

## 4. Risk-Adjusted Schedule

| Risk | Impact | Sprint Affected | Buffer Strategy |
|------|--------|----------------|-----------------|
| GSAP hydration issues | Hero section delayed | Sprint 1 | Fallback to motion-based word stagger |
| Pipeline responsive breakage | Extra QA cycles | Sprint 2-3 | Build 3 breakpoints from start |
| Bundle size over budget | Optimization needed | Sprint 3 | Pre-built contingency removes (-20KB) |
| MagicUI React 19 issues | Component patching | Sprint 1 | Fork and patch (source-copy design) |

---

## 5. Quality Gates

### Per-Sprint Gates

| Sprint | Gate | Criteria |
|--------|------|----------|
| Sprint 1 | Build passes | `npm run build` succeeds, no TypeScript errors |
| Sprint 2 | Feature complete | All 6 sections render with data, interactive elements work |
| Sprint 3 | Production ready | Lighthouse 95+, <150KB, no CLS, a11y audit clean |

### Continuous Checks

- **After each section**: Verify bundle size with `@next/bundle-analyzer`
- **After Sprint 2**: Full responsive audit at 3 breakpoints
- **Before deployment**: Lighthouse CI check, reduced-motion test, keyboard nav test

---

## 6. Directory Structure

```
website/
├── app/
│   ├── layout.tsx              # Server: fonts, metadata
│   ├── page.tsx                # Server: section assembly
│   ├── globals.css             # Tailwind v4 @theme + keyframes
│   └── fonts/                  # Geist Sans + Mono
├── components/
│   ├── magicui/                # MagicUI source copies (10 files)
│   │   ├── particles.tsx
│   │   ├── magic-card.tsx
│   │   ├── border-beam.tsx
│   │   ├── terminal.tsx
│   │   ├── typing-animation.tsx
│   │   ├── shimmer-button.tsx
│   │   ├── rainbow-button.tsx
│   │   ├── animated-shiny-text.tsx
│   │   ├── retro-grid.tsx
│   │   └── animated-gradient-text.tsx
│   ├── reactbits/              # ReactBits source copies (2 files)
│   │   ├── split-text.tsx
│   │   └── count-up.tsx
│   ├── sections/               # Page sections (6 files)
│   │   ├── hero.tsx
│   │   ├── quick-start.tsx
│   │   ├── pipeline.tsx
│   │   ├── features.tsx
│   │   ├── metrics.tsx
│   │   └── cta.tsx
│   ├── pipeline/               # Pipeline sub-components
│   │   ├── stage-grid.tsx
│   │   ├── stage-card.tsx
│   │   └── detail-panel.tsx
│   └── ui/                     # Shared UI primitives
│       ├── section-skeleton.tsx
│       └── copy-button.tsx
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.ts                 # All static content
│   └── utils.ts                # cn() helper
├── hooks/
│   └── use-in-view.ts          # IntersectionObserver wrapper
├── public/
├── package.json
├── next.config.mjs
└── tsconfig.json
```
