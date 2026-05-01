# Tannjes Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the TCL marketing site as a premium, modern healthcare site with a split hero, animated stats, restructured sections, and pink/navy brand identity. Phase A only — no backend.

**Architecture:** React 18 + Vite + TypeScript + Tailwind + shadcn/ui (existing stack). Add Framer Motion for scroll reveals, animated counters, and hero blob. Section components live in `src/components/site/`, shared primitives in `src/components/shared/`, content in typed modules under `src/data/` so Phase B can swap to API-driven data without touching components.

**Tech Stack:** React, TypeScript, Tailwind, shadcn/ui, Framer Motion, Embla Carousel (existing), react-hook-form + zod (existing), Vitest + Testing Library.

**Reference spec:** `docs/superpowers/specs/2026-04-30-tannjes-frontend-redesign-design.md`

---

## File Structure

**New files:**
- `src/components/shared/Reveal.tsx` — Framer Motion scroll-reveal wrapper
- `src/components/shared/SectionHeading.tsx` — eyebrow + h2 + subhead
- `src/components/shared/Counter.tsx` — count-up animation
- `src/components/site/StatsStrip.tsx`
- `src/components/site/Departments.tsx` (replaces `Specialties.tsx`)
- `src/components/site/AppointmentStrip.tsx`
- `src/components/site/TeamPreview.tsx`
- `src/data/services.ts`
- `src/data/specialties.ts`
- `src/data/team.ts`
- `src/data/testimonials.ts`
- `src/data/stats.ts`
- `src/lib/contact.ts`
- Tests for `contact.ts`, `Counter.tsx`, `AppointmentStrip.tsx`, `Contact.tsx`

**Modified:**
- `tailwind.config.ts` — brand color tokens, font families
- `src/index.css` — CSS variables remapped to pink primary
- `index.html` — Google Fonts preconnect + link
- `package.json` — add `framer-motion`
- `src/components/site/*.tsx` — all rebuilt
- `src/pages/Index.tsx` — new section order
- `src/components/site/Specialties.tsx` — DELETED (replaced by Departments)

**Assets added:** `public/images/{hero,about,why,team,testimonials}/*.jpg`

---

## Task 1: Install framer-motion

**Files:** `package.json`, `package-lock.json`

- [ ] **Step 1: Install dependency**

Run: `npm install framer-motion@^11.11.0`
Expected: package added, lockfile updated, no errors.

- [ ] **Step 2: Verify install**

Run: `npm ls framer-motion`
Expected: prints `framer-motion@11.x.x` with no warnings about unmet peers.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion for redesign motion system"
```

---

## Task 2: Brand theme tokens & fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Add Google Fonts to `index.html`**

In the `<head>` of `index.html`, add (after existing meta tags, before any existing stylesheet/script):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Extend Tailwind theme**

In `tailwind.config.ts`, inside `theme.extend`, add:

```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
},
colors: {
  // ...keep existing mapping to CSS vars...
  brand: {
    pink: '#E11D74',
    'pink-soft': '#FFE4F0',
    'pink-deep': '#B01560',
    navy: '#0B1B33',
    slate: '#475569',
    cream: '#FAF7F4',
    success: '#10B981',
  },
},
```

Keep all existing keys in `theme.extend.colors` unchanged — only add the `brand` block.

- [ ] **Step 3: Remap shadcn CSS variables in `src/index.css`**

In `:root` change `--primary` and related to pink, and update `--ring`:

```css
--primary: 330 75% 50%;          /* pink ~#E11D74 */
--primary-foreground: 0 0% 100%;
--ring: 330 75% 50%;
--secondary: 213 67% 12%;        /* deep navy */
--secondary-foreground: 0 0% 100%;
```

Apply analogous values inside `.dark { ... }` block (keep `--primary` pink there too; tweak foregrounds as needed for legibility).

In the `body` selector (or `@layer base`), set base font:

```css
body { font-family: 'Inter', system-ui, sans-serif; color: #0B1B33; }
h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds with no Tailwind errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/index.css index.html
git commit -m "feat(theme): add TCL brand tokens and premium fonts"
```

---

## Task 3: Shared `Reveal` component

**Files:**
- Create: `src/components/shared/Reveal.tsx`

- [ ] **Step 1: Implement Reveal**

```tsx
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors related to Reveal.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/Reveal.tsx
git commit -m "feat(shared): add Reveal motion wrapper"
```

---

## Task 4: Shared `SectionHeading` component

**Files:**
- Create: `src/components/shared/SectionHeading.tsx`

- [ ] **Step 1: Implement**

```tsx
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pink">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold text-brand-navy sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/shared/SectionHeading.tsx
git commit -m "feat(shared): add SectionHeading"
```

---

## Task 5: Shared `Counter` component (TDD)

**Files:**
- Create: `src/components/shared/Counter.tsx`
- Create: `src/components/shared/Counter.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/shared/Counter.test.tsx
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Counter } from "./Counter";

