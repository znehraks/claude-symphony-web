# System Architecture - claude-symphony Landing Page

> Stage: 03-planning | Synthesized from: Gemini + ClaudeCode parallel outputs
> Date: 2026-01-30

---

## 1. Component Hierarchy

```
app/layout.tsx (Server Component - fonts, metadata, <html>)
└── app/page.tsx (Server Component - data assembly, section ordering)
    ├── sections/hero.tsx (Client - "use client")
    │   ├── ui/particles.tsx (Canvas - MagicUI)
    │   ├── ui/split-text.tsx (GSAP SplitText - ReactBits)
    │   └── ui/copy-command.tsx
    ├── sections/quick-start.tsx (Client - "use client")
    │   └── ui/terminal.tsx (MagicUI)
    │       └── ui/typing-animation.tsx (MagicUI)
    ├── sections/pipeline.tsx (Client - "use client", dynamic import)
    │   └── components/pipeline/stage-grid.tsx
    │       └── components/pipeline/stage-card.tsx (MagicUI Magic Card)
    │           └── components/pipeline/detail-panel.tsx (AnimatePresence)
    ├── sections/features.tsx (Client - "use client", dynamic import)
    │   └── ui/magic-card.tsx (MagicUI)
    │       └── ui/border-beam.tsx (MagicUI)
    ├── sections/metrics.tsx (Client - "use client", dynamic import)
    │   └── ui/count-up.tsx (ReactBits)
    └── sections/cta.tsx (Client - "use client", dynamic import)
        ├── ui/retro-grid.tsx (MagicUI)
        └── ui/rainbow-button.tsx (MagicUI)
```

### Server vs Client Component Boundaries

| Component | Type | Rationale |
|-----------|------|-----------|
| `app/layout.tsx` | Server | Fonts, metadata, static shell |
| `app/page.tsx` | Server | Data assembly, section ordering, SEO |
| All 6 sections | Client (`"use client"`) | Require animations, state, or browser APIs |
| `lib/data.ts` | Shared | Imported by server page, passed as props |

### Thin Server Wrapper Pattern (Hero)

The Hero section uses a **thin server wrapper** for LCP optimization:
- Server renders `<h1>`, `<p>`, and CTA as static HTML (instant paint)
- Client component hydrates on top, adding GSAP SplitText + Particles
- Search engines index the full hero text without JavaScript

---

## 2. Data Flow Architecture

### Unidirectional Data Flow (Server -> Client)

```
lib/data.ts (Source of Truth)
  ├── heroContent
  ├── QUICK_START_STEPS
  ├── STAGES (10 items)
  ├── FEATURES (6 items)
  └── METRICS (4 items)
       │
       ▼
app/page.tsx (Server Component)
  - Imports all data from lib/data.ts
  - Passes as props to section components
       │
       ▼
Section Components (Client)
  - Receive data as props
  - Local state only for interactivity:
    • Pipeline: useState<number | null> for activeStage
    • Terminal: useState<boolean> for isTypingComplete
```

### TypeScript Data Model

```typescript
// lib/types.ts

export interface Stage {
  id: string;                    // "01" through "10"
  name: string;                  // "Brainstorming", "Research", etc.
  aiModel: string;               // "Gemini + ClaudeCode", "Claude", etc.
  executionMode: string;         // "YOLO (Container)", "Plan Mode", etc.
  description: string;           // One-line description for card
  icon: string;                  // Lucide icon name
  color: string;                 // Tailwind color class for accent
  isParallel: boolean;           // Whether stage uses parallel AI
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  highlight?: string;            // Badge text ("Core", "New")
  category: 'orchestration' | 'automation' | 'quality';
}

export interface Metric {
  label: string;
  value: number;
  suffix?: string;               // "+", "%", "ms"
  prefix?: string;               // "<"
  description: string;
  animateFrom?: number;          // Counter start (default: 0)
}

export interface QuickStartStep {
  command: string;
  comment?: string;
  delay: number;                 // Typing delay (ms)
}
```

---

## 3. Dynamic Import Strategy

### Critical Path (Eager Load) - ~79KB gzip

| Module | Size | Reason |
|--------|------|--------|
| React 19 + Next.js runtime | ~42KB | Framework |
| Hero section + GSAP SplitText | ~18KB | LCP element, above-fold |
| Quick Start terminal | ~3KB | Above-fold on desktop |
| Fonts (Geist Sans + Mono) | ~12KB | Preloaded |
| Tailwind CSS (used classes) | ~8KB | Initial styles |

### Lazy Loaded (next/dynamic) - ~50KB gzip

```typescript
// app/page.tsx
import dynamic from 'next/dynamic';

const Pipeline = dynamic(() => import('@/components/sections/pipeline'), {
  loading: () => <SectionSkeleton height="600px" />,
});
const Features = dynamic(() => import('@/components/sections/features'), {
  loading: () => <SectionSkeleton />,
});
const Metrics = dynamic(() => import('@/components/sections/metrics'), {
  loading: () => <SectionSkeleton />,
});
const CTA = dynamic(() => import('@/components/sections/cta'), {
  loading: () => <SectionSkeleton />,
});
```

### Total Bundle Budget

| Category | Size (gzip) |
|----------|-------------|
| Initial load (above-fold) | ~79KB |
| Lazy loaded (below-fold) | ~50KB |
| **Total** | **~129KB** |
| **Budget** | **150KB** |
| **Headroom** | **~21KB** |

---

## 4. Responsive Architecture

### Breakpoint Strategy (Mobile-First)

