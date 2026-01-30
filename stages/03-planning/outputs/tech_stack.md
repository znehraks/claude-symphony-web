# Technology Stack Decision - claude-symphony Landing Page

> Stage: 03-planning | Date: 2026-01-30

---

## Final Technology Stack

### Core Framework

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Next.js** | 15.x (App Router) | SSR/SSG, SEO, React 19 support, dynamic imports |
| **React** | 19.x | Latest stable, Server Components, improved hydration |
| **TypeScript** | 5.x | Type safety, better DX, interface definitions |
| **Tailwind CSS** | v4 | Utility-first, `@theme inline {}` syntax, no config file |

### Animation Libraries

| Library | Version | Scope | Bundle Impact |
|---------|---------|-------|---------------|
| **motion** | latest | All animations except Hero text | ~20-25KB gzip (tree-shaken) |
| **gsap** | latest | Hero SplitText only | ~15-20KB gzip |
| **@gsap/react** | latest | React hook integration for GSAP | ~2KB gzip |

**Decision D-R3**: Two animation libraries are justified. GSAP is isolated to Hero section only. motion/react handles everything else. No conflict risk.

**Critical**: Use `motion` package, NOT `framer-motion`. Import from `motion/react`. This is required for React 19 / Next.js 15 compatibility.

### UI Component Libraries (Source Copy, NOT npm)

| Library | Components Used | Install Method |
|---------|----------------|----------------|
| **MagicUI** | particles, magic-card, border-beam, terminal, typing-animation, rainbow-button, retro-grid, animated-shiny-text, animated-gradient-text, shimmer-button | Source copy to `components/magicui/` |
| **ReactBits** | SplitText, CountUp | Source copy to `components/reactbits/` |

### Utility Dependencies (npm)

```bash
npm install motion gsap @gsap/react clsx tailwind-merge @radix-ui/react-slot class-variance-authority lucide-react
```

| Package | Purpose | Size |
|---------|---------|------|
| `clsx` | Conditional classnames | ~0.5KB |
| `tailwind-merge` | Merge Tailwind classes | ~3KB |
| `@radix-ui/react-slot` | Rainbow Button composition | ~1KB |
| `class-variance-authority` | Rainbow Button variants | ~2KB |
| `lucide-react` | Icons (tree-shakeable) | Per-icon import |

### Development Dependencies

| Package | Purpose |
|---------|---------|
| `@next/bundle-analyzer` | Bundle size monitoring |
| `vitest` | Unit testing |
| `@playwright/test` | E2E testing |

---

## Configuration

### Tailwind CSS v4 (No config file)

All configuration in `app/globals.css` using `@theme inline {}`:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0a0a0f;
  --color-card: #111827;
  --color-claude: #8b5cf6;
  --color-gemini: #10b981;
  --color-codex: #f59e0b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
}
```

### Font Strategy

```typescript
// app/layout.tsx - next/font/local for Geist fonts
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
});
```

---

## Dependency Map

### MagicUI Component Dependencies

| Component | motion/react | Extra Deps | Custom CSS |
|-----------|-------------|------------|------------|
| particles | No | None | None |
| magic-card | Yes | None | None |
| border-beam | Yes | None | offset-path |
| terminal | Yes | None | None |
| shimmer-button | No | None | 2 keyframes |
| rainbow-button | No | radix-slot, cva | CSS vars + keyframe |
| animated-shiny-text | No | None | 1 keyframe |
| retro-grid | No | None | 1 keyframe |
| typing-animation | Yes | None | 1 keyframe |
| animated-gradient-text | No | None | 1 keyframe |

### Bundle Size Budget

| Layer | Size (gzip) | Notes |
|-------|-------------|-------|
| Initial load (above-fold) | ~79KB | React + Hero + QuickStart + fonts |
| Lazy loaded (below-fold) | ~50KB | Pipeline + Features + Metrics + CTA |
| **Total** | **~129KB** | **21KB headroom** |
| **Budget** | **150KB** | |

### Contingency (if over budget)

1. Replace GSAP SplitText with motion-based word stagger (-15KB)
2. Use CSS-only typing animation (-3KB)
3. Drop Border Beam from Feature cards (-2KB)

---

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 116+ | IntersectionObserver v2 |
| Firefox | 122+ | CSS offset-path |
| Safari | 17.2+ | motion/react compatibility |
| Edge | 116+ | Chromium-based |

Acceptable for developer-focused audience (primary target).

---

## Decisions from Research

| ID | Decision | Rationale |
|----|----------|-----------|
| D-R1 | Use `motion` not `framer-motion` | React 19 / Next.js 15 compatibility |
| D-R2 | GSAP SplitText for Hero | Now free (Webflow), superior text-splitting |
| D-R3 | Two animation libraries | Isolated usage, clear separation |
| D-R4 | Tailwind v4 `@theme inline` | Next.js 15 default, no config file needed |
| D-R5 | Rainbow Button extra deps | radix-slot + cva required by MagicUI |
