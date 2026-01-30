# Sprint Plan - claude-symphony Landing Page

> Stage: 05-task-management | Date: 2026-01-30
> Total Sprints: 3 | Total Tasks: 37 | Total Estimate: 66h

---

## Sprint Overview

| Sprint | Goal | Tasks | Estimate | Milestone |
|--------|------|-------|----------|-----------|
| Sprint 1 | Foundation + Above-fold | 15 | 26h | M1 + M2 |
| Sprint 2 | All Sections Implemented | 14 | 27.5h | M3 + M4 |
| Sprint 3 | Production-ready Polish | 8 | 12.5h | M5 |

---

## Sprint 1: Foundation + Above-Fold

**Goal**: Project setup complete, Hero and Quick Start sections functional with animations.

**Quality Gate**: `npm run build` succeeds, hero displays with Particles + SplitText, terminal types commands.

### Tasks

| Order | ID | Task | Est | Feature | Priority | Deps |
|-------|----|------|-----|---------|----------|------|
| 1 | TASK-001 | Initialize Next.js 15 App Router project | 1h | F1.1 | P0 | — |
| 2 | TASK-002 | Install npm dependencies | 0.5h | F1.1 | P0 | 001 |
| 3 | TASK-003 | Configure Tailwind v4 @theme | 1h | F1.1 | P0 | 001 |
| 4 | TASK-004 | Create lib/types.ts | 1h | F1.1 | P0 | 001 |
| 5 | TASK-006 | Create lib/utils.ts (cn) | 0.5h | F1.1 | P0 | 002 |
| 6 | TASK-005 | Create lib/data.ts | 2h | F1.1 | P0 | 004 |
| 7 | TASK-007 | Copy MagicUI source files | 1h | F1.1 | P0 | 002 |
| 8 | TASK-008 | Copy ReactBits source files | 1h | F1.1 | P0 | 002 |
| 9 | TASK-009 | Build Particles background | 3h | F1.2 | P0 | 007 |
| 10 | TASK-011 | Build CopyCommand component | 1h | F1.2 | P0 | 006 |
| 11 | TASK-010 | Implement Hero + SplitText | 3h | F1.2 | P0 | 008,009,005 |
| 12 | TASK-012 | Hero responsive + reduced-motion | 1h | F1.2 | P0 | 010,011 |
| 13 | TASK-013 | Build Terminal UI | 2h | F1.3 | P0 | 007 |
| 14 | TASK-014 | Typing animation + scroll trigger | 1.5h | F1.3 | P0 | 013,005 |
| 15 | TASK-015 | Quick Start responsive + reduced-motion | 0.5h | F1.3 | P0 | 014 |

### Sprint 1 Execution Groups

```
Group A (Parallel — no deps on each other):
  TASK-001 → TASK-002 → { TASK-003, TASK-004, TASK-006, TASK-007, TASK-008 }

Group B (Hero — after Group A):
  TASK-005 → TASK-009 → TASK-010 → TASK-011 → TASK-012

Group C (Quick Start — after TASK-007, TASK-005):
  TASK-013 → TASK-014 → TASK-015
```

**Sprint 1 Completion Criteria**:
- [ ] `npm run dev` serves the page
- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] Hero section: Particles + SplitText headline + copy command functional
- [ ] Quick Start section: Terminal typing animation triggers on scroll
- [ ] Both sections responsive at 3 breakpoints
- [ ] `prefers-reduced-motion` respected

---

## Sprint 2: Core Sections

**Goal**: All 6 sections implemented and interactive. Pipeline detail panel works. Page fully assembled.

**Quality Gate**: All sections render with data, pipeline cards clickable, metrics count up on scroll, CTA buttons work.

### Tasks

| Order | ID | Task | Est | Feature | Priority | Deps |
|-------|----|------|-----|---------|----------|------|
| 1 | TASK-016 | Build StageCard with MagicCard | 3h | F1.4 | P0 | 007,005 |
| 2 | TASK-017 | Build pipeline responsive grid | 4h | F1.4 | P0 | 016 |
| 3 | TASK-018 | CSS connectors (desktop) | 2h | F1.4 | P1 | 017 |
| 4 | TASK-019 | Detail panel with AnimatePresence | 3h | F1.4 | P0 | 016 |
| 5 | TASK-020 | Staggered entrance animation | 2h | F1.4 | P1 | 017 |
| 6 | TASK-021 | Pipeline responsive QA | 2h | F1.4 | P0 | 017,019,020 |
| 7 | TASK-022 | Feature card (MagicCard+BorderBeam) | 3h | F1.5 | P1 | 007,005 |
| 8 | TASK-023 | Features responsive grid | 2h | F1.5 | P1 | 022 |
| 9 | TASK-024 | Features stagger + reduced-motion | 1h | F1.5 | P1 | 023 |
| 10 | TASK-025 | CountUp component | 2h | F1.6 | P1 | 008 |
| 11 | TASK-026 | Metrics grid + scroll trigger | 1.5h | F1.6 | P1 | 025,005 |
| 12 | TASK-027 | Metrics reduced-motion | 0.5h | F1.6 | P1 | 026 |
| 13 | TASK-028 | CTA + AnimatedGradientText + RetroGrid | 2h | F1.7 | P1 | 007 |
| 14 | TASK-029 | RainbowButton + copy command | 1h | F1.7 | P1 | 028,011 |

