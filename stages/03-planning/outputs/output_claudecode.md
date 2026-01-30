# Technical Validation: claude-symphony Landing Page Architecture

**Stage**: 03-planning | **Model**: ClaudeCode | **Date**: 2026-01-30
**Document**: `output_claudecode.md`

---

## 1. COMPONENT ARCHITECTURE VALIDATION

### Server Component vs Client Component Boundaries

The Next.js 15 App Router defaults all components to React Server Components (RSC). Only components requiring browser APIs, state, or event handlers need the `"use client"` directive.

#### Components that MUST be `"use client"`

| Component | Reason | Browser API Used |
|-----------|--------|------------------|
| `HeroSection` | GSAP SplitText animation, motion/react | `document`, `IntersectionObserver` |
| `PipelineVisualizer` | Interactive hover/click states, motion/react animations | `IntersectionObserver`, pointer events |
| `MetricsSection` | Animated counters, motion/react | `IntersectionObserver` |
| `CTASection` | Copy-to-clipboard, motion/react hover effects | `navigator.clipboard` |
| `QuickStartTerminal` | Typed text animation, state management | `setTimeout`/`requestAnimationFrame` |
| `FeaturesGrid` | Staggered reveal animations via motion/react | `IntersectionObserver` |

#### Components that STAY Server Components

| Component | Reason |
|-----------|--------|
| `RootLayout` | Static shell, font loading, metadata |
| `page.tsx` | Orchestrates section order, provides static data as props |
| `Footer` | Static content, no interactivity |
| `SEO metadata` | Generated at build time via `generateMetadata` |

### Thin Server Component Wrapper Pattern

```
app/
  layout.tsx          <- Server Component (fonts, metadata, <html>)
  page.tsx            <- Server Component (data assembly, section ordering)
  sections/
    HeroSection.tsx   <- "use client" (animation)
    HeroWrapper.tsx   <- Server Component (SEO-critical static HTML)
```

**Pattern for Hero (LCP-critical)**:
- `HeroWrapper` (Server Component) renders the `<h1>`, `<p>`, and CTA button as static HTML for SSR/SEO.
- `HeroSection` (Client Component) hydrates on top, adding GSAP SplitText and motion/react entrance animations.
- The static HTML is visible immediately; animation enhances it post-hydration.

This ensures search engines index the full hero text and LCP fires on the server-rendered `<h1>` before any JavaScript executes.

---

## 2. DYNAMIC IMPORT MAP

### Initial Bundle (Page Load)

These load in the main JavaScript bundle because they are above the fold or critical for first paint:

| Module | Approx. Size (gzip) | Justification |
|--------|---------------------|---------------|
| React 19 runtime | ~38KB | Framework core |
| `next/font` (Geist Sans + Geist Mono subsets) | ~12KB | Font files, preloaded |
| `HeroSection` + GSAP SplitText | ~18KB | Above-the-fold, LCP element |
| `QuickStartTerminal` | ~3KB | Above-the-fold on desktop |
| Tailwind CSS (used classes only) | ~8KB | Styles for initial render |
| **Subtotal** | **~79KB** | |

### Lazy Loaded (On Scroll via `next/dynamic`)

| Module | Trigger | Approx. Size (gzip) | Skeleton |
|--------|---------|---------------------|----------|
| `PipelineVisualizer` + motion/react | Viewport intersection at 200px ahead | ~28KB | 10-card grid placeholder with pulse animation |
| `FeaturesGrid` + MagicUI components | Viewport intersection | ~12KB | 3x2 grid of rounded rectangles |
| `MetricsSection` + counter logic | Viewport intersection | ~6KB | 4 static number placeholders |
| `CTASection` | Viewport intersection | ~4KB | Centered block placeholder |
| **Subtotal** | | **~50KB** | |

### Dynamic Import Implementation

```typescript
// app/page.tsx (Server Component)
import dynamic from 'next/dynamic';
import HeroWrapper from './sections/HeroWrapper';

const PipelineVisualizer = dynamic(
  () => import('./sections/PipelineVisualizer'),
  {
    loading: () => <PipelineSkeleton />,
    ssr: false,  // No SSR needed for below-fold interactive content
  }
);

const FeaturesGrid = dynamic(
  () => import('./sections/FeaturesGrid'),
  { loading: () => <FeaturesSkeleton /> }
);

const MetricsSection = dynamic(
  () => import('./sections/MetricsSection'),
  { loading: () => <MetricsSkeleton /> }
);

const CTASection = dynamic(
  () => import('./sections/CTASection'),
  { loading: () => <CTASkeleton /> }
);
```

