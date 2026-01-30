# Wireframes - claude-symphony Landing Page

> Stage: 04-ui-ux | Synthesized from: Gemini (creative) + ClaudeCode (validation)
> Date: 2026-01-30

---

## Synthesis Notes

**Gemini** provided detailed ASCII wireframes for desktop (1280px) and mobile (375px), plus visual specifications for all 6 sections including animations and component states.

**ClaudeCode** validated the UX flow, identified accessibility issues, specified component states exhaustively, and provided responsive breakpoint details.

**Merged Result**: Gemini's wireframes serve as the visual blueprint, enriched with ClaudeCode's accessibility requirements, contrast fixes, and interaction state definitions.

---

## 1. Desktop Wireframes (1280px)

### Section 1: Hero (100vh)

```text
 1280px ───────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ HERO SECTION - 100vh ]                                                      │
                                                                               │
   [Nav: LOGO (Geist Mono)         Docs   GitHub   Agents          [Star 2.1k]]│
                                                                               │
          ┌─────────────────────────────────────────────────────────┐          │
          │  H1: ORCHESTRATE YOUR ENTIRE DEVELOPMENT LIFECYCLE      │          │
          │      WITH <Gradient: CLAUDE> AND <Gradient: GEMINI>     │          │
          └─────────────────────────────────────────────────────────┘          │
                                                                               │
           Body: An autonomous agent pipeline that transforms ideas            │
                 into deployed code through 10 specialized stages.             │
                                                                               │
                  ┌───────────────┐     ┌──────────────────┐                   │
                  │ $ Install CLI │     │  View on GitHub > │                   │
                  └───────────────┘     └──────────────────┘                   │
                                                                               │
           [ Particles canvas: aria-hidden="true" ]                            │
           [ 40 particles, 3 colors: violet/emerald/amber ]                    │
           [ Mouse parallax drift on desktop ]                                 │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┤
```

**Implementation Notes**:
- Layout: Flex column, centered, min-height 100vh
- Background: Radial gradient top-center (Violet 10% opacity) → #0a0a0f. Particles canvas overlay.
- H1: `text-6xl font-extrabold leading-none` (desktop), server-rendered for LCP
- Body: `text-lg text-[#94a3b8]`
- CTAs: Copy button (`bg-[#1e293b] rounded-lg px-4 py-2`) + GitHub ghost button
- Animation: GSAP SplitText (40ms/char stagger), particles continuous
- A11y: `<h1>` for headline, `aria-hidden="true"` on particles, `aria-label` on copy button

### Section 2: Quick Start (~400px)

```text
 ──────────────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ QUICK START SECTION ]                                                       │
                                                                               │
   H2: Up and running in seconds                                               │
                                                                               │
   ┌─ TERMINAL ────────────────────────────────────────────────────────────┐   │
   │ ● ● ●  bash                                                           │   │
   ├───────────────────────────────────────────────────────────────────────┤   │
   │ $ npx claude-symphony my-project                                      │   │
   │ > Creating project...                                                 │   │
   │ > Initializing 10-stage pipeline...                                   │   │
   │ > Setting up AI models (Claude, Gemini, Codex)...                     │   │
   │ > Ready to compose. ▐                                                 │   │
   └───────────────────────────────────────────────────────────────────────┘   │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┤
```

**Implementation Notes**:
- Layout: Flex column, centered, max-w-3xl
- Terminal: MagicUI Terminal component, `bg-[#0d1117]`, `rounded-xl`
- Header: 32px height, traffic lights (8px circles, `role="presentation"`)
- Font: `text-sm font-mono`, line-height 1.6
- Typing: 60ms/char, triggered at IntersectionObserver threshold 0.3
- Cursor: Block cursor `█`, CSS blink animation 1s infinite
- A11y: Full text in DOM (typing is visual enhancement only), `aria-labelledby="quickstart-heading"`

### Section 3: Pipeline Visualizer (~600px)

```text
 ──────────────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ PIPELINE VISUALIZER ]                                                       │
                                                                               │
   H2: The 10-Stage Symphony                                                   │
                                                                               │
   [01 Brainstorm] -> [02 Research] -> [03 Planning] -> [04 UI/UX] -> [05 Tasks]
       │               │                │                │              │       │
    [Card 01]       [Card 02]        [Card 03]        [Card 04]     [Card 05]  │
    Gemini+CC       Claude           Gemini            Gemini+CC     ClaudeCode │
                                                                               │
       ┌────────── (Animated Beam Connection) ──────────────────────┘          │
       ▼                                                                       │
                                                                               │
   [06 Implement] -> [07 Refactor] -> [08 QA] -> [09 Testing] -> [10 Deploy]  │
       │               │               │            │               │          │
    [Card 06]       [Card 07]        [Card 08]    [Card 09]      [Card 10]    │
    ClaudeCode      Codex+CC         ClaudeCode   Codex+CC       ClaudeCode   │
                                                                               │
   ┌─ DETAIL PANEL (AnimatePresence) ─────────────────────────────────────┐    │
   │ Stage 06: Implementation                                              │    │
   │ AI: ClaudeCode (violet badge) | Mode: Plan + Sandbox                  │    │
   │ Description: Generates production code following implementation.yaml  │    │
   │ Input: refined_requirements.md | Output: src/                         │    │
   └──────────────────────────────────────────────────────────────────────┘    │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┤
```

