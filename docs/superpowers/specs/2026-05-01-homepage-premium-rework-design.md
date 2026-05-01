# Homepage Premium Rework — Design

**Date:** 2026-05-01
**Status:** Approved (verbal) — pending written-spec review
**Scope:** Rework 3 homepage sections to premium standard. Hero, About, Services, HowItWorks, FacilitiesTeaser, TeamPreview, AppointmentStrip remain untouched.

## Goals

- Lift the homepage from "polished template" toward Mayo-Clinic-class healthcare marketing.
- Restrained, trust-first design: clarity over creativity, every visual element earns its place.
- Honor the existing brand system (rose/navy palette, Outfit/Figtree, custom CSS textures).
- Add no new npm dependencies (`framer-motion` and `lottie-react` already installed).

## Non-Goals

- Not changing Hero, About, Services, HowItWorks, FacilitiesTeaser, TeamPreview, or AppointmentStrip.
- Not introducing new content or claims (no fabricated certifications, partner logos, etc.).
- Not restructuring the section order in `pages/Index.tsx`.
- Not refactoring data modules (`src/data/stats.ts`, `src/data/testimonials.ts`).

## Sections in Scope

1. `src/components/site/StatsStrip.tsx` — rebuild
2. `src/components/site/WhyChoose.tsx` — rebuild
3. `src/components/site/Testimonials.tsx` — rebuild

---

## Section 1 — StatsStrip → "Trust Band"

**Current:** flat 4-column counter grid on navy with `texture-cross-light` and `texture-hatch`.

**New:**

- Same 4 stats from `src/data/stats.ts`, no content changes.
- Adds an eyebrow line above counters ("Trusted across Abuja since 2019" — or equivalent line already supported by site copy; final string TBD with user during implementation, but bounded to existing facts on site).
- Adds a thin reassurance pill row under counters: three short pills sourced from existing site facts — `RC: 1355314`, `Licensed Physicians`, `24/7 Concierge`.
- Wraps each counter in a glass tile: `bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-sm rounded-2xl`, with a 1px brand-pink underline accent revealed on scroll-in.
- React Bits `Beams` background layered *under* the existing `texture-cross-light`, ~15% opacity, slow (~60s sweep), navy-toned.
- Section padding: `py-12` → `py-16 md:py-20`.
- Counter stagger: 50ms between tiles via framer-motion.

**Files:**
- Rewrite: `src/components/site/StatsStrip.tsx`
- New: `src/components/bits/Beams.tsx` (canvas-based, IntersectionObserver-gated, respects `prefers-reduced-motion`)

---

## Section 2 — WhyChoose → "Concierge Advantage" Bento

**Current:** four full-width alternating image/text rows.

**New:**

- Same 4 reasons (hardcoded array stays inside component, same titles/body/points).
- Same `SectionHeading` (eyebrow "Why Tannjes", title "The concierge advantage.").
- Bento grid layout:
  - Row 1: large card 2/3 (reason 1) + small card 1/3 (reason 2)
  - Row 2: small card 1/3 (reason 4) + large card 2/3 (reason 3)
  - Single column on `<md`.
- **Large cards:** photo on one side (asymmetric, ~50% of card), copy on the other; `rounded-3xl`; subtle shadow; 4px brand-pink edge accent on photo side.
- **Small cards:** photo replaced with a Lottie accent (~80×80) at top; title/body/points below.
- **Lottie placements:**
  - Small card 1 (reason 2 — Compassion): `heartbeat.json`
  - Small card 2 (reason 4 — Trusted/Licensed): `shield-check.json`
- Background: keep current cream + `texture-dots` + pink blur blob. No React Bits.
- Motion: existing `Reveal` wrapper retained; cards stagger 80ms; hover lifts cards `1.005` scale + softer shadow.

**Files:**
- Rewrite: `src/components/site/WhyChoose.tsx`
- New: `src/assets/lottie/heartbeat.json` (sourced from LottieFiles, ≤15KB)
- New: `src/assets/lottie/shield-check.json` (sourced from LottieFiles, ≤15KB)
- New: `src/components/shared/LottieAccent.tsx`

