# User Flows - claude-symphony Landing Page

> Stage: 04-ui-ux | Synthesized from: Gemini + ClaudeCode
> Date: 2026-01-30

---

## 1. Primary User Flow: Exploratory Developer

Target: Senior developer/architect (25-40) discovering claude-symphony for the first time.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 1: AWARENESS (0-3s)                                                │
│                                                                         │
│ User lands on page → Hero fills viewport                                │
│ → Particles create premium ambient feel                                 │
│ → SplitText animates headline (0.8s)                                    │
│ → Reads: "Orchestrate Your Entire Development Lifecycle"                │
│ → Understands: CLI tool for dev workflow                                │
│                                                                         │
│ Question answered: "What is this?"                                      │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 2: QUICK VALIDATION (3-8s)                                         │
│                                                                         │
│ → Sees two CTAs: Install command + GitHub                               │
│ → Recognizes familiar CLI pattern                                       │
│                                                                         │
│ Decision point:                                                         │
│   [A] Copy install command → EXIT (Developer Shortcut flow)             │
│   [B] Scroll down → Continue exploration                                │
│                                                                         │
│ Question answered: "How do I use it?"                                   │
└────────────────────────────┬────────────────────────────────────────────┘
                             │ [B] Scrolls
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 3: TRUST BUILDING (8-15s)                                          │
│                                                                         │
│ → Terminal typing animation plays (auto-triggered at 30% viewport)      │
│ → Sees actual CLI commands being typed                                  │
│ → Recognizes npm/npx workflow                                           │
│ → Output shows project initialization sequence                          │
│ → Trust established: "This is a real, usable tool"                      │
│                                                                         │
│ Question answered: "Is this production-ready?"                          │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 4: INVESTIGATION (15-30s)                                          │
│                                                                         │
│ → Pipeline Visualizer shows 10 stage cards (stagger entrance)           │
│ → Color-coded AI badges reveal multi-model approach (differentiator)    │
│                                                                         │
│ Optional interaction:                                                   │
│   → Click card → Detail panel slides in (AnimatePresence)               │
│   → Sees: description, AI model, execution mode, inputs/outputs         │
│   → Click another card → Panel switches                                 │
│   → Escape / re-click → Panel closes                                    │
│                                                                         │
│ Understanding built: "This is comprehensive and organized"              │
│ Question answered: "What exactly does it do?"                           │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 5: VALUE ASSESSMENT (30-45s)                                       │
│                                                                         │
│ → 6 feature cards with MagicCard hover effect                           │
│ → Scans key differentiators:                                            │
│     • Multi-AI Orchestration (3 providers, 4 roles)                     │
│     • Sub-Agent System (0% context usage)                               │
│     • Sprint Mode & Loop-back                                           │
│                                                                         │
│ Question answered: "Why is this special?"                               │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 6: SOCIAL PROOF (45-55s)                                           │
│                                                                         │
│ → CountUp animation triggers at 50% viewport                            │
│ → 4 metrics animate to final values:                                    │
│     10 Pipeline Stages                                                  │
│     109+ Automated Tests                                                │
│     <5ms Infrastructure Speed                                           │
│     0% Context Usage (Sub-agents)                                       │
│                                                                         │
│ Question answered: "Does it actually work?"                             │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 7: CONVERSION (55-70s)                                             │
│                                                                         │
│ → CTA headline: "Start Composing Your Next Masterpiece"                 │
│ → RainbowButton dominates attention (animated gradient border)          │
│ → Install command repeated with copy button                             │
│ → Secondary links: GitHub, Discord                                      │
│                                                                         │
│ Exit actions:                                                           │
│   [A] Copy install command → Open terminal → Install                    │
│   [B] Click RainbowButton → Navigate to docs/install                    │
│   [C] Click GitHub → View source code                                   │
│                                                                         │
│ Question answered: "How do I get started?"                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Secondary User Flow: Developer Shortcut

Target: Developer who already knows what claude-symphony is (shared link, word of mouth).

