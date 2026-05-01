# Tannjes Clinics Limited — Frontend Redesign (Phase A)

**Date:** 2026-04-30
**Scope:** Frontend visual redesign only. Laravel backend (team / departments / appointment timetable CRUD) is Phase B and deferred until user signals to begin.

## 1. Goals

Transform the existing single-page marketing site for **Tannjes Clinics Limited (TCL)** into a premium, modern (2026-feel) healthcare site that:

- Communicates TCL's positioning as a **24/7 medical concierge** — not a generic clinic.
- Reflects the existing pink/magenta brand identity from TCL's physical banner, paired with deep navy and soft blush, to read distinctive and premium in a market of teal/blue clinic sites.
- Surpasses the Povital reference template in polish via subtle motion, generous whitespace, and human imagery.
- Keeps copy and contact details accurate to TCL's actual services and Abuja location.

## 2. Brand & Visual System

### Palette

| Token | Hex | Use |
|-------|-----|-----|
| `brand.pink` | `#E11D74` | Primary CTAs, accents, logo tint |
| `brand.pink-soft` | `#FFE4F0` | Section backgrounds, hover states |
| `brand.navy` | `#0B1B33` | Headings, body text, footer |
| `brand.slate` | `#475569` | Secondary text |
| `brand.cream` | `#FAF7F4` | Alternate section background |
| `brand.white` | `#FFFFFF` | Default surface |
| `brand.success` | `#10B981` | "Available now" pills, positive trust signals |

Tailwind config extended via `theme.extend.colors.brand.*`. Existing shadcn CSS variables (`--primary`, etc.) remapped to pink.

### Typography

- Headings: **Plus Jakarta Sans** (700/800) — modern, slightly geometric, premium feel.
- Body: **Inter** (400/500/600) — neutral, high legibility.
- Loaded via Google Fonts in `index.html` with `display=swap` and preconnect.

### Motion

Framer Motion for:
- Section reveal on scroll (fade + 16px translate-y, stagger 0.08s).
- Hero gradient blob (slow infinite morph).
- Animated stat counters (count-up on viewport enter).
- Card hover lifts (Tailwind transitions are sufficient — no FM needed).
- Testimonials carousel transitions.

`prefers-reduced-motion` disables all of the above.

## 3. Page Structure (Index.tsx)

Section order in `pages/Index.tsx`:

1. `<Navbar />` — sticky, transparent on top, solid white + shadow on scroll. Right-side pink "Book Appointment" CTA.
2. `<Hero />` — split layout (see §4).
3. `<StatsStrip />` *(NEW)* — 4 animated counters, full-width navy band with subtle pink accents.
4. `<About />` — two-column: image left, mission + core values right; core values as 4 small icon chips (Compassion, Innovation, Trust, Extraordinary Care).
5. `<Services />` — 7 service cards in 3-column grid (last row has 1 card centered or layout adjusts to 4-3 split). Card: pink-tinted icon, title, 2-line description, "Learn more →" affordance.
6. `<Departments />` *(rebuilt from existing `Specialties.tsx`)* — 16 specialty tiles (4×4 grid on desktop, 2-col on mobile), each with medical icon + name. Hover: pink ring + slight lift.
7. `<AppointmentStrip />` *(NEW)* — full-width pink band, headline "Book a doctor in under 60 seconds", inline mini-form (Name, Phone, Service select, Submit). Submit triggers two side-by-side buttons: **WhatsApp** (opens `wa.me/2347019090013` with prefilled message) and **Email** (opens `mailto:tannjes03@gmail.com` with prefilled body).
8. `<WhyChoose />` — 4 reasons in alternating image+text rows (zig-zag) for visual rhythm.
9. `<HowItWorks />` — 3-step numbered timeline with a connecting dashed line on desktop, vertical on mobile.
10. `<Testimonials />` — carousel (Embla, already in deps) with patient quote, star rating, name, condition. 3-5 placeholder testimonials.
11. `<TeamPreview />` *(NEW)* — 4 doctor cards (photo, name, specialty, short bio). "Meet the full team →" link (currently anchor; Phase B makes dynamic).
12. `<Contact />` — two-column: contact details + Google Maps embed (Prince and Princess Estate, Kaura, Abuja) on left; contact form on right with same WhatsApp/Email dual-button submit pattern.
13. `<Footer />` — 4 columns: brand+tagline+RC number / Quick Links / Services / Contact, with a bottom strip for copyright and socials (placeholder icons).

## 4. Hero Section (Detailed)

Split 60/40 desktop, stacked on mobile.

**Left (60%):**
- Eyebrow pill: pink dot + "Medical Concierge 24/7"
- H1 (Plus Jakarta Sans 800, ~clamp(2.5rem, 5vw, 4.5rem)): **"Your health, your call."**
- Subhead (~18px, slate): "Compassionate, expert medical care delivered to your home, hotel, or place of work — anywhere in Abuja, anytime."
- Two CTAs: primary pink "Book a Doctor" (scrolls to AppointmentStrip), secondary outline "Call +234 701 909 0013" (`tel:` link).
- Trust row: small pills — "RC: 1355314" • "24/7 Availability" • "Licensed Physicians".