### Total Bundle Estimate

| Category | Size (gzip) |
|----------|------------|
| Initial load | ~79KB |
| Lazy loaded (all sections) | ~50KB |
| **Total** | **~129KB** |

This is within the 150KB budget with ~21KB headroom.

---

## 3. DATA LAYER DESIGN

### TypeScript Interfaces

```typescript
// lib/types.ts

export interface Stage {
  id: string;                    // "01" through "10"
  name: string;                  // "Brainstorming", "Research", etc.
  aiModel: string;               // "Gemini + ClaudeCode", "Claude", etc.
  executionMode: string;         // "YOLO (Container)", "Plan Mode", etc.
  description: string;           // One-line description for card
  icon: string;                  // Icon identifier (e.g., "brain", "search")
  color: string;                 // Tailwind color class for stage accent
  isParallel: boolean;           // Whether stage uses parallel AI execution
}

export interface Feature {
  title: string;                 // "Multi-AI Orchestration"
  description: string;           // Feature explanation
  icon: string;                  // Icon identifier
  highlight?: string;            // Optional badge text ("New", "Core")
  category: 'orchestration' | 'automation' | 'quality';
}

export interface Metric {
  label: string;                 // "Pipeline Stages"
  value: number;                 // 10
  suffix?: string;               // "+", "%", "x"
  prefix?: string;               // "<"
  description: string;           // "End-to-end workflow"
  animateFrom?: number;          // Counter animation start (default: 0)
}

export interface QuickStartStep {
  command: string;               // Shell command text
  comment?: string;              // Inline comment
  delay: number;                 // Typing animation delay (ms)
}
```

### Data File Structure

```typescript
// lib/data.ts

import { Stage, Feature, Metric, QuickStartStep } from './types';

export const STAGES: Stage[] = [
  {
    id: '01',
    name: 'Brainstorming',
    aiModel: 'Gemini + ClaudeCode',
    executionMode: 'YOLO (Container)',
    description: 'Divergent ideation with parallel AI models',
    icon: 'brain',
    color: 'violet',
    isParallel: true,
  },
  // ... 9 more stages
];

export const FEATURES: Feature[] = [
  {
    title: 'Multi-AI Orchestration',
    description: 'Parallel, sequential, and debate modes across Claude, Gemini, and Codex',
    icon: 'orchestrate',
    highlight: 'Core',
    category: 'orchestration',
  },
  // ... more features
];

export const METRICS: Metric[] = [
  { label: 'Pipeline Stages', value: 10, description: 'End-to-end workflow' },
  { label: 'Automated Tests', value: 109, suffix: '+', description: 'Quality assurance' },
  { label: 'Infrastructure Speed', value: 5, prefix: '<', suffix: 'ms', description: 'Sub-agent overhead' },
  { label: 'Context Usage', value: 0, suffix: '%', description: 'Sub-agents preserve context' },
];

export const QUICK_START_STEPS: QuickStartStep[] = [
  { command: 'npx claude-symphony my-project', comment: '# scaffold project', delay: 60 },
  { command: 'cd my-project', delay: 40 },
  { command: 'claude', comment: '# start orchestration', delay: 40 },
];
```

### Data-to-Card Mapping

Pipeline stage data maps to `PipelineVisualizer` cards as follows:
- Each `Stage` object renders one card in the visualizer.
- Cards are ordered by `id` (01-10) and visually grouped into two rows (01-05, 06-10) on desktop.
- The `color` field drives the accent border/glow color per card.
- The `isParallel` field renders a "Parallel" badge on applicable cards.
- The `aiModel` field shows model icons/chips within the card.

---

## 4. RESPONSIVE ARCHITECTURE

### Breakpoint Definitions

```css
/* Tailwind v4 breakpoints (configured in CSS) */
--breakpoint-sm: 640px;    /* Mobile -> Tablet transition */
--breakpoint-lg: 1024px;   /* Tablet -> Desktop transition */
```

| Breakpoint | Range | Target |
|------------|-------|--------|
| Mobile | `<640px` | Phone portrait/landscape |
| Tablet | `640px - 1023px` | iPad, small laptops |
| Desktop | `>=1024px` | Laptops, monitors |