```
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 1: LAND (0-2s)                                                     │
│                                                                         │
│ → Read headline instantly                                               │
│ → Recognize it's the right page                                         │
│ → See install command prominently in hero                               │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 2: COPY & GO (2-5s)                                                │
│                                                                         │
│ → Click copy button on install command                                  │
│ → See "Copied!" feedback with checkmark icon                            │
│ → Open terminal, paste, run                                             │
│ → Done.                                                                 │
│                                                                         │
│ Total time: <5 seconds. No scrolling required.                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Design Requirements for This Flow**:
- Copy button must be above-fold, immediately visible
- Install command text must be readable at a glance
- No modal, popup, or interstitial blocking the hero
- "Copied!" feedback must be clear and instant

---

## 3. Edge Case Flows

### 3.1 JavaScript Disabled

```
User lands → Static HTML renders (SSR)
  → Hero headline visible (server-rendered h1)
  → Subtitle visible
  → Install command visible as text (copy button non-functional)
  → Terminal shows static text (no typing animation)
  → Pipeline cards render as static grid (no expand)
  → Metrics show final numbers (no CountUp)
  → CTA button works as standard <a> tag

Result: Degraded but fully functional. All content accessible.
Above-fold loads ~79KB. No JS required for content consumption.
```

### 3.2 Slow Connection (3G / 500ms+ RTT)

```
User lands → Above-fold loads eagerly (~79KB gzip)
  → Hero + Quick Start render immediately
  → Fonts: system fallback → swap to Geist (display: 'swap')
  → Below-fold: skeleton placeholders while chunks load (~50KB)
  → Sections lazy-load as user scrolls
  → No images to wait for (all SVG/Lucide inline)

Result: Usable within 3-5s. Skeletons prevent CLS.
Total budget: ~129KB gzip (under 150KB limit).
```

### 3.3 Mobile User (Touch Device)

```
User lands → Single-column responsive layout
  → Hero: text-4xl headline, stacked CTAs (full-width)
  → Copy button: full-width, 48px height (touch-friendly)
  → Pipeline: single-column stack, no connectors
  → Cards: full-width tap targets, detail slides inline
  → Features: single-column cards
  → Metrics: 2x2 grid
  → CTA: full-width, stacked
  → All touch targets ≥44x44px
  → No hover-dependent information

Result: Fully functional. Particles reduced to 20 for performance.
MagicCard cursor gradient disabled (no persistent pointer).
```

### 3.4 Screen Reader User

```
User navigates →
  1. Skip-to-content link (first Tab)
  2. Landmarks: header, main (6 sections), footer
  3. Heading hierarchy: h1 → h2 × 5 → h3 (within sections)
  4. Tab order: Copy button → GitHub link → 10 pipeline cards → CTA button → Secondary link
  5. Non-interactive sections (Quick Start, Features, Metrics) read via browse mode
  6. Pipeline detail: aria-expanded announces state change
  7. Copy feedback: aria-live="polite" announces "Copied to clipboard"
  8. All decorative elements: aria-hidden="true"

Result: Fully accessible. WCAG 2.1 AA compliant.
```

### 3.5 Keyboard-Only User

```
Tab order (16 interactive stops):
  1. Skip-to-content link
  2. [Hero] Copy install command
  3. [Hero] GitHub link
  4-13. [Pipeline] Stage cards 01-10
  14. [Pipeline] Detail panel (if expanded)
  15. [CTA] RainbowButton
  16. [CTA] Secondary GitHub link

Keyboard interactions:
  - Enter/Space: Activate buttons, toggle pipeline cards
  - Escape: Close pipeline detail panel
  - Tab/Shift+Tab: Navigate between interactive elements
  - Focus indicator: 2px violet ring on all focusable elements

Result: All functionality accessible. Logical top-to-bottom flow.
```

---

## 4. Conversion Metrics Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Install command copy rate | >15% of visitors | Click tracking on copy button |
| GitHub click-through | >10% of visitors | Link click tracking |
| Scroll depth to Pipeline | >60% of visitors | IntersectionObserver event |
| Scroll depth to CTA | >40% of visitors | IntersectionObserver event |
| Time to first interaction | <10s | Performance monitoring |
| Bounce rate | <50% | Analytics |

---

## 5. Flow Summary

| Flow | Target User | Duration | Scroll Required | Key Exit Point |
|------|-------------|----------|-----------------|----------------|
| Primary (Exploratory) | First-time visitor | 55-70s | Full page | CTA section |
| Secondary (Shortcut) | Returning/referred | 2-5s | None | Hero copy button |
| JS Disabled | Any | Varies | Full page | CTA link (standard <a>) |
| Slow Connection | Any | +3-5s load | Full page | Same as primary |
| Mobile | Touch user | 40-60s | Full page | CTA (full-width) |
| Screen Reader | Assistive tech | Varies | Browse mode | CTA button |
| Keyboard Only | No mouse | Varies | Tab navigation | CTA button |
