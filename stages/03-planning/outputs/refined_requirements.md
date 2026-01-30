# Refined Requirements - claude-symphony Landing Page

> Stage: 03-planning | Date: 2026-01-30
> Refinement Level: Epic -> Feature -> Task

---

## Epic 1: claude-symphony Landing Page

**Description**: Build a high-performance, animated landing page for the claude-symphony Multi-AI Orchestration Framework.

**Acceptance Criteria**:
- 6 sections rendering correctly at all breakpoints
- Lighthouse score 95+
- Bundle size <150KB gzip
- All animations respect prefers-reduced-motion
- SEO metadata complete

---

### Feature 1.1: Project Foundation

**Estimate**: 8h | **Priority**: P0 | **Dependencies**: None

**Acceptance Criteria**:
- Next.js 15 project builds and runs
- Tailwind v4 theme configured with project colors
- All npm dependencies installed
- TypeScript interfaces defined
- Static data file complete

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.1.1 | Initialize Next.js 15 App Router project | 1h | `npm run dev` serves page | I,V,E,S,T |
| T1.1.2 | Install npm dependencies (motion, gsap, clsx, etc.) | 0.5h | All imports resolve | I,V,E,S,T |
| T1.1.3 | Configure Tailwind v4 @theme with colors + keyframes | 1h | Theme colors render in browser | I,V,E,S,T |
| T1.1.4 | Create lib/types.ts (Stage, Feature, Metric, QuickStartStep) | 1h | No TypeScript errors | I,V,E,S,T |
| T1.1.5 | Create lib/data.ts (10 stages, 6 features, 4 metrics) | 2h | Data exports with correct types | I,V,E,S,T |
| T1.1.6 | Create lib/utils.ts (cn helper) | 0.5h | cn() merges classes correctly | I,V,E,S,T |
| T1.1.7 | Copy MagicUI source files (10 components) | 1h | All components import without error | I,V,E,S,T |
| T1.1.8 | Copy ReactBits source files (SplitText, CountUp) | 1h | Components render in isolation | I,V,E,S,T |

---

### Feature 1.2: Hero Section

**Estimate**: 8h | **Priority**: P0 | **Dependencies**: F1.1

**Acceptance Criteria**:
- Full viewport height with dark background
- Animated particles (3 colors) behind text
- GSAP SplitText character animation on headline
- Install command with copy button
- No hydration warnings
- LCP element is the `<h1>`

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.2.1 | Build Particles background component | 3h | Canvas renders 40 particles (20 on mobile) | I,V,E,S,T |
| T1.2.2 | Implement Hero with SplitText animation | 3h | Characters animate sequentially, no hydration error | I,V,E,S,T |
| T1.2.3 | Build copy-command component | 1h | Click copies to clipboard, shows feedback | I,V,E,S,T |
| T1.2.4 | Responsive + reduced-motion fallbacks | 1h | Works at 3 breakpoints, instant display without motion | I,V,E,S,T |

---

### Feature 1.3: Quick Start Section

**Estimate**: 4h | **Priority**: P0 | **Dependencies**: F1.1

**Acceptance Criteria**:
- Terminal UI with traffic lights
- Typing animation for install commands
- Sequential output display after typing completes

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.3.1 | Build Terminal UI with MagicUI component | 2h | Terminal renders with dark theme, traffic lights | I,V,E,S,T |
| T1.3.2 | Implement typing animation with scroll trigger | 1.5h | Typing starts on viewport entry, runs once | I,V,E,S,T |
| T1.3.3 | Add responsive + reduced-motion | 0.5h | Full-width on mobile, instant text without motion | I,V,E,S,T |

---

### Feature 1.4: Pipeline Visualizer

**Estimate**: 16h | **Priority**: P0 | **Dependencies**: F1.1

**Acceptance Criteria**:
- 10 stage cards displayed in responsive grid
- Desktop: 2 rows x 5 columns with CSS connectors
- Tablet: 2 columns
- Mobile: single column
- Click card to open detail panel (AnimatePresence)
- Detail shows: description, AI model, execution mode
- Staggered entrance animation on scroll

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.4.1 | Build StageCard component with MagicCard | 3h | Card renders with stage data, hover spotlight effect | I,V,E,S,T |
| T1.4.2 | Build responsive grid (3 breakpoints) | 4h | 1-col/2-col/5-col layouts verified | I,V,E,S,T |
| T1.4.3 | Implement CSS connectors (desktop only) | 2h | Arrows between cards, hidden on mobile/tablet | I,V,E,S,T |
| T1.4.4 | Build detail panel with AnimatePresence | 3h | Click card -> panel slides in, click again -> closes | I,V,E,S,T |
| T1.4.5 | Add staggered entrance animation | 2h | Cards appear sequentially on scroll, triggerOnce | I,V,E,S,T |
| T1.4.6 | Responsive QA + reduced-motion | 2h | All breakpoints clean, instant display without motion | I,V,E,S,T |