### Per-Section Responsive Behavior

| Section | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|---------|----------------|--------------------|--------------------|
| **Hero** | Stacked: heading -> subtext -> CTA, full-width | Same layout, larger type | Side-by-side or centered with max-width |
| **Quick Start** | Full-width terminal, reduced font | Same, slight padding increase | Centered with max-width 720px |
| **Pipeline** | Single column, 10 cards stacked vertically | 2 columns (5 rows) | 2 rows of 5 cards, horizontal flow |
| **Features** | Single column cards | 2-column grid | 3-column grid |
| **Metrics** | 2x2 grid | Horizontal row, equal width | Horizontal row with larger numbers |
| **CTA** | Stacked: heading -> command -> button | Same, wider max-width | Centered, max-width 640px |

### Pipeline Visualizer Layout Detail

```
Desktop (>=1024px):
+------+ -> +------+ -> +------+ -> +------+ -> +------+
|  01  |    |  02  |    |  03  |    |  04  |    |  05  |
+------+    +------+    +------+    +------+    +------+
+------+ -> +------+ -> +------+ -> +------+ -> +------+
|  06  |    |  07  |    |  08  |    |  09  |    |  10  |
+------+    +------+    +------+    +------+    +------+

Tablet (640-1023px):
+------+  +------+
|  01  |  |  02  |
+------+  +------+
|  03  |  |  04  |
+------+  +------+
|  ...  |  |  ... |
+------+  +------+

Mobile (<640px):
+----------+
|    01    |
+----------+
|    02    |
+----------+
|   ...    |
+----------+
|    10    |
+----------+
```

