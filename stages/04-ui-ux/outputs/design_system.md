# Design System - claude-symphony Landing Page

> Stage: 04-ui-ux | Synthesized from: Gemini (creative) + ClaudeCode (validation)
> Date: 2026-01-30

---

## 1. Color Palette

### Background Hierarchy

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `bg-page` | `#0a0a0f` | `bg-[#0a0a0f]` | Root `<body>`, page background |
| `bg-card` | `#111827` | `bg-[#111827]` | Cards, terminal, detail panels |
| `bg-elevated` | `#1e293b` | `bg-[#1e293b]` | Hovered cards, active states |
| `bg-overlay` | `rgba(0,0,0,0.5)` | `bg-black/50` | Modal/overlay if needed |
| `bg-terminal` | `#0d1117` | `bg-[#0d1117]` | Terminal body (darker than card) |
| `bg-terminal-header` | `#161b22` | `bg-[#161b22]` | Terminal header bar |

### Text Hierarchy

| Token | Hex | Tailwind | Usage | Contrast on #0a0a0f | Contrast on #111827 |
|-------|-----|----------|-------|---------------------|---------------------|
| `text-primary` | `#f1f5f9` | `text-[#f1f5f9]` | Headlines, titles, body | 17.4:1 (AAA) | 13.8:1 (AAA) |
| `text-secondary` | `#94a3b8` | `text-[#94a3b8]` | Subtitles, descriptions | 6.5:1 (AA) | 5.2:1 (AA) |
| `text-muted` | `#64748b` | `text-[#64748b]` | Captions on page bg only | 4.0:1 (AA large) | 3.2:1 (Fail) |
| `text-muted-card` | `#708599` | `text-[#708599]` | Captions on card bg | N/A | ~4.5:1 (AA) |
| `text-code` | `#e2e8f0` | `text-[#e2e8f0]` | Terminal, code blocks | 15.2:1 (AAA) | 11.8:1 (AAA) |

