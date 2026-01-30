# Milestones - claude-symphony Landing Page

> Stage: 05-task-management | Date: 2026-01-30

---

## Milestone Overview

| # | Name | Sprint | Tasks | Est | Key Deliverable |
|---|------|--------|-------|-----|-----------------|
| M1 | Foundation | 1 | 8 | 8h | Dev server + theme + data layer + component primitives |
| M2 | The Hook | 1 | 7 | 18h | Above-fold (Hero + Quick Start) polished |
| M3 | Core Complexity | 2 | 6 | 16h | Pipeline Visualizer at all breakpoints |
| M4 | Social Proof & CTA | 2 | 8 | 11.5h | Features + Metrics + CTA sections |
| M5 | Production Ready | 3 | 8 | 12.5h | Lighthouse 95+, a11y, responsive |

---

## M1: Foundation

**Sprint**: 1 | **Tasks**: TASK-001 through TASK-008 | **Estimate**: 8h

### Description
Project infrastructure setup: Next.js 15 App Router, Tailwind v4 with design system colors, TypeScript types, static data, utility functions, and all animation component source files.

### Deliverables
| Deliverable | Validation Method |
|-------------|-------------------|
| Next.js 15 dev server running | `npm run dev` → localhost:3000 |
| Tailwind v4 @theme configured | Design tokens visible in browser DevTools |
| TypeScript interfaces (Stage, Feature, Metric) | `npm run build` — no TS errors |
| lib/data.ts with all content data | 10 stages, 6 features, 4 metrics exported |
| lib/utils.ts with cn() helper | `cn('a', 'b')` returns merged classes |
| 10 MagicUI components in components/magicui/ | All imports resolve |
| 2 ReactBits components in components/reactbits/ | SplitText + CountUp render |

### Success Criteria
- [ ] `npm run dev` serves page
- [ ] `npm run build` succeeds
- [ ] All 12 animation component files exist and compile
- [ ] Theme colors match design_system.md hex values

### Dependencies
None — this is the starting milestone.

---

## M2: The Hook

**Sprint**: 1 | **Tasks**: TASK-009 through TASK-015 | **Estimate**: 18h

### Description
Above-fold experience: Hero section with Particles background, GSAP SplitText headline animation, install copy command. Quick Start terminal with typing animation. Both sections responsive and reduced-motion compliant.

### Deliverables
| Deliverable | Validation Method |
|-------------|-------------------|
| Particles canvas (3 AI colors) | Visual: violet/emerald/amber dots on #0a0a0f |
| SplitText headline animation | Visual: characters stagger on load |
| CopyCommand with clipboard | Click → "Copied!" feedback |
| Terminal UI with traffic lights | Visual: dark terminal, header dots |
| Typing animation (scroll trigger) | Scroll to 30% → typing starts |
| Skip-to-content link | Tab → first focusable is skip link |

### Success Criteria
- [ ] Hero fills viewport with animated particles
- [ ] Headline animates with character stagger
- [ ] Copy button works and announces via aria-live
- [ ] Terminal typing starts on scroll, runs once
- [ ] Both sections render at mobile/tablet/desktop
- [ ] `prefers-reduced-motion` → instant display
- [ ] LCP element is the `<h1>` (server-rendered)
- [ ] No React hydration warnings

### Dependencies
- M1 (Foundation) complete

---

## M3: Core Complexity

**Sprint**: 2 | **Tasks**: TASK-016 through TASK-021 | **Estimate**: 16h

### Description
Pipeline Visualizer — the most complex section. 10 stage cards in responsive grid (1/2/5 columns), CSS connectors on desktop, click-to-expand detail panels with AnimatePresence, staggered entrance animation.

### Deliverables
| Deliverable | Validation Method |
|-------------|-------------------|
| 10 StageCard components with MagicCard | Visual: hover spotlight effect |
| Responsive grid (3 breakpoints) | DevTools responsive mode |
| CSS connectors (desktop only) | Visual: arrows between cards |
| Detail panel (AnimatePresence) | Click card → panel slides in |
| Stagger entrance on scroll | IntersectionObserver triggers |
| Keyboard navigation | Tab through cards, Enter/Escape |