| Breakpoint | Width | Tailwind |
|------------|-------|----------|
| Mobile (base) | <640px | Default |
| Tablet | 640-1023px | `sm:` |
| Desktop | >=1024px | `lg:` |
| Wide | >=1280px | `xl:` (max-width constraints only) |

### Per-Section Responsive Layout

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Hero** | Full viewport, stacked vertical | Same, larger type | Centered, max-width |
| **Quick Start** | Full-width terminal | Padding increase | max-w-[720px] centered |
| **Pipeline** | 1-col (10 stacked) | 2-col (5 rows) | 2-row x 5-col with connectors |
| **Features** | 1-col | 2-col grid | 3-col grid |
| **Metrics** | 2x2 grid | 4-col row | 4-col with larger numbers |
| **CTA** | Full-width stacked | Wider max-width | max-w-[640px] centered |

### Pipeline Visualizer Responsive Detail

**Desktop (>=1024px)**: 2 rows of 5 cards with CSS connector arrows
**Tablet (640-1023px)**: 2-column grid, 5 rows, no connectors
**Mobile (<640px)**: Single column, vertical stack, no connectors

CSS Implementation:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
```

---

## 5. Animation Orchestration

### Library Separation

| Library | Scope | Components |
|---------|-------|------------|
| **GSAP SplitText** | Hero heading only | Character-level text animation |
| **motion/react** | All other animations | Entrance, hover, stagger, counters |
| **CSS keyframes** | Background effects | Shimmer, gradient flow, border beam |

### IntersectionObserver Strategy

| Section | Threshold | Behavior |
|---------|-----------|----------|
| Hero | N/A (immediate) | Plays on mount |
| Quick Start | 0.3 | Start typing once |
| Pipeline | 0.1 | Stagger cards (100ms each) |
| Features | 0.2 | Stagger cards (100ms each) |
| Metrics | 0.5 | CountUp animation once |
| CTA | 0.3 | Fade-up entrance |

### Canvas Lifecycle (Particles)

- **Start**: Initialize on page load, begin animation loop
- **Pause**: When Hero exits viewport (IntersectionObserver)
- **Resume**: When Hero re-enters viewport
- **Mobile optimization**: 40 -> 20 particles, disable mouse tracking

### Reduced-Motion Fallbacks

Every animated component respects `prefers-reduced-motion`:
- GSAP SplitText -> Instant text display
- Particles -> Static positions, no movement
- Staggered entrances -> Instant visibility
- CountUp counters -> Static final numbers
- Hover effects -> Subtle opacity change only

---

## 6. State Management (Minimalist)

**No global state required** (static landing page, no user data).

| Component | State | Type |
|-----------|-------|------|
| Pipeline | `activeStage: number \| null` | `useState` |
| Terminal | `isTypingComplete: boolean` | `useState` |

---

## 7. SEO & Performance Strategy

### Metadata

```typescript
export const metadata: Metadata = {
  title: "Claude-Symphony | Multi-AI Orchestration Framework",
  description: "Orchestrate Claude, Gemini, and Codex in a unified 10-stage pipeline from brainstorming to deployment.",
  openGraph: {
    title: "Claude-Symphony",
    description: "Multi-AI Orchestration Framework",
    type: "website",
  },
};
```

### Font Strategy

- **Geist Sans**: UI text, loaded via `next/font/local`, `display: 'swap'`
- **Geist Mono**: Code/terminal, loaded via `next/font/local`, `display: 'swap'`
- Both self-hosted by Next.js with automatic preload hints

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | <2.5s (target <1.5s) | Hero text server-rendered, fonts preloaded |
| CLS | <0.1 (target <0.05) | Explicit dimensions, skeleton loaders |
| FID/INP | <200ms | No heavy JS during interaction |
| Bundle | <150KB gzip | Dynamic imports, tree-shaking |

### CLS Prevention

- All sections: explicit `min-height` values
- Pipeline cards: fixed `h-[180px]` dimensions
- Feature cards: `aspect-[4/3]` ratio
- Lazy sections: skeleton placeholders match final dimensions
- Fonts: `display: 'swap'` with `next/font` size-adjust

---

## 8. Risk Assessment Summary

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | GSAP SplitText hydration mismatch | HIGH | Thin server wrapper, useEffect-only execution |
| 2 | motion/react bundle creep | MEDIUM | Specific imports, bundle analyzer, CI budget check |
| 3 | Pipeline responsive complexity | MEDIUM | CSS Grid, decorative-only connectors, 3-breakpoint testing |
| 4 | Fast-scroll animation race | LOW | `once: true`, requestAnimationFrame debounce |
| 5 | MagicUI React 19 compatibility | MEDIUM | Pre-audit, fork-and-patch if needed |

---

## Synthesis Notes

### Commonalities (HIGH CONFIDENCE)
Both Gemini and ClaudeCode agreed on:
- 6-section structure with Server Component page wrapper
- `"use client"` on all section components
- Dynamic import for below-fold sections
- ~129KB total bundle (within 150KB budget)
- GSAP isolated to Hero only
- 3-breakpoint responsive strategy
- IntersectionObserver for scroll-triggered animations
- Minimalist state management (useState only)

### Unique Contributions
- **Gemini**: Detailed sprint planning (3 sprints), milestone definitions, library shaking strategy
- **ClaudeCode**: Thin server wrapper pattern for LCP, hydration risk analysis, testing strategy per section, CLS prevention details

### Selected Best Approach
- ClaudeCode's thin server wrapper pattern adopted for Hero (superior LCP strategy)
- Gemini's sprint planning adopted for project plan
- Both responsive architectures aligned; ClaudeCode's Tailwind grid implementation selected
- ClaudeCode's reduced-motion implementation pattern adopted (more detailed)