> **Note**: Muted text (#64748b) fails AA on card backgrounds. Use `text-muted-card` (#708599) when placing muted text on `bg-card`.

### AI Brand Colors (Accent Only)

| AI Model | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| Claude (Violet) | `#8b5cf6` | `text-violet-500` / `bg-violet-500` | Claude stages, primary CTA glow, focus rings |
| Gemini (Emerald) | `#10b981` | `text-emerald-500` / `bg-emerald-500` | Gemini stages, success states |
| Codex (Amber) | `#f59e0b` | `text-amber-500` / `bg-amber-500` | Codex stages, highlights |

**Usage Rule**: AI colors are accents only. Never use as large-area backgrounds. Apply as:
- Pipeline stage card badges
- Glow effects on hover/active
- Gradient text highlights
- Border/ring colors

### AI Badge Colors (Subtle Backgrounds)

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Claude | `rgba(139, 92, 246, 0.1)` | `#8b5cf6` | `1px solid rgba(139, 92, 246, 0.3)` |
| Gemini | `rgba(16, 185, 129, 0.1)` | `#10b981` | `1px solid rgba(16, 185, 129, 0.3)` |
| Codex | `rgba(245, 158, 11, 0.1)` | `#f59e0b` | `1px solid rgba(245, 158, 11, 0.3)` |
| Neutral | `rgba(139, 92, 246, 0.05)` | `#94a3b8` | `1px solid #1f2937` |

### Gradient Definitions

| Name | CSS | Usage |
|------|-----|-------|
| Hero gradient text | `bg-gradient-to-r from-[#8b5cf6] via-[#10b981] to-[#f59e0b]` + `bg-clip-text text-transparent` | Hero headline keywords, CTA headline |
| Card hover border | `from-violet-500/50 to-emerald-500/50` | MagicCard border on hover |
| Section fade | `bg-gradient-to-b from-transparent to-[#0a0a0f]` | Bottom fade on hero particles |
| Hero background | `radial-gradient(ellipse at top center, rgba(139,92,246,0.1) 0%, transparent 70%)` | Hero section background |

---

## 2. Typography

### Font Stack

| Family | Source | CSS Variable | Usage |
|--------|--------|-------------|-------|
| Geist Sans | `next/font/local` | `--font-geist-sans` | UI text, headings, body |
| Geist Mono | `next/font/local` | `--font-geist-mono` | Terminal, code, metrics numbers |

Both loaded with `display: 'swap'` for zero FOIT.

### Type Scale

| Token | Desktop | Mobile | Weight | Line Height | Tailwind |
|-------|---------|--------|--------|-------------|----------|
| Display (H1) | 64px | 40px | 800 (extrabold) | 1.0 / 1.05 | `text-6xl` / `text-4xl` |
| H2 | 36px | 28px | 700 (bold) | 1.1 / 1.15 | `text-4xl` / `text-3xl` |
| H3 | 24px | 24px | 600 (semibold) | 1.3 | `text-2xl` |
| H4 | 20px | 20px | 600 (semibold) | 1.4 | `text-xl` |
| Body LG | 18px | 18px | 400 | 1.6 | `text-lg` |
| Body | 16px | 16px | 400 | 1.6 | `text-base` |
| Body SM | 14px | 14px | 400 | 1.5 | `text-sm` |
| Caption | 12px | 12px | 500 (medium) | 1.5 | `text-xs font-medium` |
| Code | 14px | 14px | 400 | 1.6 | `text-sm font-mono` |
| Metric | 48px | 36px | 700 | 1.0 | `text-5xl` / `text-4xl` + `font-mono` |

---

## 3. Spacing System

Base unit: 4px (Tailwind default).

### Core Tokens

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `space-1` | 4px | `gap-1`, `p-1` | Icon-text gap in badges |
| `space-2` | 8px | `gap-2`, `p-2` | Button icon-text, inline gaps |
| `space-3` | 12px | `p-3` | Badge padding, small card inner |
| `space-4` | 16px | `gap-4`, `p-4` | Grid gaps, card padding (mobile) |
| `space-6` | 24px | `gap-6`, `p-6` | Card padding (desktop), element gaps |
| `space-8` | 32px | `mb-8` | Section heading to content |

### Section Spacing

| Context | Desktop | Tablet | Mobile | Tailwind |
|---------|---------|--------|--------|----------|
| Section vertical padding | 96px | 80px | 64px | `py-24` / `sm:py-20` / `py-16` |
| Section horizontal padding | 24px | 24px | 16px | `px-6` / `px-4` |
| Content max-width | 1280px | -- | -- | `max-w-7xl` |
| Terminal max-width | 720px | -- | full | `max-w-[720px]` |
| CTA max-width | 640px | -- | full | `max-w-[640px]` |
| Hero max-width | 896px | -- | full | `max-w-4xl` |

---

## 4. Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cards (pipeline, feature) | 12px | `rounded-xl` |
| Terminal container | 12px | `rounded-xl` |
| Detail panel | 12px | `rounded-xl` |
| Buttons (CTA, copy) | 8px | `rounded-lg` |
| Code snippets inline | 6px | `rounded-md` |
| Badges / pills | 9999px | `rounded-full` |
| Input fields | 8px | `rounded-lg` |

---

## 5. Shadow & Glow System

Dark backgrounds make traditional box-shadows invisible. Use glows and ring-based elevation.

| Token | CSS | Usage |
|-------|-----|-------|
| Card edge | `ring-1 ring-white/[0.06]` | Default card border definition |
| Card hover glow | `shadow-[0_0_20px_rgba(139,92,246,0.15)]` | Violet glow on hover |
| Active glow (Claude) | `shadow-[0_0_30px_rgba(139,92,246,0.25)]` | Selected Claude stage |
| Active glow (Gemini) | `shadow-[0_0_30px_rgba(16,185,129,0.25)]` | Selected Gemini stage |
| Active glow (Codex) | `shadow-[0_0_30px_rgba(245,158,11,0.25)]` | Selected Codex stage |
| Terminal ambient | `shadow-[0_0_40px_rgba(139,92,246,0.1)]` | Subtle terminal glow |
| Focus ring | `ring-2 ring-violet-500 ring-offset-2 ring-offset-[#0a0a0f]` | Keyboard focus indicator |
| Section divider | `linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)` | 1px horizontal rule |
| Glass effect | `backdrop-blur-[12px] bg-[rgba(17,24,39,0.7)]` | Overlay panels (if needed) |

---

## 6. Animation System

### Libraries

| Library | Scope | Usage |
|---------|-------|-------|
| GSAP + SplitText | Hero headline only | Character-level stagger animation |
| motion/react | Everything else | Entrance, hover, stagger, counters, AnimatePresence |
| CSS keyframes | Background effects | Shimmer, gradient flow, border beam, cursor blink |

### Animation Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `entrance` | 500ms | `ease-out` | Section/card entrance (fade + translateY) |
| `stagger` | 100ms delay | -- | Between sequential card entrances |
| `hover` | 150ms | `ease-in-out` | Hover state transitions |
| `press` | 100ms | `ease-out` | Active/pressed state |
| `typing` | 60ms/char | linear | Terminal typing effect |
| `countup` | 2000ms | `ease-out` | Metric number animation |
| `splittext` | 40ms/char stagger | spring | Hero headline characters |
| `detail-panel` | 200ms | `ease-out` | Pipeline detail panel slide |

### Trigger Rules

| Animation | Trigger | Repeat |
|-----------|---------|--------|
| Hero SplitText | Page load | Once |
| Particles | Page load | Continuous |
| Terminal typing | IntersectionObserver (0.3) | Once |
| Pipeline card entrance | IntersectionObserver (0.2) | Once |
| Feature card entrance | IntersectionObserver (0.2) | Once |
| CountUp metrics | IntersectionObserver (0.5) | Once |
| CTA entrance | IntersectionObserver (0.2) | Once |
| Hover effects | Mouse enter/leave | Every time |

### Reduced Motion

All animations must respect `prefers-reduced-motion: reduce`:
- **Fade/slide animations** → Instant display
- **Typing animation** → Full text immediately
- **CountUp** → Final value immediately
- **Particles** → Static dots, no movement
- **Hover scale/translate** → Opacity change only (0.8 → 1)
- **Border beam / shimmer** → Static border or none
- **RetroGrid** → Static grid pattern

Implementation: `useReducedMotion()` hook from motion/react + CSS `@media (prefers-reduced-motion: reduce)`.

---

## 7. Component Library

### Core Components

| Component | Source | Dependencies | Size (est.) |
|-----------|--------|-------------|-------------|
| Particles | MagicUI (source copy) | Canvas API | ~3KB |
| Terminal | MagicUI (source copy) | CSS only | ~2KB |
| MagicCard | MagicUI (source copy) | motion/react | ~2KB |
| BorderBeam | MagicUI (source copy) | CSS keyframes | ~1KB |
| AnimatedBeam | MagicUI (source copy) | SVG + CSS | ~2KB |
| RainbowButton | MagicUI (source copy) | CSS keyframes | ~1KB |
| RetroGrid | MagicUI (source copy) | CSS only | ~1KB |
| AnimatedGradientText | MagicUI (source copy) | CSS keyframes | ~1KB |
| ShimmerButton | MagicUI (source copy) | CSS keyframes | ~1KB |
| AnimatedShinyText | MagicUI (source copy) | CSS keyframes | ~1KB |
| SplitText | ReactBits (source copy) | GSAP + @gsap/react | ~3KB |
| CountUp | ReactBits (source copy) | motion/react | ~2KB |

### Layout Components

| Component | Description |
|-----------|-------------|
| `Section` | Wrapper with py-16/sm:py-20/lg:py-24, max-w-7xl, px-4/sm:px-6 |
| `Container` | max-w-7xl mx-auto px-4 sm:px-6 |
| `SectionHeading` | H2 + optional subtitle, consistent spacing |
| `Badge` | Pill component with AI color variants |
| `CopyCommand` | Install command with copy button + feedback |
| `SkeletonSection` | Lazy-load placeholder with shimmer |

### Section Components

| Component | File | Client? | Lazy? |
|-----------|------|---------|-------|
| HeroSection | `sections/HeroSection.tsx` | Yes (animations) | No (above-fold) |
| QuickStartSection | `sections/QuickStartSection.tsx` | Yes (typing) | No (above-fold) |
| PipelineVisualizer | `sections/PipelineVisualizer.tsx` | Yes (interaction) | Yes |
| FeaturesSection | `sections/FeaturesSection.tsx` | Yes (MagicCard) | Yes |
| MetricsSection | `sections/MetricsSection.tsx` | Yes (CountUp) | Yes |
| CTASection | `sections/CTASection.tsx` | Yes (animations) | Yes |

---

## 8. Responsive Breakpoints

| Name | Range | Tailwind Prefix | Layout |
|------|-------|-----------------|--------|
| Mobile | <640px | (default) | Single column |
| Tablet | 640-1023px | `sm:` | 2-column grids |
| Desktop | 1024-1279px | `lg:` | Multi-column, connectors |
| Wide | ≥1280px | `xl:` | Max-width constraints |

### Grid Configurations

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Pipeline | 1 column | 2 columns | 5 columns × 2 rows |
| Features | 1 column | 2 columns | 3 columns |
| Metrics | 2×2 grid | 4 columns | 4 columns |

---

## 9. Accessibility Standards

### WCAG 2.1 AA Requirements

- All text meets minimum contrast ratios (see Color Palette)
- All interactive elements have visible focus indicators (2px violet ring)
- All decorative elements marked `aria-hidden="true"`
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
- Heading hierarchy maintained: h1 > h2 > h3
- Skip-to-content link as first focusable element
- `aria-live="polite"` for copy feedback announcements
- `aria-expanded` / `aria-controls` for pipeline card toggles
- All touch targets ≥44×44px on mobile

### Keyboard Support

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift+Tab | Move to previous interactive element |
| Enter/Space | Activate buttons, toggle pipeline cards |
| Escape | Close pipeline detail panel |

---

## 10. Performance Budget

| Category | Budget | Estimated |
|----------|--------|-----------|
| Total JS (gzip) | <150KB | ~129KB |
| Initial load (above-fold) | <80KB | ~79KB |
| Lazy chunks (below-fold) | <50KB each | ~50KB total |
| LCP | <2.5s | <1.5s (SSR h1) |
| CLS | <0.1 | <0.05 (skeleton heights) |
| Lighthouse Performance | 95+ | Target 97+ |
