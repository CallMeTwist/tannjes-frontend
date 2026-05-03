# Team Redesign — Design Spec

**Date:** 2026-05-03
**Sub-project:** 2 of 3 (parent: emergency intro + team redesign + Laravel/Filament backend)
**Status:** Approved for implementation planning

## Goal

Replace the current uniform team grid with two complementary surfaces:

1. A **refined home-page preview** — same 4-card grid, quieter and more premium, with an explicit link to the dedicated team page.
2. A **dedicated `/team` showcase slider** — full-viewport, asymmetric layout with a large active portrait, info pane, and thumbnail navigation. This is the centerpiece.

The team section should read as *world-class private hospital, not generic clinic* — calm, confident, premium, human-centered.

## Non-goals

- Per-doctor full profile pages (the "View profile" CTA is a placeholder for now)
- Department filters or search
- Backend-fed data (sub-project 3 will swap the data source)
- Scroll-driven parallax (premature; YAGNI)
- Autoplay (cheap-feeling and accessibility-hostile)
- New libraries — uses existing `framer-motion` only; no GSAP

## Architecture

```
src/components/site/
├── TeamPreview.tsx              // refined; used on Index.tsx (home)
└── team/
    ├── TeamSlider.tsx           // orchestrator + state; used on /team
    ├── DoctorCard.tsx           // active portrait + info pane
    └── ThumbnailNav.tsx         // bottom strip
```

`TeamSlider` owns `activeIndex` state. `DoctorCard` and `ThumbnailNav` are presentational and receive props (`members`, `activeIndex`, `onSelect`). The page (`src/pages/Team.tsx`) renders `<TeamSlider members={team} />` once. Both `TeamPreview` and `TeamSlider` consume the same `team` array from [src/data/team.ts](../../../src/data/team.ts), so sub-project 3's API swap is isolated to that single module.

## Components

### `TeamPreview` — home page preview (refined)

A quiet upgrade of the existing component, used on the home page only.

- Aspect ratio of card portrait: **3:4** (taller, more presence) — replaces the current `4:5`.
- Remove the `hover:-translate-y-1` micro-bounce. Keep the inner `group-hover:scale-105` on the image only.
- Hover shadow softens via `shadow-[0_8px_30px_-12px_rgba(11,27,51,0.15)]` — replaces the current `hover:shadow-xl`.
- Section padding: `py-24` (current `py-20`); card grid gap: `gap-8` (current `gap-6`).
- Heading + subtitle copy unchanged; card body structure unchanged (name / role / bio).
- The closing line `Meet the full team — coming soon.` is replaced with a routed CTA: `<Link to="/team" className="...">Meet the full team →</Link>`.
- Existing `texture-waves` background and pink blob remain.

No new dependencies; no behavior change beyond styling.

### `TeamSlider` — the `/team` centerpiece

**Layout — desktop (`md:` and up)**
- Section is `min-h-screen`, vertical padding `py-20 lg:py-28`, max width `max-w-7xl`, centered.
- Two-column grid: `grid-cols-12 gap-12`. Portrait column spans `5`, info column spans `7`. The asymmetry is intentional — perfectly even columns read generic.
- Below the grid: centered `ThumbnailNav` strip with vertical separation `mt-12`.
- Background: `bg-white` with `texture-waves opacity-60` overlay (same texture used by the current `TeamPreview`, for visual continuity across the site).

**Layout — mobile (below `md:`)**
- Single column, stacked: portrait on top (full width, capped at `max-h-[70vh]`), info pane below, thumbnail strip below that.
- Thumbnail strip becomes a horizontally-scrollable row with `scroll-snap-type: x mandatory` and `snap-center` on each item; no wrap.
- Swipe support on the portrait container: track `touchstart` / `touchend` x-coordinate; if delta > 60px, advance/rewind.

**Active doctor info pane (`DoctorCard` right side)**
- Eyebrow: `<p class="uppercase tracking-wider text-xs font-semibold text-brand-pink">{role}</p>`
- Name: `<h2 class="font-display text-4xl md:text-5xl font-bold text-brand-navy">{name}</h2>`
- Bio: `<p class="text-base leading-relaxed text-brand-slate max-w-prose">{bio}</p>` (2–3 lines today; the schema allows longer when the backend lands)
- Optional credentials line: only rendered if `member.credentials` is set (forward-compatible — schema in `team.ts` will gain optional `credentials?: string`)
- CTAs: primary "Book Appointment" linking to `/contact#book` in `bg-brand-pink`; secondary "View profile" rendered as a disabled-styled button with `aria-disabled="true"` and `title="Coming soon"` (no route exists yet — explicit placeholder rather than a dead link)