**Implementation Notes**:
- Layout: CSS Grid 5-col x 2-row (desktop), 2-col (tablet), 1-col (mobile)
- Card: MagicCard, `bg-[#111827]`, `ring-1 ring-white/[0.06]`, `rounded-xl`
- Connectors: CSS/SVG dashed lines, desktop only, `aria-hidden="true"`
- Detail panel: AnimatePresence, slide from y:-10, 200ms
- Cards: `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`
- Badge colors: Claude=#8b5cf6, Gemini=#10b981, Codex=#f59e0b (text labels included)
- Stagger entrance: 100ms per card, triggerOnce
- Keyboard: Enter/Space toggle, Escape close panel

### Section 4: Features (~500px)

```text
 ──────────────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ FEATURES GRID ]                                                             │
                                                                               │
   H2: Why Conduct a Symphony?                                                 │
                                                                               │
   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
   │ [Icon: Pipeline]  │  │ [Icon: Brain]     │  │ [Icon: Agents]   │           │
   │ 10-Stage          │  │ Multi-AI          │  │ Sub-Agent        │           │
   │ Pipeline           │  │ Orchestration     │  │ System           │           │
   │ Complete lifecycle │  │ 3 providers,      │  │ 0% context       │           │
   │ from idea to      │  │ 4 roles, optimal  │  │ usage, 5 tier-1  │           │
   │ deployment.       │  │ model per task.   │  │ agents.          │           │
   │ [Badge: Core]     │  │ [Badge: Core]     │  │ [Badge: New]     │           │
   └──────────────────┘  └──────────────────┘  └──────────────────┘           │
   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
   │ [Icon: Memory]    │  │ [Icon: Sprint]    │  │ [Icon: Fork]     │           │
   │ Smart Context     │  │ Sprint Mode &     │  │ Pipeline         │           │
   │ Management         │  │ Loop-back         │  │ Forking          │           │
   │ HANDOFF system,   │  │ Iterative sprints │  │ Branch, compare, │           │
   │ auto-compression. │  │ with QA loop.     │  │ merge pipelines. │           │
   │ [Badge: Core]     │  │ [Badge: Core]     │  │ [Badge: New]     │           │
   └──────────────────┘  └──────────────────┘  └──────────────────┘           │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┤
```

**Implementation Notes**:
- Layout: CSS Grid `auto-fit minmax(350px, 1fr)`, 3-col desktop / 2-col tablet / 1-col mobile
- Card: MagicCard + BorderBeam, `bg-[#111827]`, `rounded-xl`, `p-6`
- Non-interactive cards (no button role, no click handler)
- Icons: Lucide React, `aria-hidden="true"`
- Stagger entrance: 100ms per card, IntersectionObserver threshold 0.2
- Hover: MagicCard radial gradient + translateY(-2px), 150ms transition

### Section 5: Metrics (~300px)

```text
 ──────────────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ METRICS ]                                                                   │
                                                                               │
    10                109+              <5ms               0%                   │
    Pipeline          Automated         Infrastructure     Context Usage        │
    Stages            Tests             Speed              (Sub-agents)         │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┤
```

**Implementation Notes**:
- Layout: Flex row (space-between), 4 items. Mobile: 2x2 grid
- Numbers: `text-5xl font-bold font-mono` with gradient text
- Labels: `text-xs font-medium text-[#94a3b8]`
- CountUp: ReactBits, triggers at IntersectionObserver threshold 0.5, 2s duration
- Final values in DOM at all times (CountUp is visual enhancement)
- Semantic markup: `<dl>` description list for metric pairs

### Section 6: CTA (~400px)

```text
 ──────────────────────────────────────────────────────────────────────────────┐
                                                                               │
 [ CTA ]                                                                       │
                                                                               │
           Start composing your next masterpiece.                              │
                                                                               │
           ┌───────────────────────────────────────────────┐                   │
           │ $ npx claude-symphony my-project              │ [COPY]            │
           └───────────────────────────────────────────────┘                   │
                                                                               │
           [====== Rainbow Button: Get Started ======]                         │
                                                                               │
           [GitHub Repo]    [Discord Community]                                │
                                                                               │
           [ RetroGrid background: aria-hidden="true" ]                        │
                                                                               │
 ──────────────────────────────────────────────────────────────────────────────┘
```

**Implementation Notes**:
- Layout: Flex column, centered
- Background: MagicUI RetroGrid, `aria-hidden="true"`
- Headline: AnimatedGradientText, `text-4xl font-bold`
- Button: MagicUI RainbowButton, `rounded-lg`
- Copy command: Same component as Hero
- Secondary links: Ghost style, add `py-3` on mobile for 44px touch target
- Fade-up entrance animation