### Success Criteria
- [ ] 10 cards display with correct stage data and AI badges
- [ ] Desktop: 5×2 grid with connectors
- [ ] Tablet: 2-column grid, no connectors
- [ ] Mobile: single column, no connectors
- [ ] Click card → detail panel shows description, AI model, mode
- [ ] Click again / Escape → panel closes
- [ ] `aria-expanded` toggles correctly
- [ ] Stagger entrance triggers once on scroll
- [ ] Reduced motion → instant display, no slide

### Dependencies
- M1 (Foundation) complete
- TASK-005 (data.ts) for stage data

---

## M4: Social Proof & CTA

**Sprint**: 2 | **Tasks**: TASK-022 through TASK-030 | **Estimate**: 11.5h

### Description
Features section (6 cards with MagicCard + BorderBeam), Metrics section (4 CountUp numbers), CTA section (RainbowButton + RetroGrid + AnimatedGradientText). Page assembly in app/page.tsx.

### Deliverables
| Deliverable | Validation Method |
|-------------|-------------------|
| 6 Feature cards with hover effects | Visual: spotlight + beam |
| Responsive feature grid (1/2/3 cols) | DevTools responsive mode |
| 4 CountUp metrics with scroll trigger | Scroll to 50% → numbers animate |
| CTA headline with animated gradient | Visual: gradient flows |
| RainbowButton primary CTA | Visual: rainbow border animation |
| RetroGrid background | Visual: perspective grid |
| app/page.tsx with all sections | Full page renders |

### Success Criteria
- [ ] 6 feature cards render with correct data
- [ ] MagicCard hover spotlight works
- [ ] BorderBeam animation on feature cards
- [ ] 4 metrics animate 0 → target value on scroll
- [ ] CTA section shows gradient headline + RetroGrid
- [ ] RainbowButton renders with animation
- [ ] Install command in CTA section copies to clipboard
- [ ] All touch targets ≥44×44px on mobile
- [ ] app/page.tsx assembles all 6 sections in order

### Dependencies
- M1 (Foundation) complete
- TASK-011 (CopyCommand) for CTA reuse

---

## M5: Production Ready

**Sprint**: 3 | **Tasks**: TASK-031 through TASK-037 | **Estimate**: 12.5h

### Description
Performance optimization, accessibility audit, responsive QA, SEO, cross-browser testing. Dynamic imports for below-fold, skeleton loaders, Lighthouse 95+.

### Deliverables
| Deliverable | Validation Method |
|-------------|-------------------|
| next/dynamic lazy loading | Network tab: chunks load on scroll |
| Skeleton placeholders | Visual: shimmer during load |
| Bundle <150KB gzip | `@next/bundle-analyzer` report |
| Lighthouse 95+ | Lighthouse CI |
| SEO metadata + OG tags | Social share preview |
| WCAG AA compliance | Manual audit + contrast checker |
| Cross-browser clean | Chrome, Firefox, Safari |

### Success Criteria
- [ ] Lighthouse Performance 95+ (desktop + mobile)
- [ ] Total JS bundle <150KB gzip
- [ ] Initial load (Hero+QuickStart) <80KB
- [ ] Lazy chunks <50KB total
- [ ] LCP <2.5s
- [ ] CLS <0.1
- [ ] All 13 animated components have reduced-motion fallbacks
- [ ] Keyboard: 16 tab stops in logical order
- [ ] Skip-to-content link functional
- [ ] All `aria-*` attributes correct
- [ ] Muted text on cards uses #708599 (not #64748b)
- [ ] Secondary CTA links have py-3 on mobile
- [ ] og:title, og:description, og:image set
- [ ] No visual breakage in Chrome, Firefox, Safari

### Dependencies
- M2, M3, M4 complete (all sections exist)

---

## Milestone Dependency Chain

```
M1 Foundation
├── M2 The Hook ──────────┐
│                          │
├── M3 Core Complexity ────┼── M5 Production Ready
│                          │
└── M4 Social Proof & CTA ┘
```

All of M2, M3, M4 can proceed in parallel after M1, but M5 requires all prior milestones complete.