### Sprint 2 Execution Groups

```
Group A (Pipeline — highest complexity):
  TASK-016 → { TASK-017, TASK-019 } → { TASK-018, TASK-020 } → TASK-021

Group B (Features — parallel with Pipeline):
  TASK-022 → TASK-023 → TASK-024

Group C (Metrics — parallel):
  TASK-025 → TASK-026 → TASK-027

Group D (CTA — parallel):
  TASK-028 → TASK-029
```

**Note**: TASK-030 (CTA responsive) moved to Sprint 3 as part of overall responsive QA.

**Sprint 2 Completion Criteria**:
- [ ] Pipeline: 10 cards in responsive grid, detail panel toggles on click
- [ ] Features: 6 cards with MagicCard hover + BorderBeam
- [ ] Metrics: 4 numbers count up on scroll
- [ ] CTA: RainbowButton + RetroGrid + copy command
- [ ] `app/page.tsx` assembles all 6 sections

---

## Sprint 3: Polish & Production

**Goal**: Production-ready with Lighthouse 95+, accessibility audit clean, responsive QA complete.

**Quality Gate**: Lighthouse 95+, <150KB bundle, WCAG AA, all breakpoints clean.

### Tasks

| Order | ID | Task | Est | Feature | Priority | Deps |
|-------|----|------|-----|---------|----------|------|
| 1 | TASK-030 | CTA responsive + reduced-motion | 1h | F1.7 | P1 | 029 |
| 2 | TASK-031 | next/dynamic lazy loading | 2h | F1.8 | P0 | All sections |
| 3 | TASK-032 | Skeleton components | 1.5h | F1.8 | P0 | 031 |
| 4 | TASK-033 | Bundle size audit | 2h | F1.8 | P0 | 031 |
| 5 | TASK-035 | SEO metadata + semantic HTML | 1.5h | F1.8 | P0 | 001 |
| 6 | TASK-036 | Accessibility audit | 2h | F1.8 | P0 | All sections |
| 7 | TASK-034 | Lighthouse optimization | 2h | F1.8 | P0 | 033 |
| 8 | TASK-037 | Cross-browser testing | 1h | F1.8 | P1 | 034,036 |

### Sprint 3 Execution Groups

```
Group A (Performance):
  TASK-031 → TASK-032 → TASK-033 → TASK-034

Group B (Quality — parallel with A):
  TASK-030
  TASK-035
  TASK-036

Final:
  TASK-037 (after Group A + Group B)
```

**Sprint 3 Completion Criteria**:
- [ ] Lighthouse Performance 95+ on desktop and mobile
- [ ] Total JS bundle <150KB gzip
- [ ] Initial load (above-fold) <80KB
- [ ] CLS <0.1 (skeletons with fixed heights)
- [ ] LCP <2.5s (SSR `<h1>`)
- [ ] WCAG 2.1 AA compliance verified
- [ ] All breakpoints (mobile/tablet/desktop) clean
- [ ] `prefers-reduced-motion` works for all 13 animated components
- [ ] Keyboard navigation: 16 tab stops, logical order
- [ ] Chrome, Firefox, Safari: no visual breakage

---

## Risk Mitigation

| Risk | Sprint | Mitigation |
|------|--------|------------|
| GSAP hydration issues | 1 | Fallback to motion/react word-level stagger |
| Pipeline grid breakage | 2 | Build all 3 breakpoints from start (TASK-017) |
| Bundle over 150KB | 3 | Tree-shake GSAP (only SplitText plugin), remove unused MagicUI |
| MagicUI React 19 issues | 1 | Source-copy allows immediate patching |
| Canvas Particles perf (mobile) | 1 | Reduce to 20 particles, requestAnimationFrame throttle |

---

## Implementation Order Summary

```
Sprint 1: TASK-001 → 002 → {003,004,006,007,008} → {005,009,011,013} → {010,014} → {012,015}
Sprint 2: {016,022,025,028} → {017,019,023,026,029} → {018,020,024,027} → 021
Sprint 3: {030,031,035,036} → {032,033} → 034 → 037
```