Implementation uses Tailwind grid utilities:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
```

---

## 5. ANIMATION ORCHESTRATION

### IntersectionObserver Configuration Per Section

| Section | Threshold | Root Margin | Trigger Behavior |
|---------|-----------|-------------|------------------|
| Hero | N/A (immediate) | N/A | Plays on mount, no observer needed |
| Quick Start | `0.3` | `0px 0px -50px 0px` | Start typing when 30% visible |
| Pipeline | `0.1` | `0px 0px -100px 0px` | Staggered card entrance, early trigger for preload |
| Features | `0.2` | `0px` | Staggered grid reveal |
| Metrics | `0.5` | `0px` | Counter starts when half visible |
| CTA | `0.3` | `0px` | Fade-up entrance |

### GSAP vs motion/react Separation of Concerns

| Library | Responsibility | Components |
|---------|---------------|------------|
| **GSAP SplitText** | Text-splitting animation (character/word/line level) | Hero heading only |
| **motion/react** | Layout animations, scroll-triggered reveals, hover/tap states, stagger orchestration | All other sections |

**Rationale**: GSAP SplitText provides character-level text animation that motion/react does not natively support. All other animations use motion/react for consistency and smaller bundle impact (motion/react is already required by MagicUI components).

### GSAP Lifecycle Management

```typescript
// Hero only
useEffect(() => {
  const ctx = gsap.context(() => {
    const split = new SplitText('.hero-heading', { type: 'chars,words' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, heroRef);

  return () => ctx.revert(); // Cleanup on unmount
}, []);
```

### Canvas/Particles Lifecycle

- **Start**: Initialize on page load, begin particle animation loop.
- **Pause**: When Hero section exits viewport (IntersectionObserver), pause `requestAnimationFrame` loop.
- **Resume**: When Hero re-enters viewport, resume animation loop.
- **Mobile**: Reduce particle count from 40 to 20, disable mouse interaction tracking.

### Reduced-Motion Fallbacks

| Component | Full Motion | Reduced Motion |
|-----------|------------|----------------|
| Hero heading | GSAP SplitText char animation | Instant opacity: 1, no split |
| Particles | Animated canvas particles | Static particle positions, no movement |
| Pipeline cards | Staggered slide-up + fade | Instant visibility, no stagger |
| Features grid | Staggered scale-in | Instant visibility |
| Metrics counters | Animated count-up (2s) | Static final number displayed |
| CTA | Fade-up entrance | Instant visibility |
| Hover effects | Scale + glow transitions | Subtle opacity change only |

Implementation pattern:
```typescript
const prefersReduced = useReducedMotion();

<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 30 }}
  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
  transition={prefersReduced ? { duration: 0 } : { duration: 0.5 }}
/>
```

---

## 6. PERFORMANCE VALIDATION

### Bundle Size Breakdown Per Section

| Section | JS (gzip) | CSS (gzip) | Assets | Notes |
|---------|----------|-----------|--------|-------|
| Framework (React 19, Next.js) | ~42KB | - | - | Shared runtime |
| Hero + GSAP SplitText | ~18KB | ~1KB | - | GSAP tree-shaken to SplitText only |
| Quick Start Terminal | ~3KB | ~0.5KB | - | Minimal, state + typing logic |
| Pipeline Visualizer | ~15KB | ~1KB | - | 10 cards + motion/react animations |
| Features Grid + MagicUI | ~12KB | ~1KB | - | 4 motion-based + 6 CSS-only MagicUI |
| Metrics Section | ~6KB | ~0.5KB | - | Counter animation logic |
| CTA Section | ~4KB | ~0.5KB | - | Clipboard API + button |
| Tailwind CSS (all used) | - | ~8KB | - | Purged unused styles |
| Fonts (Geist Sans + Geist Mono) | - | - | ~12KB | Subset via next/font |
| **Total** | **~100KB** | **~12.5KB** | **~12KB** | **~125KB total** |

### LCP Optimization (Hero Text-First)

1. **Server-render the `<h1>`**: The hero heading is rendered as static HTML in the RSC layer. The browser paints it immediately without waiting for JavaScript.
2. **Font preload**: `next/font` injects `<link rel="preload">` for the heading font subset, ensuring text renders in the correct font on first paint (no FOIT).
3. **No blocking JS for LCP**: GSAP SplitText animation starts after hydration but the text is already visible. The animation is enhancement, not requirement.
4. **Critical CSS inlined**: Tailwind's hero styles are included in the initial CSS chunk.

**Target LCP**: < 1.5s on 4G connection.

### CLS Prevention

| Element | Strategy | Implementation |
|---------|----------|----------------|
| Hero heading | Explicit `min-height` on hero section | `min-h-[600px] lg:min-h-[700px]` |
| Font loading | `font-display: swap` with size-adjust | `next/font` handles automatically |
| Pipeline cards | Fixed card dimensions | `h-[180px] w-full` per card |
| Feature cards | Fixed aspect ratio | `aspect-[4/3]` on card containers |
| Metrics numbers | Reserved width for largest value | `min-w-[80px]` per metric |
| Lazy sections | Skeleton placeholders match final dimensions | Each skeleton matches section height |

**Target CLS**: < 0.05.

### Font Loading Strategy

- **Geist Sans**: Used for all UI text. Latin subset, loaded via `next/font/local`.
- **Geist Mono**: Used for code/terminal sections. Latin subset, loaded via `next/font/local`.
- Both fonts self-hosted by Next.js, with automatic preload hints.
- `display: 'swap'` ensures text is visible immediately with fallback font.

---

## 7. IMPLEMENTATION RISKS

### Risk 1: GSAP SplitText + React 19 Hydration Mismatch (HIGH)

**Description**: GSAP SplitText manipulates DOM by wrapping characters in `<span>` elements. This can cause React hydration errors if the server-rendered HTML differs from what GSAP produces on the client.

**Mitigation**:
- Run SplitText only inside `useEffect` (post-hydration), never during render.
- Use the thin server wrapper pattern: server renders plain `<h1>`, client component enhances it.
- Set `suppressHydrationWarning` on the heading element as a safety net.
- Test hydration in development with `React.StrictMode` enabled.

**Severity**: High | **Likelihood**: Medium | **Impact**: Broken hero on first load

### Risk 2: motion/react Bundle Size Creep (MEDIUM)

**Description**: motion/react can balloon to 30KB+ if many features are imported. With 4 MagicUI components also importing it, tree-shaking effectiveness is uncertain.

**Mitigation**:
- Import only specific features: `import { motion, useInView } from 'motion/react'`.
- Use `@next/bundle-analyzer` during development to monitor chunk sizes.
- Set a CI budget check: fail build if any lazy chunk exceeds 35KB gzip.
- If needed, replace simple fade/slide animations with CSS `@keyframes` + `IntersectionObserver`.

**Severity**: Medium | **Likelihood**: Medium | **Impact**: Exceeds 150KB budget

### Risk 3: Pipeline Visualizer Responsive Layout Complexity (MEDIUM)

**Description**: The 2-row/2-col/1-col layout with connecting arrows/lines between stages requires careful responsive handling.

**Mitigation**:
- Use CSS Grid for card layout; arrows are purely decorative pseudo-elements.
- Hide connecting arrows on mobile; show simple vertical line instead.
- Implement arrows as a separate overlay layer positioned with CSS `absolute`.
- Test all three breakpoints with real content before polishing animations.

**Severity**: Medium | **Likelihood**: Medium | **Impact**: Visual breakage on tablet

### Risk 4: IntersectionObserver Race Conditions on Fast Scroll (LOW)

**Description**: If a user scrolls rapidly, multiple sections may trigger animations simultaneously, causing jank.

**Mitigation**:
- Use `once: true` on motion/react `whileInView` to prevent re-triggering.
- Debounce heavy operations with `requestAnimationFrame`.
- Lazy-loaded sections use `ssr: false` so they don't block main thread during rapid scroll.

**Severity**: Low | **Likelihood**: Low | **Impact**: Janky scroll experience

### Risk 5: MagicUI Component Compatibility with React 19 (MEDIUM)

**Description**: MagicUI components are community-maintained. Some may not be tested with React 19.

**Mitigation**:
- Audit all 10 MagicUI components before implementation.
- The 6 CSS-only components are low risk (no React API dependency).
- The 4 motion-based components need verification with `motion/react`.
- If incompatible, fork and patch (MagicUI is copy-paste by design).

**Severity**: Medium | **Likelihood**: Medium | **Impact**: Build failures or runtime errors

### Complexity Hotspots

| Hotspot | Complexity | Why |
|---------|-----------|-----|
| `HeroSection` | High | GSAP + motion/react coexistence, hydration safety, LCP-critical |
| `PipelineVisualizer` | High | 3-breakpoint responsive grid, stage connectors, 10-card stagger |
| `QuickStartTerminal` | Medium | Typing animation timing, cursor blink state, mobile overflow |
| `MetricsSection` | Medium | Animated counters with easing, reduced-motion variant |
| `FeaturesGrid` | Low | Standard grid with stagger, straightforward |
| `CTASection` | Low | Copy-to-clipboard with toast feedback |

### Testing Strategy Per Section

| Section | Unit Tests | Visual Regression | E2E | Performance |
|---------|-----------|-------------------|-----|-------------|
| Hero | GSAP mock test, hydration test | Chromatic snapshot (3 breakpoints) | Playwright: verify h1 visible < 2s | Lighthouse LCP check |
| Quick Start | Typing animation completion test | Snapshot at typed/untyped states | Playwright: verify all commands appear | - |
| Pipeline | Data mapping test (10 stages render) | Snapshot at 3 breakpoints | Playwright: scroll to section, verify cards | Bundle size check |
| Features | Render test with mock data | Snapshot at 3 breakpoints | - | - |
| Metrics | Counter animation test (start/end values) | Snapshot with final values | Playwright: scroll, verify numbers | - |
| CTA | Clipboard mock test | Snapshot | Playwright: click copy, verify toast | - |
| **Cross-cutting** | Reduced-motion hook test | Snapshots with `prefers-reduced-motion` | Full scroll-through test | Lighthouse full audit |

**Test tooling**: Vitest (unit), Playwright (E2E + visual), Lighthouse CI (performance).

---

## VALIDATION SUMMARY

| Category | Status | Notes |
|----------|--------|-------|
| Component boundaries | VALIDATED | Clear server/client split with thin wrapper pattern |
| Dynamic imports | VALIDATED | ~79KB initial, ~50KB lazy, total ~129KB (under 150KB budget) |
| Data layer | VALIDATED | Clean TypeScript interfaces, single data source |
| Responsive architecture | VALIDATED | 3-breakpoint strategy with per-section behavior defined |
| Animation orchestration | VALIDATED | GSAP scoped to hero only, motion/react for everything else |
| Performance budget | VALIDATED | Estimated 125-129KB gzip, LCP < 1.5s achievable |
| Risk assessment | 5 RISKS IDENTIFIED | 1 high (GSAP hydration), 3 medium, 1 low -- all mitigated |

**Overall Assessment**: The architecture is sound and implementable within the stated constraints. The primary risk is GSAP SplitText hydration management, which is fully mitigable with the thin server wrapper pattern. Bundle budget has ~21KB headroom, providing adequate margin for implementation variance.
