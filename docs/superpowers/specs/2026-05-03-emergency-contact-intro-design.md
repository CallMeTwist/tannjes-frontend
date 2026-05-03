# Emergency Contact Intro — Design Spec

**Date:** 2026-05-03
**Sub-project:** 1 of 3 (parent: emergency intro + team redesign + Laravel/Filament backend)
**Status:** Approved for implementation planning

## Goal

When a visitor first reaches the site (any route), surface the emergency phone number prominently before they engage with the marketing content, then keep it one tap away for the rest of the session. The site is for a private clinic; some visitors arrive *because they need urgent help*. The emergency affordance must be unmissable on arrival and reachable from any scroll position thereafter, while still feeling calm and premium — not alarming.

## Non-goals

- GeoIP-based emergency line routing
- More than the two existing phone numbers
- Analytics on call taps
- A/B testing splash variants
- Backend integration (sub-project 3 will swap the data source — this spec only ensures a single import point exists so that swap is a one-file change)

## Architecture

Two cooperating components mounted inside `SiteLayout` (so they apply to every route, not just `/`), coordinating through one `sessionStorage` flag. No new dependencies; uses the existing `framer-motion` already in the bundle.

```
SiteLayout
├── <EmergencySplash />          // session-gated full-viewport overlay
└── <EmergencyFloatingButton />  // always-visible bottom-right call button
```

## Components

### `EmergencySplash` — `src/components/site/EmergencySplash.tsx`

**Behavior**
- On mount: read `sessionStorage.getItem("tcl-emergency-splash-seen")`. If present, render nothing (early return).
- Otherwise: render a fixed-position full-viewport overlay at `z-[100]`.
- Auto-dismiss after 3000ms via `setTimeout`. Also dismisses on:
  - Tap of the "Continue to site" button
  - Tap of the primary phone link (after a brief delay so the `tel:` handoff occurs)
  - `Escape` key
- On dismiss: `sessionStorage.setItem("tcl-emergency-splash-seen", "1")`, then fade out (framer-motion `exit`, ~300ms), then unmount.

**Visuals**
- Background: `bg-brand-navy` solid, no texture overlay (we want focus, not decoration).
- Centered content stack:
  - Pink "Emergency" badge at top with a gentle infinite pulse animation (Tailwind `animate-pulse` is too fast/synthetic — use a custom `@keyframes` with ~2s duration, easing `ease-in-out`, scale 1 → 1.05 → 1, opacity 0.9 → 1 → 0.9).
  - Heading: "In an emergency?" — `font-display`, white, large.
  - Subtext: short reassuring line (e.g., "Our team is reachable 24/7. Tap to call now.") — white/80.
  - Primary number as a large `<a href="tel:...">` button — pink background, white text, full width on mobile, auto on desktop. Icon: `Phone` from `lucide-react`.
  - Secondary number below, smaller, also a `tel:` link, white/80 text.
  - "Continue to site" — text button, white/60, underline on hover. Smaller than the call CTA.
- Initial focus: the "Continue to site" button (so a sighted user pressing Enter doesn't accidentally trigger a call).

**Accessibility**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the heading.
- No focus trap (auto-dismisses; trapping would feel hostile if someone tab-navigates).
- `Escape` dismisses.
- Respects `prefers-reduced-motion`: pulse and fade are disabled, splash still appears and dismisses.

### `EmergencyFloatingButton` — `src/components/site/EmergencyFloatingButton.tsx`

**Behavior**
- Always mounted (no session gating). Renders an `<a href="tel:+2347019090013">` styled as a floating action button.
- Hidden when printing (`print:hidden`).

**Visuals**
- Fixed position, `z-50`.
- Desktop (`md:` and up): bottom-right at `bottom-6 right-6`. Pill shape with `Phone` icon + "Emergency" text label.
- Mobile (below `md:`): icon-only round button at `bottom-24 right-4` to clear the existing `MobileBookCTA` (which sits at the bottom edge on mobile).
- Background `bg-brand-pink`, hover deepens to `bg-brand-pink/90`.
- Subtle pulse ring: an absolutely-positioned sibling `<span>` with the same shape, `bg-brand-pink/40`, animating scale 1 → 1.4 + opacity 0.5 → 0 on a ~2s loop. Disabled under `prefers-reduced-motion`.

**Accessibility**
- Accessible name: "Emergency — call now" via `aria-label` (icon-only button on mobile still announces correctly).
- Focus ring: visible 2px white-on-pink outline.

### `src/lib/contact.ts` — extension

Add two phone constants alongside the existing email:
```ts
export const TCL_PHONE_PRIMARY = "+2347019090013";
export const TCL_PHONE_SECONDARY = "+2347086113160";
```
Both new components import from here. **The existing scattered hard-codes in Hero/Navbar/MobileBookCTA/Footer/Contact remain unchanged in this sub-project** — refactoring them is sub-project 3's job (it'll point them at the API). The point of putting these constants here now is so the *new* code lands in the right place from day one.

## Integration

`src/components/site/SiteLayout.tsx` mounts both components. They render after `children` so the splash overlays page content correctly and the floating button stacks above page content.

```tsx
<>
  {children}
  <EmergencySplash />
  <EmergencyFloatingButton />
</>
```

## Testing

- `EmergencySplash.test.tsx`
  - renders the dialog when sessionStorage flag is absent
  - renders nothing when flag is set
  - sets the flag and unmounts on Continue tap
  - sets the flag and unmounts on Escape press
  - primary CTA has correct `tel:` href
- `EmergencyFloatingButton.test.tsx`
  - renders an anchor with `href="tel:+2347019090013"`
  - has accessible name matching "emergency" (case-insensitive)

`sessionStorage` is provided by jsdom; clear it in a `beforeEach`.

## Risks

- **Stacking with `MobileBookCTA`** — the existing mobile CTA is at the bottom edge. The emergency button on mobile is offset upward to `bottom-24` to avoid overlap. Verify on a real viewport during implementation; adjust if visually crowded.
- **Splash on `/404`** — the catch-all `NotFound` route also wraps in `SiteLayout` (verify). If it doesn't, decide whether 404 visitors should see the splash. Default: yes, they're still potential patients.
- **Auto-dismiss + screen readers** — a 3s auto-dismiss may not give a screen reader user time to read the dialog. Mitigation: when `prefers-reduced-motion` is set, also extend the auto-dismiss to 8s. (Imperfect proxy for "user needs more time," but the best signal we have without a settings UI.)

## Out of scope (deferred)

- Pulling numbers from a backend (sub-project 3)
- Centralizing the existing scattered hard-codes (sub-project 3)
- Per-route customization (e.g., different message on `/contact`)