---

## 2. Mobile Wireframes (375px)

### Hero (Mobile)

```text
 375px ───────────────────────┐
                              │
 [ HERO ]                     │
 [Logo]             [HamMenu] │
                              │
 H1: ORCHESTRATE              │
 YOUR ENTIRE                  │
 DEV LIFECYCLE                │
                              │
 Body: Autonomous agent       │
 pipeline from idea to        │
 deployment.                  │
                              │
 ┌──────────────────────────┐ │
 │ $ npx claude-symphony... │ │
 │ [COPY]                   │ │
 └──────────────────────────┘ │
                              │
 ┌──────────────────────────┐ │
 │ View on GitHub           │ │
 └──────────────────────────┘ │
                              │
 [ 20 particles, no mouse ]  │
                              │
 ─────────────────────────────┤
```

### Pipeline (Mobile)

```text
 375px ───────────────────────┐
                              │
 [ PIPELINE ]                 │
 H2: The Process              │
                              │
 ┌──────────────────────────┐ │
 │ 01 Brainstorm   [Gemini] │ │
 │ Parallel execution       │ │
 └──────────┬───────────────┘ │
            ↓                 │
 ┌──────────────────────────┐ │
 │ 02 Research     [Claude] │ │
 │ Deep investigation       │ │
 └──────────┬───────────────┘ │
            ↓                 │
 [ ... Single column stack ]  │
            ↓                 │
 ┌──────────────────────────┐ │
 │ 10 Deploy    [ClaudeCode]│ │
 │ CI/CD & deployment       │ │
 └──────────────────────────┘ │
                              │
 [ No CSS connectors ]       │
 [ Cards: name + AI badge ]  │
 [ Tap to expand detail ]    │
                              │
 ─────────────────────────────┤
```

### CTA (Mobile)

```text
 375px ───────────────────────┐
                              │
 [ CTA ]                      │
 Start composing.             │
                              │
 ┌──────────────────────────┐ │
 │ $ npx claude-symphony... │ │
 │ [COPY]                   │ │
 └──────────────────────────┘ │
                              │
 ┌──────────────────────────┐ │
 │ ═══ Get Started ═══      │ │
 └──────────────────────────┘ │
                              │
 ┌──────────────────────────┐ │
 │ GitHub (py-3 touch)      │ │
 └──────────────────────────┘ │
                              │
 ─────────────────────────────┘
```

---

## 3. Tablet Wireframes (768px)

### Pipeline (Tablet)

```text
 768px ────────────────────────────────────────────┐
                                                    │
 [ PIPELINE ]                                       │
 H2: The 10-Stage Symphony                          │
                                                    │
 ┌─────────────────┐  ┌─────────────────┐          │
 │ 01 Brainstorm    │  │ 02 Research      │          │
 │ [Gemini+CC]      │  │ [Claude]         │          │
 └─────────────────┘  └─────────────────┘          │
 ┌─────────────────┐  ┌─────────────────┐          │
 │ 03 Planning      │  │ 04 UI/UX         │          │
 │ [Gemini+CC]      │  │ [Gemini+CC]      │          │
 └─────────────────┘  └─────────────────┘          │
 ┌─────────────────┐  ┌─────────────────┐          │
 │ 05 Tasks         │  │ 06 Implement     │          │
 │ [ClaudeCode]     │  │ [ClaudeCode]     │          │
 └─────────────────┘  └─────────────────┘          │
 ┌─────────────────┐  ┌─────────────────┐          │
 │ 07 Refactor      │  │ 08 QA            │          │
 │ [Codex+CC]       │  │ [ClaudeCode]     │          │
 └─────────────────┘  └─────────────────┘          │
 ┌─────────────────┐  ┌─────────────────┐          │
 │ 09 Testing       │  │ 10 Deploy        │          │
 │ [Codex+CC]       │  │ [ClaudeCode]     │          │
 └─────────────────┘  └─────────────────┘          │
                                                    │
 [ No connectors, 2-column grid ]                   │
                                                    │
 ──────────────────────────────────────────────────┤
```

---

## 4. Issues & Fixes Applied in Synthesis

| # | Source | Issue | Resolution |
|---|--------|-------|------------|
| 1 | ClaudeCode | Muted text #64748b on card bg #111827 fails AA (3.2:1) | Use #708599 for muted text on cards, or restrict to bold/large text |
| 2 | ClaudeCode | Secondary CTA link touch target <44px on mobile | Apply `py-3` on mobile breakpoint |
| 3 | Gemini | Wireframe shows "Install CLI" button text | Updated to `$ npx claude-symphony my-project` per README |
| 4 | Gemini | Navigation bar shown in hero wireframe | Kept as optional; single-page sites may omit traditional nav |
| 5 | Both | Consistent on dark theme, AI color system, 6-section layout | High confidence in shared design direction |