class MockIO {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
  observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  disconnect() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null; rootMargin = ""; thresholds = [];
}

describe("Counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;
  });

  it("counts up to target when in view", async () => {
    render(<Counter to={100} duration={1000} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    await act(async () => { vi.advanceTimersByTime(1100); });
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect fail**

Run: `npx vitest run src/components/shared/Counter.test.tsx`
Expected: FAIL — Counter not found.

- [ ] **Step 3: Implement Counter**

```tsx
// src/components/shared/Counter.tsx
import { useEffect, useRef, useState } from "react";

type Props = { to: number; duration?: number; suffix?: string; prefix?: string };

export function Counter({ to, duration = 1500, suffix = "", prefix = "" }: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}
```

- [ ] **Step 4: Run — expect pass**

Run: `npx vitest run src/components/shared/Counter.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/Counter.tsx src/components/shared/Counter.test.tsx
git commit -m "feat(shared): add animated Counter"
```

---

## Task 6: Contact lib (TDD)

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/lib/contact.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// src/lib/contact.test.ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl, buildMailtoUrl, TCL_WHATSAPP_NUMBER, TCL_EMAIL } from "./contact";

describe("buildWhatsAppUrl", () => {
  it("uses the TCL WhatsApp number and url-encodes the message", () => {
    const url = buildWhatsAppUrl("Hello & welcome");
    expect(url).toBe(`https://wa.me/${TCL_WHATSAPP_NUMBER}?text=Hello%20%26%20welcome`);
  });
});

describe("buildMailtoUrl", () => {
  it("builds a mailto with subject and body url-encoded", () => {
    const url = buildMailtoUrl({ subject: "Booking request", body: "Name: Ada\nPhone: +234..." });
    expect(url).toBe(`mailto:${TCL_EMAIL}?subject=Booking%20request&body=Name%3A%20Ada%0APhone%3A%20%2B234...`);
  });
});
```

- [ ] **Step 2: Run — expect fail**

Run: `npx vitest run src/lib/contact.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```ts
// src/lib/contact.ts
export const TCL_WHATSAPP_NUMBER = "2347019090013";
export const TCL_EMAIL = "tannjes03@gmail.com";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TCL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl({ subject, body }: { subject: string; body: string }): string {
  return `mailto:${TCL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run — expect pass**

Run: `npx vitest run src/lib/contact.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/contact.ts src/lib/contact.test.ts
git commit -m "feat(lib): contact url builders"
```

---

## Task 7: Data modules

**Files:**
- Create: `src/data/services.ts`, `src/data/specialties.ts`, `src/data/team.ts`, `src/data/testimonials.ts`, `src/data/stats.ts`

- [ ] **Step 1: Create `src/data/services.ts`**

```ts
import type { LucideIcon } from "lucide-react";
import { Stethoscope, HeartPulse, Home, HandHeart, Syringe, Plane, Baby } from "lucide-react";

export type Service = { slug: string; title: string; description: string; icon: LucideIcon; bullets: string[] };

export const services: Service[] = [
  {
    slug: "doctor-at-home",
    title: "Doctor at Home, Hotel, or Workplace",
    description: "Personalized medical care delivered to your doorstep — anywhere in Abuja.",
    icon: Stethoscope,
    bullets: ["Home, office and hotel visits", "Routine screening referrals", "Lifestyle and nutrition counselling"],
  },
  {
    slug: "geriatrics",
    title: "Geriatrics Care (Elderly Comfort)",
    description: "Dignified, compassionate care for elderly loved ones and their families.",
    icon: HeartPulse,
    bullets: ["General medical and surgical care", "Incontinence and neurological support", "Stabilization and daily living assistance"],
  },
  {
    slug: "hospital-to-home",
    title: "Hospital to Home Care",
    description: "Smooth transition from hospital discharge to recovery at home.",
    icon: Home,
    bullets: ["Post-surgery and chronic illness care", "Family and physician coordination", "Goal-oriented recovery support"],
  },
  {
    slug: "palliative",
    title: "Palliative Care",
    description: "Holistic comfort and quality-of-life care for patients with serious illness.",
    icon: HandHeart,
    bullets: ["Pain management and feeding assistance", "Psychological and emotional support", "Daily living and family support"],
  },
  {
    slug: "skilled-nursing",
    title: "Skilled Nursing",
    description: "Post-operative and post-hospitalization nursing by trained professionals.",
    icon: Syringe,
    bullets: ["High-level surgical and custodial care", "NGT/PEG nutrition therapy", "Wound, tracheostomy and colostomy care"],
  },
  {
    slug: "medical-escort",
    title: "Medical Escort Services",
    description: "Safe, professional medical travel — by land or air, anywhere needed.",
    icon: Plane,
    bullets: ["Land and air medical concierge", "Medical evacuation support", "Network of partner hospitals nationwide"],
  },
  {
    slug: "newborn-caregiver",
    title: "Newborn & Caregiver Training",
    description: "Hands-on training for new parents and caregivers to care with confidence.",
    icon: Baby,
    bullets: ["Bathing, feeding and skin care", "Medication and wound care", "NGT/PEG handling and home safety"],
  },
];
```

- [ ] **Step 2: Create `src/data/specialties.ts`**

```ts
import type { LucideIcon } from "lucide-react";
import { Stethoscope, Scissors, Brain, Droplets, Activity, Baby, Wind, Pill, Microscope, ScanLine, HeartPulse, Smile, Ear, Flower, FlaskConical, BookHeart } from "lucide-react";

export type Specialty = { name: string; icon: LucideIcon };

export const specialties: Specialty[] = [
  { name: "General Medicine", icon: Stethoscope },
  { name: "General Surgery", icon: Scissors },
  { name: "Neurology", icon: Brain },
  { name: "Haematology", icon: Droplets },
  { name: "Endocrinology", icon: Activity },
  { name: "Paediatrics", icon: Baby },
  { name: "Urology", icon: Wind },
  { name: "Nephrology", icon: HeartPulse },
  { name: "Gastroenterology", icon: Pill },
  { name: "Dermatology", icon: Smile },
  { name: "ENT", icon: Ear },
  { name: "Obstetrics & Gynaecology", icon: Flower },
  { name: "Laboratory", icon: FlaskConical },
  { name: "Radiology Diagnostics", icon: ScanLine },
  { name: "Mental Health & Counselling", icon: BookHeart },
  { name: "Pharmacy", icon: Microscope },
];
```

- [ ] **Step 3: Create `src/data/team.ts`**

```ts
export type TeamMember = { name: string; role: string; bio: string; image: string };

export const team: TeamMember[] = [
  { name: "Dr. Adaeze Okonkwo", role: "Medical Director, General Medicine", bio: "20+ years leading concierge medical care in Abuja and beyond.", image: "/images/team/doctor-1.jpg" },
  { name: "Dr. Ibrahim Bello", role: "Consultant, Geriatrics", bio: "Specialist in elderly comfort care and rehabilitative medicine.", image: "/images/team/doctor-2.jpg" },
  { name: "Nurse Funmi Adeyemi", role: "Lead Nurse, Skilled Nursing", bio: "Expert in post-operative and tube-feeding nutrition therapy.", image: "/images/team/doctor-3.jpg" },
  { name: "Dr. Chiamaka Eze", role: "Consultant, Paediatrics", bio: "Newborn and family-care specialist with a focus on caregiver training.", image: "/images/team/doctor-4.jpg" },
];
```

- [ ] **Step 4: Create `src/data/testimonials.ts`**

```ts
export type Testimonial = { quote: string; name: string; condition: string; rating: number; image: string };

export const testimonials: Testimonial[] = [
  { quote: "Tannjes brought the doctor to our home at 2am when my mother needed help. Compassionate, fast, professional.", name: "Mrs. Halima A.", condition: "Family of patient", rating: 5, image: "/images/testimonials/p1.jpg" },
  { quote: "Their hospital-to-home program made my recovery safe and stress-free. Highly recommend.", name: "Engr. Tunde O.", condition: "Post-surgery patient", rating: 5, image: "/images/testimonials/p2.jpg" },
  { quote: "The nursing team trained us on PEG feeding with so much patience. We couldn't have done it without them.", name: "Mrs. Grace U.", condition: "Caregiver", rating: 5, image: "/images/testimonials/p3.jpg" },
];
```

- [ ] **Step 5: Create `src/data/stats.ts`**

```ts
export type Stat = { label: string; value: number; suffix?: string };

export const stats: Stat[] = [
  { label: "Years of Service", value: 12, suffix: "+" },
  { label: "Medical Specialties", value: 16 },
  { label: "Patients Cared For", value: 4500, suffix: "+" },
  { label: "Concierge Availability", value: 24, suffix: "/7" },
];
```

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "feat(data): add services, specialties, team, testimonials, stats"
```

---

## Task 8: Image assets

**Files:** `public/images/{hero,about,why,team,testimonials}/*.jpg`

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/images/hero public/images/about public/images/why public/images/team public/images/testimonials
```

- [ ] **Step 2: Source images**

Visit `https://unsplash.com` and download royalty-free photos matching these slots. Prefer warm clinical tone and African/Nigerian representation where available. Aim for ≤200KB each (compress with squoosh.app if larger).

Save with these exact filenames:

- `public/images/hero/doctor.jpg` — friendly doctor or nurse, head-and-shoulders portrait, neutral background. Suggested search: "african doctor portrait".
- `public/images/about/mission.jpg` — clinician with patient in a warm setting. Suggested search: "doctor patient consultation".
- `public/images/why/why-1.jpg` … `why-4.jpg` — varied scenes: home visit, elderly care, nurse smiling, medical equipment.
- `public/images/team/doctor-1.jpg` … `doctor-4.jpg` — square portraits of four distinct clinicians.
- `public/images/testimonials/p1.jpg` … `p3.jpg` — square headshots of patients/family members.

- [ ] **Step 3: Verify**

Run: `ls public/images/hero public/images/about public/images/why public/images/team public/images/testimonials`
Expected: each directory contains the listed jpgs.

- [ ] **Step 4: Commit**

```bash
git add public/images
git commit -m "chore(assets): add redesign imagery"
```

---

## Task 9: Rebuild Navbar

**Files:**
- Modify: `src/components/site/Navbar.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#departments", label: "Departments" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-pink text-white font-bold">T</span>
          <span className="font-display text-lg font-bold text-brand-navy">Tannjes Clinics</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-pink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+2347019090013" className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy">
            <Phone className="h-4 w-4 text-brand-pink" /> +234 701 909 0013
          </a>
          <Button asChild className="bg-brand-pink hover:bg-brand-pink-deep">
            <a href="#book">Book Appointment</a>
          </Button>
        </div>
        <button className="md:hidden text-brand-navy" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded px-2 py-2 text-sm font-medium text-brand-navy hover:bg-brand-pink-soft" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2 bg-brand-pink hover:bg-brand-pink-deep">
              <a href="#book" onClick={() => setOpen(false)}>Book Appointment</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/Navbar.tsx
git commit -m "feat(navbar): sticky transparent-on-top navbar"
```

---

## Task 10: Rebuild Hero (split layout + glass cards + blob)

**Files:**
- Modify: `src/components/site/Hero.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { Phone, CalendarCheck, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-brand-pink-soft/40 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pink shadow-sm ring-1 ring-brand-pink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            Medical Concierge 24/7
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl md:text-6xl">
            Your health, <span className="text-brand-pink">your call.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-brand-slate sm:text-lg">
            Compassionate, expert medical care delivered to your home, hotel, or place of work — anywhere in Abuja, anytime.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-pink hover:bg-brand-pink-deep">
              <a href="#book"><CalendarCheck className="mr-2 h-5 w-5" /> Book a Doctor</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-brand-navy/20 text-brand-navy">
              <a href="tel:+2347019090013"><Phone className="mr-2 h-5 w-5" /> +234 701 909 0013</a>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-slate">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-brand-pink" /> RC: 1355314</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-pink" /> 24/7 Availability</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-pink" /> Licensed Physicians</span>
          </div>
        </div>

        <div className="relative md:col-span-5">
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[40%] bg-gradient-to-br from-brand-pink/30 via-brand-pink-soft to-white blur-2xl"
              animate={{ borderRadius: ["40%", "55% 45% 50% 60%", "45% 55% 40% 60%", "40%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-brand-navy/5">
            <img src="/images/hero/doctor.jpg" alt="Tannjes Clinics doctor" width={720} height={900} className="h-full w-full object-cover" />
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -right-3 top-6 max-w-[220px] rotate-[-2deg] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur ring-1 ring-brand-pink-soft"
          >
            <div className="flex items-center gap-2 text-brand-navy">
              <Clock className="h-5 w-5 text-brand-pink" />
              <span className="text-sm font-semibold">24/7 Concierge</span>
            </div>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Next available: Today
            </span>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -left-3 bottom-6 max-w-[200px] rotate-[2deg] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur ring-1 ring-brand-pink-soft"
          >
            <p className="text-2xl font-extrabold text-brand-navy">16+</p>
            <p className="text-xs text-brand-slate">Medical specialties under one roof</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/Hero.tsx
git commit -m "feat(hero): split hero with glass cards and animated blob"
```

---

## Task 11: StatsStrip

**Files:**
- Create: `src/components/site/StatsStrip.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Counter } from "@/components/shared/Counter";
import { stats } from "@/data/stats";

export const StatsStrip = () => (
  <section className="bg-brand-navy py-12 text-white">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="font-display text-4xl font-extrabold text-brand-pink sm:text-5xl">
            <Counter to={s.value} suffix={s.suffix ?? ""} />
          </p>
          <p className="mt-2 text-sm text-white/80">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsStrip;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/StatsStrip.tsx
git commit -m "feat(stats): animated stats strip"
```

---

## Task 12: Rebuild About

**Files:**
- Modify: `src/components/site/About.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { Heart, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const values = [
  { icon: Heart, label: "Compassion" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: ShieldCheck, label: "Trust" },
  { icon: Sparkles, label: "Extraordinary Care" },
];

export const About = () => (
  <section id="about" className="bg-white py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <img src="/images/about/mission.jpg" alt="Tannjes Clinics in care" className="h-full w-full object-cover" width={640} height={520} />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <SectionHeading
          eyebrow="About Tannjes"
          align="left"
          title="Premium concierge medicine, built around you."
          subtitle="Tannjes Clinics Limited delivers compassionate, expert care wherever you need it — at home, at work, or in transit. We exist to make great healthcare effortlessly accessible."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
          {values.map((v) => (
            <div key={v.label} className="flex items-center gap-3 rounded-xl border border-brand-pink-soft bg-white px-3 py-2 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink">
                <v.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-brand-navy">{v.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/About.tsx
git commit -m "feat(about): two-column with core values"
```

---

## Task 13: Rebuild Services

**Files:**
- Modify: `src/components/site/Services.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Services = () => (
  <section id="services" className="bg-brand-cream py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="What We Do"
        title="Care that comes to you."
        subtitle="Seven concierge service lines designed around real life — from doctor visits at home to skilled nursing and medical travel."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <article className="group h-full rounded-2xl border border-brand-pink-soft/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-pink-soft text-brand-pink">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-brand-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{s.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-brand-slate">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" /> {b}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink transition group-hover:gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/Services.tsx
git commit -m "feat(services): card grid with icons and bullets"
```

---

## Task 14: Departments (replaces Specialties)

**Files:**
- Create: `src/components/site/Departments.tsx`
- Delete: `src/components/site/Specialties.tsx`

- [ ] **Step 1: Implement Departments**

```tsx
import { specialties } from "@/data/specialties";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Departments = () => (
  <section id="departments" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Our Departments"
        title="Sixteen specialties. One trusted partner."
        subtitle="Coordinated, multidisciplinary expertise across every stage of care."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {specialties.map((sp, i) => (
          <Reveal key={sp.name} delay={i * 0.03}>
            <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-brand-pink-soft/60 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-pink hover:shadow-lg">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
                <sp.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-brand-navy">{sp.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Departments;
```

- [ ] **Step 2: Delete Specialties**

```bash
rm src/components/site/Specialties.tsx
```

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Departments.tsx src/components/site/Specialties.tsx
git commit -m "feat(departments): replace Specialties with iconographic grid"
```

---

## Task 15: AppointmentStrip (TDD)

**Files:**
- Create: `src/components/site/AppointmentStrip.tsx`
- Create: `src/components/site/AppointmentStrip.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/site/AppointmentStrip.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { AppointmentStrip } from "./AppointmentStrip";

describe("AppointmentStrip", () => {
  it("blocks submit until required fields are filled, then exposes WhatsApp + Email actions", async () => {
    const user = userEvent.setup();
    render(<AppointmentStrip />);
    await user.click(screen.getByRole("button", { name: /request booking/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), "Ada Obi");
    await user.type(screen.getByLabelText(/phone/i), "+2348012345678");
    await user.selectOptions(screen.getByLabelText(/service/i), "doctor-at-home");
    await user.click(screen.getByRole("button", { name: /request booking/i }));

    const wa = await screen.findByRole("link", { name: /send via whatsapp/i });
    const mail = screen.getByRole("link", { name: /send via email/i });
    expect(wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/2347019090013\?text=/);
    expect(mail.getAttribute("href")).toMatch(/^mailto:tannjes03@gmail\.com\?/);
  });
});
```

Note: the test uses `@testing-library/user-event` which is not yet a dependency. Install it first:

Run: `npm install -D @testing-library/user-event@^14.5.2`

- [ ] **Step 2: Run — expect fail**

Run: `npx vitest run src/components/site/AppointmentStrip.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

```tsx
// src/components/site/AppointmentStrip.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail } from "lucide-react";
import { services } from "@/data/services";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/contact";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required").regex(/^[+\d\s-]+$/i, "Use digits and + only"),
  service: z.string().min(1, "Service is required"),
  notes: z.string().optional(),
});
type FormVals = z.infer<typeof schema>;

export const AppointmentStrip = () => {
  const [submitted, setSubmitted] = useState<FormVals | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormVals>({ resolver: zodResolver(schema) });

  const buildMessage = (v: FormVals) => {
    const svc = services.find((s) => s.slug === v.service)?.title ?? v.service;
    return `Hello Tannjes Clinics,\n\nI'd like to book an appointment.\n\nName: ${v.name}\nPhone: ${v.phone}\nService: ${svc}\nNotes: ${v.notes ?? "—"}`;
  };

  return (
    <section id="book" className="bg-brand-pink py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Book a doctor in under 60 seconds.</h2>
            <p className="mt-3 text-white/85">Tell us who you are and what you need. We respond in minutes.</p>
          </div>
          <form
            className="md:col-span-3 grid gap-4 rounded-2xl bg-white p-6 text-brand-navy shadow-xl"
            onSubmit={handleSubmit((v) => setSubmitted(v))}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium">Full name</span>
                <input {...register("name")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
                {errors.name && <span className="text-xs text-brand-pink">{errors.name.message}</span>}
              </label>
              <label className="block text-sm">
                <span className="font-medium">Phone</span>
                <input {...register("phone")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
                {errors.phone && <span className="text-xs text-brand-pink">{errors.phone.message}</span>}
              </label>
            </div>
            <label className="block text-sm">
              <span className="font-medium">Service</span>
              <select {...register("service")} className="mt-1 w-full rounded-lg border border-brand-navy/15 bg-white px-3 py-2 outline-none focus:border-brand-pink">
                <option value="">Select a service…</option>
                {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
              </select>
              {errors.service && <span className="text-xs text-brand-pink">{errors.service.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium">Notes (optional)</span>
              <textarea {...register("notes")} rows={3} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
            </label>
            {!submitted ? (
              <Button type="submit" className="bg-brand-pink hover:bg-brand-pink-deep">Request Booking</Button>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={buildWhatsAppUrl(buildMessage(submitted))}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                </a>
                <a
                  href={buildMailtoUrl({ subject: "Tannjes appointment request", body: buildMessage(submitted) })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90"
                >
                  <Mail className="h-4 w-4" /> Send via Email
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentStrip;
```

- [ ] **Step 4: Run — expect pass**

Run: `npx vitest run src/components/site/AppointmentStrip.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/AppointmentStrip.tsx src/components/site/AppointmentStrip.test.tsx package.json package-lock.json
git commit -m "feat(appointment): inline booking strip with whatsapp + email handoff"
```

---

## Task 16: Rebuild WhyChoose (zig-zag)

**Files:**
- Modify: `src/components/site/WhyChoose.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  { title: "Care that comes to you", body: "Skip the waiting room. We bring physicians and nurses directly to your home, hotel, or office.", image: "/images/why/why-1.jpg", points: ["Same-day visits", "Citywide coverage in Abuja", "Equipment and supplies included"] },
  { title: "Compassion at every step", body: "Our teams are trained not just clinically, but in dignity-first care for elderly and palliative patients.", image: "/images/why/why-2.jpg", points: ["Trauma-informed approach", "Family communication", "End-of-life sensitivity"] },
  { title: "Concierge from start to finish", body: "From hospital discharge to home recovery, we coordinate physicians, nurses, and family — so you don't have to.", image: "/images/why/why-3.jpg", points: ["Single point of contact", "Care plan handoff", "Pharmacy and lab logistics"] },
  { title: "Trusted, licensed, accountable", body: "Tannjes Clinics is a registered Nigerian medical company (RC: 1355314) with vetted, licensed physicians.", image: "/images/why/why-4.jpg", points: ["Verified clinicians", "Documented care plans", "24/7 escalation"] },
];

export const WhyChoose = () => (
  <section id="why" className="bg-brand-cream py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Why Tannjes" title="The concierge advantage." subtitle="Four reasons families across Abuja choose us for the people they love most." />
      <div className="mt-14 space-y-16">
        {reasons.map((r, i) => (
          <Reveal key={r.title}>
            <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img src={r.image} alt="" className="h-full w-full object-cover" width={640} height={420} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">{r.title}</h3>
                <p className="mt-3 text-brand-slate">{r.body}</p>
                <ul className="mt-5 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-brand-navy">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/WhyChoose.tsx
git commit -m "feat(why): zig-zag image+text rows"
```

---

## Task 17: Rebuild HowItWorks (timeline)

**Files:**
- Modify: `src/components/site/HowItWorks.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PhoneCall, ClipboardList, HeartHandshake } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "Reach out", body: "Call, WhatsApp, or fill our 60-second form. We pick up 24/7." },
  { icon: ClipboardList, title: "We assess and match", body: "We pair you with the right physician, nurse, or specialist for your need." },
  { icon: HeartHandshake, title: "Care delivered", body: "Concierge care arrives at your door — and stays with you through recovery." },
];

export const HowItWorks = () => (
  <section id="how-it-works" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="How It Works" title="Three steps to expert care." />
      <div className="relative mt-14 grid gap-10 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-7 hidden h-px border-t-2 border-dashed border-brand-pink-soft md:block" aria-hidden />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="relative rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-pink-soft/60">
              <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-pink text-white shadow-lg ring-4 ring-white">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-pink">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/HowItWorks.tsx
git commit -m "feat(how): three-step timeline with connecting line"
```

---

## Task 18: Rebuild Testimonials (Embla carousel)

**Files:**
- Modify: `src/components/site/Testimonials.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Testimonials = () => {
  const [ref, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="What Families Say" title="Stories from people we've cared for." />
        <div className="mt-12 overflow-hidden" ref={ref} aria-live="polite">
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <article key={t.name} className="min-w-0 shrink-0 grow-0 basis-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-pink-soft/60 md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]">
                <div className="flex gap-1 text-brand-pink" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-brand-navy">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.image} alt="" className="h-10 w-10 rounded-full object-cover" width={40} height={40} />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
                    <p className="text-xs text-brand-slate">{t.condition}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={prev} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={next} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/Testimonials.tsx
git commit -m "feat(testimonials): embla carousel with ratings"
```

---

## Task 19: TeamPreview

**Files:**
- Create: `src/components/site/TeamPreview.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { team } from "@/data/team";

export const TeamPreview = () => (
  <section id="team" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Our Team" title="Meet the clinicians behind the care." subtitle="A small preview of our growing team of physicians, nurses, and specialists." />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05}>
            <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover transition group-hover:scale-105" width={400} height={500} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-brand-navy">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-pink">{m.role}</p>
                <p className="mt-2 text-sm text-brand-slate">{m.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-brand-slate">Meet the full team — coming soon.</p>
    </div>
  </section>
);

export default TeamPreview;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/TeamPreview.tsx
git commit -m "feat(team): clinician preview cards"
```

---

## Task 20: Rebuild Contact (TDD)

**Files:**
- Modify: `src/components/site/Contact.tsx`
- Create: `src/components/site/Contact.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/site/Contact.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Contact } from "./Contact";

describe("Contact form", () => {
  it("blocks submit until required fields are filled, then exposes WhatsApp + Email actions", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), "Ada Obi");
    await user.type(screen.getByLabelText(/phone/i), "+2348012345678");
    await user.type(screen.getByLabelText(/message/i), "Please call me back");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("link", { name: /send via whatsapp/i })).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/2347019090013/));
    expect(screen.getByRole("link", { name: /send via email/i })).toHaveAttribute("href", expect.stringMatching(/^mailto:tannjes03@gmail\.com/));
  });
});
```

- [ ] **Step 2: Run — expect fail**

Run: `npx vitest run src/components/site/Contact.test.tsx`
Expected: FAIL — implementation pre-dates new contract.

- [ ] **Step 3: Replace `Contact.tsx`**

```tsx
// src/components/site/Contact.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/contact";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(1, "Message is required"),
});
type Vals = z.infer<typeof schema>;

export const Contact = () => {
  const [submitted, setSubmitted] = useState<Vals | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Vals>({ resolver: zodResolver(schema) });

  const buildBody = (v: Vals) => `Name: ${v.name}\nPhone: ${v.phone}\nEmail: ${v.email || "—"}\n\n${v.message}`;

  return (
    <section id="contact" className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Get in Touch" title="We're a phone call away — 24/7." />
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-brand-pink" /><p className="text-brand-navy">Drive 2, 1st Crescent, 3rd Avenue, House 38<br />Prince and Princess Estate, Kaura District, Abuja</p></div>
            <div className="flex gap-3"><Phone className="h-5 w-5 text-brand-pink" /><p className="text-brand-navy">+234 701 909 0013<br />+234 708 611 3160</p></div>
            <div className="flex gap-3"><Mail className="h-5 w-5 text-brand-pink" /><p className="text-brand-navy">tannjes03@gmail.com</p></div>
            <div className="overflow-hidden rounded-2xl shadow ring-1 ring-brand-pink-soft">
              <iframe title="Tannjes Clinics location" src="https://www.google.com/maps?q=Prince+and+Princess+Estate+Kaura+Abuja&output=embed" width="100%" height="280" style={{ border: 0 }} loading="lazy" />
            </div>
          </div>
          <form onSubmit={handleSubmit((v) => setSubmitted(v))} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-pink-soft">
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Full name</span>
              <input {...register("name")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
              {errors.name && <span className="text-xs text-brand-pink">{errors.name.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Phone</span>
              <input {...register("phone")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
              {errors.phone && <span className="text-xs text-brand-pink">{errors.phone.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Email (optional)</span>
              <input type="email" {...register("email")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Message</span>
              <textarea rows={4} {...register("message")} className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink" />
              {errors.message && <span className="text-xs text-brand-pink">{errors.message.message}</span>}
            </label>
            {!submitted ? (
              <Button type="submit" className="bg-brand-pink hover:bg-brand-pink-deep">Send Message</Button>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={buildWhatsAppUrl(buildBody(submitted))} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                  <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                </a>
                <a href={buildMailtoUrl({ subject: "Tannjes Clinics — website message", body: buildBody(submitted) })}
                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90">
                  <Mail className="h-4 w-4" /> Send via Email
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 4: Run — expect pass**

Run: `npx vitest run src/components/site/Contact.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/Contact.tsx src/components/site/Contact.test.tsx
git commit -m "feat(contact): map + form with whatsapp + email handoff"
```

---

## Task 21: Rebuild Footer

**Files:**
- Modify: `src/components/site/Footer.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { services } from "@/data/services";

const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="bg-brand-navy text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-pink font-bold">T</span>
          <span className="font-display text-lg font-bold">Tannjes Clinics</span>
        </div>
        <p className="mt-3 text-sm text-white/75">Your health, your call. Premium medical concierge — 24/7 in Abuja and beyond.</p>
        <p className="mt-3 text-xs text-white/55">RC: 1355314</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Quick Links</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li><a href="#about" className="hover:text-white">About</a></li>
          <li><a href="#services" className="hover:text-white">Services</a></li>
          <li><a href="#departments" className="hover:text-white">Departments</a></li>
          <li><a href="#team" className="hover:text-white">Team</a></li>
          <li><a href="#contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Services</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          {services.map((s) => <li key={s.slug}><a href="#services" className="hover:text-white">{s.title}</a></li>)}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Contact</h4>
        <p className="mt-4 text-sm text-white/80">Drive 2, 1st Crescent, 3rd Avenue, House 38<br />Prince and Princess Estate, Kaura District, Abuja</p>
        <p className="mt-3 text-sm text-white/80">+234 701 909 0013<br />+234 708 611 3160</p>
        <p className="mt-3 text-sm text-white/80">tannjes03@gmail.com</p>
        <div className="mt-4 flex gap-3 text-white/70">
          <a href="#" aria-label="Facebook" className="hover:text-brand-pink"><Facebook className="h-5 w-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-brand-pink"><Instagram className="h-5 w-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-brand-pink"><Twitter className="h-5 w-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-brand-pink"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
      © {year} Tannjes Clinics Limited. All rights reserved.
    </div>
  </footer>
);

export default Footer;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site/Footer.tsx
git commit -m "feat(footer): four-column footer with brand and contact"
```

---

## Task 22: Rewire Index.tsx

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import StatsStrip from "@/components/site/StatsStrip";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Departments from "@/components/site/Departments";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import WhyChoose from "@/components/site/WhyChoose";
import HowItWorks from "@/components/site/HowItWorks";
import Testimonials from "@/components/site/Testimonials";
import TeamPreview from "@/components/site/TeamPreview";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Index = () => (
  <main className="min-h-screen bg-white">
    <Navbar />
    <Hero />
    <StatsStrip />
    <About />
    <Services />
    <Departments />
    <AppointmentStrip />
    <WhyChoose />
    <HowItWorks />
    <Testimonials />
    <TeamPreview />
    <Contact />
    <Footer />
  </main>
);

export default Index;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat(index): wire redesigned section order"
```

---

## Task 23: Verification — lint, test, build, manual smoke

**Files:** none

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: 0 errors. Fix any reported issues, then commit fixes if needed.

- [ ] **Step 2: Run all tests**

Run: `npm run test`
Expected: all suites pass.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds, no Tailwind/TS errors.

- [ ] **Step 4: Dev server smoke**

Run: `npm run dev`
Open `http://localhost:8080`. Verify:
- Hero loads with doctor image, two glass cards, animated blob.
- Navbar transparent at top, becomes white with shadow on scroll.
- Stats counters animate when scrolled into view.
- All 13 sections render in the correct order.
- AppointmentStrip and Contact: empty submit shows errors; valid submit reveals WhatsApp + Email buttons with correctly prefilled URLs (open in new tab to inspect).
- Testimonials carousel arrows work.
- Mobile (DevTools responsive 375px): navbar collapses to hamburger; sections stack; no horizontal scroll.

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: post-redesign cleanup"
```

---

## Self-Review

**Spec coverage:** All 13 sections in spec §3 → Tasks 9-22. Brand tokens §2 → Task 2. Motion §2 → Tasks 1, 3, 5, 10. Forms §7 → Tasks 15, 20. Imagery §8 → Task 8. Accessibility §9 → addressed inline (alt text, aria-live on carousel, focus styles via Tailwind ring, form labels). Testing §10 → Tasks 5, 6, 15, 20. Performance §11 → image dimensions and lazy loading present in components. Out of scope §12 → no backend tasks present.

**Type consistency:** `Service`, `Specialty`, `TeamMember`, `Testimonial`, `Stat` used consistently across data and component files. `buildWhatsAppUrl` / `buildMailtoUrl` signatures match between Task 6, 15, 20.

**No placeholders detected.**