---

## Section 3 — Testimonials → "Featured + Supporting"

**Current:** 3-up embla carousel of plain white cards.

**New:**

- Same data source (`src/data/testimonials.ts`), no content changes.
- Desktop layout: featured testimonial (60%) on the left + vertical stack of 2 supporting cards (40%) on the right; carousel arrows page through the remaining testimonials in the right column.
- Featured testimonial: large pull-quote in `font-display`, 5-star row, prominent avatar + name + condition, decorative quote-mark glyph behind text in brand-pink at low opacity.
- Mobile: collapses to single-column. Featured-styled top card + carousel beneath (closer to current).
- React Bits `Aurora` background: very soft pink/sky wash ~10% opacity, layered *under* the existing `texture-dots-pink`. `bg-brand-cream` stays as base.
- Motion: featured fades up over 600ms; supporting cards stagger.

**Files:**
- Rewrite: `src/components/site/Testimonials.tsx`
- New: `src/components/bits/Aurora.tsx` (canvas-based, IntersectionObserver-gated, reduced-motion respected)

---

## Cross-Cutting Components

### `src/components/shared/LottieAccent.tsx`
Wraps `lottie-react`. Behavior:
- Accepts a JSON path (dynamic import via `import()` so payloads are code-split).
- Wraps in `React.Suspense` with a static first-frame SVG-style placeholder (transparent box at intended size) so layout never shifts.
- On `useReducedMotion()` returning true, freezes on frame 0 (no animation).
- `aria-hidden="true"` always — Lotties are decorative.
- Lazy loads via IntersectionObserver: animation does not play until visible.

### `src/components/bits/Beams.tsx` and `src/components/bits/Aurora.tsx`
React Bits ports (single-file, no new npm dependency):
- Canvas-based with `requestAnimationFrame`.
- IntersectionObserver gate: only animates when ≥1px on screen.
- `useReducedMotion()` short-circuits to a static gradient.
- Resize-aware via `ResizeObserver`.
- `aria-hidden="true"`.
- Color palette piped from CSS variables (`hsl(var(--primary))`, `hsl(var(--sky))`, brand-navy hex constants) so the bits respect the design system.

---

## Performance Budget

- Combined new Lottie JSON: ≤30KB raw, ≤10KB gzipped.
- New components add ≤8KB JS gzipped on top of existing bundle.
- No layout shift introduced (Lottie containers have intrinsic sizing).
- Backgrounds animate only when in viewport.

## Accessibility

- All Lottie and React Bits backgrounds `aria-hidden="true"`.
- All animations short-circuited under `prefers-reduced-motion: reduce`.
- Color contrast preserved on navy + glass tiles (white text on navy stays AA+).
- Keyboard navigation in Testimonials carousel preserved (existing prev/next buttons retained).

## Testing

- Manual: dev server, walk all three sections at desktop / tablet / mobile breakpoints.
- Verify reduced-motion: macOS/Windows accessibility setting toggled, confirm static states.
- Verify in-viewport gating: scroll past sections, watch DevTools Performance, confirm RAF stops when offscreen.
- Existing test infra (Vitest + RTL) unchanged; no new tests required for visual changes (visual regression isn't set up). If any extracted helper is added, add a unit test.

## Risks & Mitigations

- **Lottie file size creep:** strict 15KB-per-file budget; reject any LottieFile asset over budget at selection time.
- **React Bits canvas perf on low-end mobile:** IntersectionObserver gate + reduced-motion path; set canvas DPI cap at 1.5×.
- **Brand drift:** all colors flow through existing CSS variables; no hardcoded hex except brand-navy constants already used elsewhere.
- **Hero untouched per user decision:** confirmed C1 — no Lottie added to Hero.

## Open Items for Implementation Stage

- Exact LottieFiles URLs for `heartbeat.json` and `shield-check.json` (proposed during implementation, user downloads, drops in `src/assets/lottie/`).
- Final eyebrow string for StatsStrip (will draw from existing site copy).
- Final selection of which testimonial is "featured" (likely first entry in `data/testimonials.ts` unless user specifies).
