# HANDOFF - Stage 02: Research → Stage 03: Planning

> Generated: 2026-01-30
> From: 02-research
> To: 03-planning

---

## Completed Tasks
- [x] Tech stack validation (Next.js 15, Tailwind CSS v4, motion/react, GSAP)
- [x] MagicUI component research (all 10 components: dependencies, APIs, gotchas, CSS requirements)
- [x] ReactBits component research (SplitText via GSAP, CountUp via motion/react)
- [x] GSAP SplitText license verification (NOW FREE — Webflow acquisition)
- [x] motion vs framer-motion compatibility research (must use `motion` for React 19)
- [x] Bundle size estimation (~125-145KB gzip, within 150KB target)
- [x] Performance benchmarks research (Lighthouse targets validated)
- [x] Competitor deep dive (5 competitors: LangChain, AutoGPT, Vercel AI SDK, Cursor, CrewAI)
- [x] Market positioning analysis
- [x] Browser compatibility assessment
- [x] Feasibility report with risk mitigation plan
- [x] Technology stack comparison analysis
- [x] tech_research.md written
- [x] market_analysis.md written
- [x] feasibility_report.md written

## Key Decisions

### D-R1: Use `motion` package (NOT `framer-motion`)
- **Reason**: `framer-motion` has known incompatibilities with React 19 / Next.js 15
- **Action**: Install `motion`, import from `motion/react`
- **Impact**: All MagicUI components already use `motion/react` imports

### D-R2: GSAP SplitText for Hero Text Animation
- **Reason**: GSAP SplitText is now free (Webflow acquisition), superior text-splitting capabilities
- **Trade-off**: Adds ~15-20KB to bundle, but enables chars/words/lines splitting
- **Fallback**: If bundle exceeds budget, replace with motion-based word stagger

### D-R3: Two Animation Libraries (motion + GSAP)
- **Reason**: motion for general animations, GSAP only for SplitText in Hero
- **Risk**: LOW — isolated usage, clear separation
- **Bundle impact**: ~20-25KB (motion) + ~15-20KB (GSAP) = ~35-45KB total

### D-R4: Tailwind CSS v4 Configuration
- **Reason**: Next.js 15 defaults to Tailwind v4 with `@theme inline {}` blocks
- **No `tailwind.config.ts`** — all config in CSS files
- **Impact**: Keyframe animations defined in globals.css `@theme` block

### D-R5: Rainbow Button Extra Dependencies
- **Requires**: `@radix-ui/react-slot` + `class-variance-authority`
- **Reason**: MagicUI rainbow-button uses cva variants and Radix Slot for composition
- **Impact**: Small additional bundle cost (~3KB)

## Successful Approaches
- MagicUI component source code found via GitHub registry JSON files (`apps/www/public/r/*.json`)
- `gh api` + base64 decode for extracting component TypeScript source
- Background agents for parallel research (MagicUI docs + ReactBits research)
- Exa Search MCP as fallback when Context7 quota exceeded

## Failed/Blocked Approaches
- Context7 MCP quota exceeded — fell back to Exa Search + WebSearch
- Raw GitHub URLs returned 404 for MagicUI components — registry JSON format instead

## Modified Files
- `stages/02-research/outputs/tech_research.md` (created)
- `stages/02-research/outputs/market_analysis.md` (created)
- `stages/02-research/outputs/feasibility_report.md` (created)
- `stages/02-research/HANDOFF.md` (this file)

## Critical Technical Findings

### Complete npm Dependency List
```bash
npm install motion gsap @gsap/react clsx tailwind-merge @radix-ui/react-slot class-variance-authority lucide-react
```

### MagicUI Component Dependency Map
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
- **Total target**: <150KB gzip
- **Estimated**: 125-145KB gzip
- **Initial load (above fold)**: ~100KB (Hero + QuickStart)
- **Lazy loaded (below fold)**: ~26KB (Pipeline, Features, Metrics, CTA)

### Browser Compatibility Floor
- Chrome 116+, Firefox 122+, Safari 17.2+
- Acceptable for developer-focused audience

## Immediate Next Steps for Stage 03 (Planning)
1. **Architecture design**: Component hierarchy, data flow, section composition
2. **Sprint planning**: Break 6 sections into implementable tasks
3. **Responsive strategy**: Define 3 breakpoints (mobile/tablet/desktop) with wireframes
4. **Performance strategy**: Define dynamic import boundaries, code-splitting points
5. **Accessibility plan**: Reduced-motion fallbacks, semantic HTML, keyboard navigation
6. **Data model**: Define TypeScript interfaces for stages, features, metrics

## AI Call Log
| AI | Call Time | Prompt | Result | Status |
|----|-----------|--------|--------|--------|
| Claude | 2026-01-30 | Research Stage 02 | tech_research.md | Success |
| Claude (Agent) | 2026-01-30 | MagicUI component docs research | Full component report | Success |
| Claude (Agent) | 2026-01-30 | ReactBits + GSAP + motion research | Full compatibility report | Success |
| Exa Search | 2026-01-30 | Next.js 15 dynamic imports | API documentation | Success |
| Exa Search | 2026-01-30 | Framer Motion bundle size | Tree-shaking guide | Success |
| WebSearch | 2026-01-30 | Tailwind v4 configuration | @theme inline docs | Success |
| WebSearch | 2026-01-30 | GSAP SplitText license | Now free (Webflow) | Success |

## Pending Issues
- `website/` project has `framer-motion` installed — must replace with `motion` in Stage 06
- Keyframe animations not yet added to globals.css — implementation task
- MagicUI component source code fetched but not yet saved to files — implementation task

## Recovery Instructions
1. Read `stages/02-research/outputs/tech_research.md` for technical details
2. Read `stages/02-research/outputs/market_analysis.md` for competitive positioning
3. Read `stages/02-research/outputs/feasibility_report.md` for risk assessment
4. Read `stages/01-brainstorm/outputs/decisions.md` for brainstorm decisions
5. Proceed to Stage 03: Planning with architecture design