**Right (40%):**
- Doctor portrait (warm-toned, African/Nigerian where possible) in a rounded-3xl frame.
- Floating glass card overlay (top-right, slight rotate): icon + "24/7 Medical Concierge" + green "Next available: Today" pill.
- Floating stat card (bottom-left): "16+ Specialties" with a small grid of dots.
- Behind the image: animated pink/blush gradient blob (Framer Motion, 12s morph cycle).

## 5. Component Layout

```
src/
  components/
    site/
      Navbar.tsx           (rebuilt — sticky behavior)
      Hero.tsx             (rebuilt — split + glass cards)
      StatsStrip.tsx       NEW
      About.tsx            (rebuilt — two-column)
      Services.tsx         (rebuilt — card grid)
      Departments.tsx      NEW (replaces Specialties.tsx; old file deleted)
      AppointmentStrip.tsx NEW
      WhyChoose.tsx        (rebuilt — zig-zag rows)
      HowItWorks.tsx       (rebuilt — timeline)
      Testimonials.tsx     (rebuilt — Embla carousel)
      TeamPreview.tsx      NEW
      Contact.tsx          (rebuilt — map + form)
      Footer.tsx           (rebuilt — 4-column)
    shared/
      SectionHeading.tsx   NEW (eyebrow + h2 + subhead, used by most sections)
      Reveal.tsx           NEW (Framer Motion wrapper for scroll reveal)
      Counter.tsx          NEW (count-up on viewport enter)
  data/
    services.ts            NEW (7 services with icon name, title, desc)
    specialties.ts         NEW (16 medical specialties)
    team.ts                NEW (4 placeholder doctors)
    testimonials.ts        NEW (3-5 testimonials)
    stats.ts               NEW (4 stat entries)
  lib/
    contact.ts             NEW (helpers: buildWhatsAppUrl, buildMailtoUrl)
public/
  images/
    hero/doctor.jpg
    about/mission.jpg
    why/*.jpg              (4 images)
    team/*.jpg             (4 images)
    testimonials/*.jpg     (3-5 avatars)
```

## 6. Data & Content

All content lives in typed modules under `src/data/` so it's trivial to swap to API-driven data in Phase B without component rewrites. Each module exports a typed array; components consume via `import { services } from "@/data/services"`.

Phase B will replace these imports with React Query hooks hitting the Laravel API. The component contracts stay identical.

## 7. Forms (Phase A behavior)

No backend exists. Both forms (`AppointmentStrip` and `Contact`) collect inputs into local state and on submit show two side-by-side buttons:

- **Send via WhatsApp** — opens `https://wa.me/2347019090013?text=<urlencoded prefilled message>` in new tab.
- **Send via Email** — opens `mailto:tannjes03@gmail.com?subject=...&body=<urlencoded prefilled message>`.

Validation: required name + phone (E.164-ish regex) + service. Use existing `react-hook-form` + `zod` (already in deps). Show inline shadcn `<FormMessage>` errors.

## 8. Imagery

Curated set from Unsplash, downloaded to `public/images/` (not hot-linked). Selection criteria: warm clinical tone, African/Nigerian representation where feasible, consistent color grading. ~10–15 images total, each compressed to ≤200KB (use sharp/squoosh manually before committing). Filenames are descriptive and stable.

## 9. Accessibility

- Color contrast: pink on white verified ≥ 4.5:1 for text (use `#C71585`-ish for body-on-white if `#E11D74` fails AA at small sizes).
- All interactive elements keyboard-reachable; visible focus rings (pink, 2px offset).
- All images have meaningful `alt` text or `alt=""` for decorative.
- Form inputs have associated `<label>`s.
- Carousel announces slide changes via `aria-live="polite"`.
- `prefers-reduced-motion` honored throughout.
- Heading hierarchy: one `<h1>` (hero), `<h2>` per section.

## 10. Testing

Vitest + Testing Library. Tests scoped to logic, not visual layout:

- `lib/contact.test.ts` — `buildWhatsAppUrl` and `buildMailtoUrl` produce correctly URL-encoded strings for representative inputs.
- `components/site/AppointmentStrip.test.tsx` — form validation: missing required fields blocks submit; valid input enables both action buttons; buttons have correct `href`.
- `components/site/Contact.test.tsx` — same pattern as AppointmentStrip.
- `components/shared/Counter.test.tsx` — counts up to target when intersection observed; stops at target.

No snapshot tests for visual sections (brittle, low value).

## 11. Performance

- All images: explicit `width`/`height`, `loading="lazy"` except hero, `decoding="async"`.
- Framer Motion imported per-component (tree-shakeable).
- Google Fonts: preconnect + `display=swap`.
- Target: Lighthouse Performance ≥ 90 on desktop, ≥ 80 on mobile.

## 12. Out of Scope (Phase A)

- Laravel backend, API contracts, admin panel.
- Real appointment scheduling (calendar slots, availability checks).
- CMS for team/departments — content stays in `src/data/*.ts`.
- Multi-language support.
- Blog / news.
- Patient portal / login.

## 13. Deliverables

- All new and rebuilt components implemented and rendering correctly.
- Index.tsx composes the new section order.
- Tailwind theme extended with brand tokens.
- Fonts loaded.
- Images downloaded into `public/images/`.
- Tests in §10 written and passing (`npm run test`).
- Lint clean (`npm run lint`).
- Production build succeeds (`npm run build`).
- README updated with a brief "Phase A complete; Phase B pending" note.