---

### Feature 1.5: Features Section

**Estimate**: 6h | **Priority**: P1 | **Dependencies**: F1.1

**Acceptance Criteria**:
- 6 feature cards in responsive grid (1/2/3 columns)
- MagicCard hover effect with spotlight
- BorderBeam on cards
- Staggered entrance on scroll

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.5.1 | Build Feature card with MagicCard + BorderBeam | 3h | Card renders with hover effect, beam animation | I,V,E,S,T |
| T1.5.2 | Build responsive grid (3 breakpoints) | 2h | 1/2/3 column layouts verified | I,V,E,S,T |
| T1.5.3 | Add stagger animation + reduced-motion | 1h | Cards stagger on scroll, instant without motion | I,V,E,S,T |

---

### Feature 1.6: Metrics Section

**Estimate**: 4h | **Priority**: P1 | **Dependencies**: F1.1

**Acceptance Criteria**:
- 4 metric numbers with CountUp animation
- CountUp triggers when 50% visible
- Responsive: 2x2 on mobile, 4-col on desktop

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.6.1 | Build CountUp component with ReactBits | 2h | Numbers animate from 0 to target | I,V,E,S,T |
| T1.6.2 | Build Metrics grid with scroll trigger | 1.5h | 2x2 mobile, 4-col desktop, triggers at 50% | I,V,E,S,T |
| T1.6.3 | Add reduced-motion fallback | 0.5h | Shows final numbers immediately | I,V,E,S,T |

---

### Feature 1.7: CTA Section

**Estimate**: 4h | **Priority**: P1 | **Dependencies**: F1.1

**Acceptance Criteria**:
- Animated gradient headline text
- RetroGrid background
- RainbowButton CTA
- Install command repeated

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.7.1 | Build CTA with AnimatedGradientText + RetroGrid | 2h | Gradient text animates, grid renders | I,V,E,S,T |
| T1.7.2 | Integrate RainbowButton + copy command | 1h | Button renders, command copies | I,V,E,S,T |
| T1.7.3 | Responsive + reduced-motion | 1h | Full-width mobile, centered desktop | I,V,E,S,T |

---

### Feature 1.8: Optimization & Polish

**Estimate**: 12h | **Priority**: P0 | **Dependencies**: F1.2-F1.7

**Acceptance Criteria**:
- Dynamic imports for below-fold sections
- Skeleton loaders for lazy sections
- Lighthouse 95+
- Bundle <150KB gzip
- SEO metadata complete
- Keyboard navigable

#### Tasks

| ID | Task | Estimate | Acceptance Criteria | INVEST |
|----|------|----------|--------------------:|--------|
| T1.8.1 | Implement next/dynamic lazy loading | 2h | Below-fold sections load on scroll | I,V,E,S,T |
| T1.8.2 | Build skeleton components | 1.5h | Each lazy section has matching skeleton | I,V,E,S,T |
| T1.8.3 | Bundle size audit + optimization | 2h | Total <150KB verified with analyzer | I,V,E,S,T |
| T1.8.4 | Lighthouse optimization (LCP, CLS, INP) | 2h | Score 95+ on desktop and mobile | I,V,E,S,T |
| T1.8.5 | SEO: metadata, Open Graph, semantic HTML | 1.5h | Rich preview in social shares | I,V,E,S,T |
| T1.8.6 | Accessibility: keyboard nav, ARIA, contrast | 2h | WCAG AA compliance | I,V,E,S,T |
| T1.8.7 | Cross-browser testing (Chrome, Firefox, Safari) | 1h | No visual breakage | I,V,E,S,T |

---

## Dependency Map

```
F1.1 Foundation
 ├── F1.2 Hero ─────────────────┐
 ├── F1.3 Quick Start ──────────┤
 ├── F1.4 Pipeline ─────────────┤
 ├── F1.5 Features ─────────────┼── F1.8 Optimization
 ├── F1.6 Metrics ──────────────┤
 └── F1.7 CTA ──────────────────┘
```

## Summary

| Level | Count | Total Estimate |
|-------|-------|----------------|
| Epic | 1 | 62h |
| Features | 8 | - |
| Tasks | 35 | 62h |

All tasks meet INVEST criteria:
- **Independent**: Can be developed in isolation
- **Negotiable**: Implementation details flexible
- **Valuable**: Each delivers visible functionality
- **Estimable**: Clear scope with hour estimates
- **Small**: All tasks <=4h (max is 4h)
- **Testable**: Each has acceptance criteria