**Active doctor portrait (`DoctorCard` left side)**
- `aspect-[3/4]` container, `rounded-2xl`, `overflow-hidden`, `shadow-[0_30px_60px_-30px_rgba(11,27,51,0.25)]`.
- Image is `object-cover`, `loading="eager"` for the first member (above-fold) and `loading="lazy"` for the others.
- Skeleton: a `bg-slate-100` placeholder of the same aspect renders behind the image; the image's `onLoad` swaps in. Once images are cached, this is invisible.

**Animations (framer-motion)**
- Portrait swap: `initial={{opacity: 0, x: 24, scale: 0.96}}` → `animate={{opacity: 1, x: 0, scale: 1}}` over 350ms `ease-out`.
- Info-pane swap: same shape, delayed by 120ms (staggered).
- Use `AnimatePresence` with `mode="wait"` keyed on `activeIndex` so old content exits before new content enters.
- All motion is wrapped in a `motion-safe:` Tailwind variant via the `useReducedMotion` hook from framer-motion: when set, `transition` becomes `{duration: 0}`.

**Thumbnail navigation (`ThumbnailNav`)**
- One `<button>` per member. Inside each: a `40px`/`48px` circular avatar (rounded-full, `aspect-square`, `object-cover`).
- Active: full opacity, ring `ring-2 ring-brand-pink ring-offset-2`, slight scale `scale-110`. A small `2px` pink dot or 12px underline below the avatar marks active.
- Inactive: `opacity-60`, no ring. Hover scales up to `scale-105`.
- Each button gets `aria-current={isActive ? "true" : undefined}` and `aria-label="Show {member.name}"`.

**Keyboard + state**
- `useState<number>(0)` for `activeIndex` in `TeamSlider`.
- `useEffect` attaches a `keydown` listener on the section element (not `window`) so global keyboard shortcuts elsewhere aren't disturbed: `ArrowLeft` decrements, `ArrowRight` increments, both wrap.
- Click on a thumbnail sets the index directly.

**Empty state**
- If `members.length === 0`, render a small `<p>` saying "Team coming soon." and nothing else. Defensive against future API edge cases.

## Data flow + types

Existing `TeamMember` type in [src/data/team.ts](../../../src/data/team.ts) is extended with one optional field:

```ts
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string; // optional, rendered when present
};
```

No existing entries need to be modified — the field is optional. Nothing else changes. Both new components import the same `team` constant.

## Testing

- `TeamSlider.test.tsx`
  - renders the first member's name on initial render
  - clicking the second thumbnail updates the visible name to the second member
  - pressing `ArrowRight` advances; `ArrowLeft` rewinds; both wrap at the ends
  - `members=[]` renders "Team coming soon." and does not crash
- `ThumbnailNav.test.tsx`
  - renders one button per member
  - clicking a thumbnail calls `onSelect` with that index
  - the active button has `aria-current="true"`; inactive ones do not
- `DoctorCard.test.tsx`
  - renders the passed member's name, role, bio, and the primary CTA href `/contact#book`
- Animation timing is **not** asserted in tests — presence/absence and ARIA only.
- `framer-motion` works in jsdom but `AnimatePresence`'s exit lifecycle can be flaky; tests should query by visible content after each interaction without advancing fake timers (no timers in this component beyond framer-motion's internal scheduler).

## Risks

- **Slider feels sparse with 4 thumbnails.** Mitigation: generous gap between thumbnails and the asymmetric main layout carry the visual weight; thumbnails are decorative+navigational, not the focal point.
- **Mobile swipe vs. vertical scroll conflict.** Mitigation: only treat as a slider gesture when horizontal delta exceeds vertical delta and absolute horizontal delta > 60px; otherwise let the page scroll normally.
- **`AnimatePresence mode="wait"` blocks during a rapid double-click.** Acceptable; it just means the user has to wait ~350ms between switches. Better than overlapping animations.
- **Reduced-motion users see no animation but still need a clear "something changed" signal.** Mitigation: the active-thumbnail ring + name + portrait all change simultaneously — that's already a strong visual diff without motion.

## Out of scope (deferred)

- Per-doctor profile pages (`/team/<slug>`)
- Filtering by department / specialty
- Search
- Backend-fed data (sub-project 3)
- Parallax / scroll choreography
- Autoplay
