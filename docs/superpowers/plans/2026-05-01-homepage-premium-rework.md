# Homepage Premium Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild StatsStrip, WhyChoose, and Testimonials sections of the homepage to a premium healthcare standard with React Bits backgrounds, Lottie accents, and refined motion — without touching Hero or other sections.

**Architecture:** Two new shared primitives (`LottieAccent`, plus `Beams`/`Aurora` canvas backgrounds), three section rewrites, two local Lottie JSON assets. No new npm dependencies; uses already-installed `framer-motion` and `lottie-react`. All visual elements respect `prefers-reduced-motion` and are gated to in-viewport rendering.

**Tech Stack:** React 18 + TypeScript + Vite, Tailwind CSS + shadcn/ui, framer-motion, lottie-react, embla-carousel-react.

**Spec:** `docs/superpowers/specs/2026-05-01-homepage-premium-rework-design.md`

**Note on testing:** This is a visual rework with no behavioral changes. The codebase has Vitest + RTL set up but no visual-regression infrastructure. Behavioral unit tests are added for the one non-trivial helper (`LottieAccent` reduced-motion gating). Section rewrites are verified manually via dev server — explicit manual verification steps included per task.

---

## File Structure

**New files:**
- `src/components/shared/LottieAccent.tsx` — lazy + reduced-motion-aware wrapper around `lottie-react`
- `src/components/shared/LottieAccent.test.tsx` — unit test for reduced-motion behavior
- `src/components/bits/Beams.tsx` — canvas-based animated diagonal beams (dark sections)
- `src/components/bits/Aurora.tsx` — canvas-based soft aurora wash (light sections)
- `src/assets/lottie/heartbeat.json` — Lottie file (downloaded by user from LottieFiles)
- `src/assets/lottie/shield-check.json` — Lottie file (downloaded by user from LottieFiles)

**Modified files (full rewrites):**
- `src/components/site/StatsStrip.tsx`
- `src/components/site/WhyChoose.tsx`
- `src/components/site/Testimonials.tsx`

**Untouched:** Hero, About, Services, HowItWorks, FacilitiesTeaser, TeamPreview, AppointmentStrip, all data modules, all design tokens.

---

## Task 1: LottieAccent shared component + unit test

**Files:**
- Create: `src/components/shared/LottieAccent.tsx`
- Create: `src/components/shared/LottieAccent.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/shared/LottieAccent.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LottieAccent } from "./LottieAccent";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useReducedMotion: () => true };
});

vi.mock("lottie-react", () => ({
  default: ({ autoplay, loop }: { autoplay: boolean; loop: boolean }) => (
    <div data-testid="lottie" data-autoplay={String(autoplay)} data-loop={String(loop)} />
  ),
}));

describe("LottieAccent", () => {
  it("disables autoplay and loop under reduced motion", async () => {
    const { findByTestId } = render(
      <LottieAccent
        load={() => Promise.resolve({ default: { v: "5", fr: 60, layers: [] } as never })}
        size={80}
        ariaLabel="test"
      />
    );
    const el = await findByTestId("lottie");
    expect(el.getAttribute("data-autoplay")).toBe("false");
    expect(el.getAttribute("data-loop")).toBe("false");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/shared/LottieAccent.test.tsx`
Expected: FAIL with module-not-found for `./LottieAccent`.

- [ ] **Step 3: Implement LottieAccent**

Create `src/components/shared/LottieAccent.tsx`:

```tsx
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Lottie = lazy(() => import("lottie-react"));

type LottieAccentProps = {
  load: () => Promise<{ default: object }>;
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export function LottieAccent({ load, size = 80, className, ariaLabel }: LottieAccentProps) {
  const reduce = useReducedMotion();
  const [data, setData] = useState<object | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || data) return;
    let alive = true;
    load().then((mod) => {
      if (alive) setData(mod.default);
    });
    return () => {
      alive = false;
    };
  }, [visible, data, load]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
      style={{ width: size, height: size }}
    >
      {data ? (
        <Suspense fallback={null}>
          <Lottie
            animationData={data}
            autoplay={!reduce}
            loop={!reduce}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default LottieAccent;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/shared/LottieAccent.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Run full lint**

Run: `npm run lint`
Expected: no new errors in `LottieAccent.tsx` or `LottieAccent.test.tsx`.

- [ ] **Step 6: Commit**

```
git add src/components/shared/LottieAccent.tsx src/components/shared/LottieAccent.test.tsx
git commit -m "feat(shared): LottieAccent wrapper with reduced-motion + viewport gating"
```

---

## Task 2: Beams React Bits port (dark sections)

**Files:**
- Create: `src/components/bits/Beams.tsx`

- [ ] **Step 1: Implement Beams**

Create `src/components/bits/Beams.tsx`:

```tsx
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type BeamsProps = {
  className?: string;
  colorA?: string;
  colorB?: string;
  speed?: number;
  opacity?: number;
};

export function Beams({
  className,
  colorA = "rgba(225, 29, 116, 0.18)",
  colorB = "rgba(56, 132, 255, 0.10)",
  speed = 0.018,
  opacity = 0.55,
}: BeamsProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let running = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const size = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const beams = 6;
      for (let i = 0; i < beams; i++) {
        const phase = t + i * 0.7;
        const x = ((Math.sin(phase) + 1) / 2) * w;
        const grad = ctx.createLinearGradient(x, 0, x + w * 0.35, h);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, i % 2 === 0 ? colorA : colorB);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x - w * 0.05, 0);
        ctx.lineTo(x + w * 0.25, 0);
        ctx.lineTo(x + w * 0.55, h);
        ctx.lineTo(x + w * 0.25, h);
        ctx.closePath();
        ctx.fill();
      }
    };

    const tick = () => {
      if (!running) return;
      if (!reduce) t += speed;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    size();
    draw();

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        if (onScreen && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!onScreen && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "0px" }
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [colorA, colorB, speed, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", opacity }}
    />
  );
}

export default Beams;
```

- [ ] **Step 2: Verify lint**

Run: `npm run lint`
Expected: no errors in `Beams.tsx`.

- [ ] **Step 3: Commit**

```
git add src/components/bits/Beams.tsx
git commit -m "feat(bits): Beams animated background, viewport-gated"
```

---

## Task 3: Aurora React Bits port (light sections)

**Files:**
- Create: `src/components/bits/Aurora.tsx`

- [ ] **Step 1: Implement Aurora**

Create `src/components/bits/Aurora.tsx`:

```tsx
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type AuroraProps = {
  className?: string;
  colorA?: string;
  colorB?: string;
  colorC?: string;
  speed?: number;
  opacity?: number;
};

export function Aurora({
  className,
  colorA = "rgba(255, 200, 220, 0.55)",
  colorB = "rgba(200, 220, 255, 0.45)",
  colorC = "rgba(255, 230, 240, 0.50)",
  speed = 0.0035,
  opacity = 0.7,
}: AuroraProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let running = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const size = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };

    const blob = (cx: number, cy: number, r: number, color: string) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const r = Math.max(w, h) * 0.6;
      blob(w * (0.3 + 0.15 * Math.sin(t)), h * (0.4 + 0.15 * Math.cos(t * 0.7)), r, colorA);
      blob(w * (0.7 + 0.15 * Math.cos(t * 0.9)), h * (0.6 + 0.15 * Math.sin(t * 1.1)), r, colorB);
      blob(w * (0.5 + 0.2 * Math.sin(t * 0.5)), h * (0.2 + 0.1 * Math.cos(t)), r * 0.8, colorC);
    };

    const tick = () => {
      if (!running) return;
      if (!reduce) t += speed;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    size();
    draw();

    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        if (onScreen && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!onScreen && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "0px" }
    );
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [colorA, colorB, colorC, speed, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", opacity }}
    />
  );
}

export default Aurora;
```

- [ ] **Step 2: Verify lint**

Run: `npm run lint`
Expected: no errors in `Aurora.tsx`.

- [ ] **Step 3: Commit**

```
git add src/components/bits/Aurora.tsx
git commit -m "feat(bits): Aurora soft animated wash, viewport-gated"
```

---

## Task 4: Acquire Lottie assets

**Files:**
- Create: `src/assets/lottie/heartbeat.json`
- Create: `src/assets/lottie/shield-check.json`

This task requires the **user** to download two Lottie JSON files from LottieFiles. The implementing engineer should pause here and ask the user to download:

- [ ] **Step 1: Heartbeat**

Visit https://lottiefiles.com/free-animation/animated-heart-beat-Z0Wk7oSAAk and click **Download → Lottie JSON**. Save the downloaded file as:

```
src/assets/lottie/heartbeat.json
```

(If that exact file ID is unavailable, search "heartbeat line" on https://lottiefiles.com/featured-free-animations and pick a clean line-based heartbeat under 15KB. Confirm size with `Get-Item src/assets/lottie/heartbeat.json | Select-Object Length`; should be under 15360 bytes.)

- [ ] **Step 2: Shield with checkmark**

Search "shield check" on https://lottiefiles.com/featured-free-animations. Pick a single-color, simple shield-with-check animation under 15KB. Save as:

```
src/assets/lottie/shield-check.json
```

- [ ] **Step 3: Verify both files exist and size**

Run (PowerShell):
```
Get-ChildItem src/assets/lottie/*.json | Select-Object Name, Length
```
Expected: two files, both under 15360 bytes.

- [ ] **Step 4: Verify JSON validity**

Run (PowerShell):
```
Get-Content src/assets/lottie/heartbeat.json | ConvertFrom-Json | Out-Null
Get-Content src/assets/lottie/shield-check.json | ConvertFrom-Json | Out-Null
```
Expected: no errors.

- [ ] **Step 5: Commit**

```
git add src/assets/lottie/heartbeat.json src/assets/lottie/shield-check.json
git commit -m "chore(assets): add Lottie JSON files for WhyChoose accents"
```

---

## Task 5: Rewrite StatsStrip → Trust Band

**Files:**
- Modify (full rewrite): `src/components/site/StatsStrip.tsx`

- [ ] **Step 1: Replace StatsStrip with the new Trust Band layout**

Replace the entire contents of `src/components/site/StatsStrip.tsx`:

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Stethoscope, Clock } from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { Beams } from "@/components/bits/Beams";
import { stats } from "@/data/stats";

const ease = [0.22, 1, 0.36, 1] as const;

const pills = [
  { icon: ShieldCheck, label: "RC: 1355314" },
  { icon: Stethoscope, label: "Licensed Physicians" },
  { icon: Clock, label: "24/7 Concierge" },
];

export const StatsStrip = () => {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy py-16 text-white md:py-20">
      <div className="absolute inset-0" aria-hidden>
        <Beams opacity={0.5} />
      </div>
      <div className="absolute inset-0 texture-cross-light opacity-90" aria-hidden />
      <div className="absolute inset-0 texture-hatch opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          Trusted across Abuja
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.04] p-5 text-center ring-1 ring-white/10 backdrop-blur-sm sm:p-6"
            >
              <p className="font-display text-4xl font-extrabold text-brand-pink sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm text-white/80">{s.label}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-brand-pink/70 transition-all duration-700 group-[.in-view]:w-2/3"
              />
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 + 0.2 }}
                className="absolute bottom-0 left-1/4 right-1/4 h-px origin-left bg-brand-pink/70"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {pills.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-brand-pink" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual verification — start dev server**

Run: `npm run dev`
Open http://localhost:8080. Scroll to the navy stats band (just under the hero).

Verify:
- All 4 counters animate up to the same values as before (12+, 16, 4500+, 24/7).
- A subtle, slow-moving beam pattern is visible across the navy background — should not feel busy.
- Three reassurance pills appear under the counters: "RC: 1355314", "Licensed Physicians", "24/7 Concierge" with small icons.
- Each counter sits in a faint glass tile with a thin pink underline that animates in.
- Layout collapses to 2 columns on mobile (resize the viewport to <768px).

- [ ] **Step 4: Verify reduced motion**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → set to `reduce`. Reload. Verify Beams is static (no movement) and counters jump to final state without animating.

- [ ] **Step 5: Commit**

```
git add src/components/site/StatsStrip.tsx
git commit -m "feat(StatsStrip): rebuild as Trust Band with Beams + reassurance pills"
```

---

## Task 6: Rewrite WhyChoose → Concierge Advantage Bento

**Files:**
- Modify (full rewrite): `src/components/site/WhyChoose.tsx`

- [ ] **Step 1: Replace WhyChoose**

Replace the entire contents of `src/components/site/WhyChoose.tsx`:

```tsx
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LottieAccent } from "@/components/shared/LottieAccent";
import imgHome from "@/assets/service-home.jpg";
import imgElderly from "@/assets/service-elderly.jpg";
import imgNursing from "@/assets/service-nursing.jpg";
import imgNewborn from "@/assets/service-newborn.jpg";

type Reason = {
  title: string;
  body: string;
  points: string[];
  image?: string;
  lottie?: () => Promise<{ default: object }>;
  lottieLabel?: string;
};

const reasons: Reason[] = [
  {
    title: "Care that comes to you",
    body: "Skip the waiting room. We bring physicians and nurses directly to your home, hotel, or office.",
    image: imgHome,
    points: ["Same-day visits", "Citywide coverage in Abuja", "Equipment and supplies included"],
  },
  {
    title: "Compassion at every step",
    body: "Our teams are trained not just clinically, but in dignity-first care for elderly and palliative patients.",
    lottie: () => import("@/assets/lottie/heartbeat.json"),
    lottieLabel: "Animated heartbeat icon",
    points: ["Trauma-informed approach", "Family communication", "End-of-life sensitivity"],
  },
  {
    title: "Concierge from start to finish",
    body: "From hospital discharge to home recovery, we coordinate physicians, nurses, and family — so you don't have to.",
    image: imgNursing,
    points: ["Single point of contact", "Care plan handoff", "Pharmacy and lab logistics"],
  },
  {
    title: "Trusted, licensed, accountable",
    body: "Tannjes Clinics is a registered Nigerian medical company (RC: 1355314) with vetted, licensed physicians.",
    lottie: () => import("@/assets/lottie/shield-check.json"),
    lottieLabel: "Animated shield with checkmark",
    points: ["Verified clinicians", "Documented care plans", "24/7 escalation"],
  },
];

const PointsList = ({ points }: { points: string[] }) => (
  <ul className="mt-5 space-y-2">
    {points.map((p) => (
      <li key={p} className="flex items-start gap-2 text-sm text-brand-navy">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" /> {p}
      </li>
    ))}
  </ul>
);

const LargeCard = ({ r }: { r: Reason }) => (
  <article className="group relative grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-pink-soft/60 sm:grid-cols-2">
    <div className="relative h-56 overflow-hidden sm:h-full">
      {r.image ? (
        <img
          src={r.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
        />
      ) : null}
      <span aria-hidden className="absolute inset-y-0 right-0 w-1 bg-brand-pink/80 sm:left-auto" />
    </div>
    <div className="p-6 sm:p-8">
      <h3 className="font-display text-2xl font-bold text-brand-navy sm:text-[1.65rem]">{r.title}</h3>
      <p className="mt-3 text-brand-slate">{r.body}</p>
      <PointsList points={r.points} />
    </div>
  </article>
);

const SmallCard = ({ r }: { r: Reason }) => (
  <article className="group relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-brand-pink-soft/60 sm:p-7">
    {r.lottie ? (
      <LottieAccent load={r.lottie} size={72} ariaLabel={r.lottieLabel} className="mb-2" />
    ) : null}
    <h3 className="mt-2 font-display text-xl font-bold text-brand-navy sm:text-2xl">{r.title}</h3>
    <p className="mt-2 text-sm text-brand-slate">{r.body}</p>
    <PointsList points={r.points} />
  </article>
);

export const WhyChoose = () => (
  <section id="why" className="relative overflow-hidden bg-brand-cream py-20">
    <div className="absolute inset-0 texture-dots opacity-70" aria-hidden />
    <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-brand-pink-soft/70 blur-3xl" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        animate
        eyebrow="Why Tannjes"
        title="The concierge advantage."
        subtitle="Four reasons families across Abuja choose us for the people they love most."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <LargeCard r={reasons[0]} />
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-1">
          <SmallCard r={reasons[1]} />
        </Reveal>
        <Reveal delay={0.16} className="md:col-span-1">
          <SmallCard r={reasons[3]} />
        </Reveal>
        <Reveal delay={0.24} className="md:col-span-2">
          <LargeCard r={reasons[2]} />
        </Reveal>
      </div>
    </div>
  </section>
);

export default WhyChoose;
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run tests**

Run: `npm run test`
Expected: all existing tests + LottieAccent test pass.

- [ ] **Step 4: Manual verification**

If `npm run dev` is not still running, start it. Open http://localhost:8080 and scroll to "The concierge advantage."

Verify:
- 4 cards in a 2-row bento: row 1 = large(2/3) + small(1/3); row 2 = small(1/3) + large(2/3).
- Large cards show photo on the left half + copy on the right half (desktop). Photos have a thin pink edge.
- Small cards show a Lottie animation at top (~72px) — heartbeat for "Compassion", shield for "Trusted".
- Lottie animations are subtle, slow, looping. They don't start until scrolled into view.
- On mobile (<768px), all cards stack to single column.
- Hover on cards: subtle elevation, no aggressive scale.

- [ ] **Step 5: Verify reduced motion**

DevTools → emulate `prefers-reduced-motion: reduce`. Reload. Lottie should be visible but frozen (no movement).

- [ ] **Step 6: Commit**

```
git add src/components/site/WhyChoose.tsx
git commit -m "feat(WhyChoose): bento layout with Lottie accents on small cards"
```

---

## Task 7: Rewrite Testimonials → Featured + Supporting

**Files:**
- Modify (full rewrite): `src/components/site/Testimonials.tsx`

- [ ] **Step 1: Replace Testimonials**

Replace the entire contents of `src/components/site/Testimonials.tsx`:

```tsx
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Aurora } from "@/components/bits/Aurora";

const ease = [0.22, 1, 0.36, 1] as const;

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 text-brand-pink" aria-label={`${rating} out of 5`}>
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-current" />
    ))}
  </div>
);

const FeaturedCard = ({ t }: { t: Testimonial }) => (
  <article className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-card ring-1 ring-brand-pink-soft/60 sm:p-10">
    <Quote
      aria-hidden
      className="absolute right-6 top-6 h-20 w-20 text-brand-pink/10 sm:h-28 sm:w-28"
    />
    <Stars rating={t.rating} />
    <p className="relative mt-6 font-display text-xl font-medium leading-relaxed text-brand-navy sm:text-2xl">
      &ldquo;{t.quote}&rdquo;
    </p>
    <div className="mt-8 flex items-center gap-4">
      <img
        src={t.image}
        alt=""
        className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-pink-soft"
        width={56}
        height={56}
      />
      <div>
        <p className="text-base font-semibold text-brand-navy">{t.name}</p>
        <p className="text-sm text-brand-slate">{t.condition}</p>
      </div>
    </div>
  </article>
);

const MiniCard = ({ t }: { t: Testimonial }) => (
  <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-pink-soft/60">
    <Stars rating={t.rating} />
    <p className="mt-3 line-clamp-4 text-sm text-brand-navy">&ldquo;{t.quote}&rdquo;</p>
    <div className="mt-4 flex items-center gap-3">
      <img src={t.image} alt="" className="h-9 w-9 rounded-full object-cover" width={36} height={36} />
      <div>
        <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
        <p className="text-xs text-brand-slate">{t.condition}</p>
      </div>
    </div>
  </article>
);

export const Testimonials = () => {
  const reduce = useReducedMotion();
  const featured = testimonials[0];
  const supporting = testimonials.slice(1);

  const [ref, embla] = useEmblaCarousel({ loop: true, align: "start", axis: "y" }, []);
  const [canScroll, setCanScroll] = useState(false);
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const update = () => setCanScroll(embla.canScrollPrev() || embla.canScrollNext());
    update();
    embla.on("reInit", update);
    embla.on("select", update);
  }, [embla]);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-20">
      <div className="absolute inset-0" aria-hidden>
        <Aurora opacity={0.55} />
      </div>
      <div className="absolute inset-0 texture-dots-pink opacity-70" aria-hidden />
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-pink-soft/60 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading animate eyebrow="What Families Say" title="Stories from people we've cared for." />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-3"
          >
            <FeaturedCard t={featured} />
          </motion.div>

          <div className="relative lg:col-span-2">
            <div className="overflow-hidden lg:max-h-[26rem]" ref={ref} aria-live="polite">
              <div className="flex flex-col gap-4">
                {supporting.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
                  >
                    <MiniCard t={t} />
                  </motion.div>
                ))}
              </div>
            </div>

            {canScroll ? (
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run tests**

Run: `npm run test`
Expected: all tests pass.

- [ ] **Step 4: Manual verification**

Open http://localhost:8080 and scroll to "Stories from people we've cared for."

Verify:
- Desktop (≥1024px): featured testimonial fills 3/5 of width on the left with a large pull-quote, big avatar, decorative pink quote glyph in the corner. The right 2/5 shows the remaining testimonials stacked.
- A soft pink/sky aurora animates very gently behind the section — should be barely noticeable but adds warmth.
- Mobile / tablet: collapses to single column; featured on top, supporting stacked beneath.
- Embla arrows only appear if there are enough supporting cards to scroll (currently 2 → may not show; verify behavior is graceful).
- The existing `texture-dots-pink` overlay is still visible.

- [ ] **Step 5: Verify reduced motion**

DevTools → emulate `prefers-reduced-motion: reduce`. Reload. Verify Aurora is static and no card-entry animations play.

- [ ] **Step 6: Commit**

```
git add src/components/site/Testimonials.tsx
git commit -m "feat(Testimonials): featured + supporting layout with Aurora background"
```

---

## Task 8: End-to-end QA + production build

**Files:** none (verification only)

- [ ] **Step 1: Build the production bundle**

Run: `npm run build`
Expected: build succeeds with no errors. Note any warnings about chunk size.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview`
Open the URL it prints (typically http://localhost:4173). Walk the entire homepage top to bottom.

Verify:
- Hero, About, Services, HowItWorks, FacilitiesTeaser, TeamPreview, AppointmentStrip render identically to before (untouched sections).
- Navigation between routes (e.g., About, Services links) still works.
- No console errors.
- No layout shift when Lottie files load.

- [ ] **Step 3: Mobile sanity pass**

DevTools → toggle device toolbar → iPhone SE (375×667). Reload and walk the homepage.

Verify:
- StatsStrip 2-column counters readable.
- WhyChoose stacks all 4 cards single column.
- Testimonials featured card on top, supporting cards beneath.

- [ ] **Step 4: Full lint + test**

Run: `npm run lint && npm run test`
Expected: clean.

- [ ] **Step 5: Final commit (only if anything was tweaked during QA)**

If no changes were needed during QA, skip this step. Otherwise:

```
git add -A
git commit -m "chore: QA polish for homepage rework"
```

---

## Self-Review Notes

- **Spec coverage:** All three sections from spec covered (Tasks 5, 6, 7). `LottieAccent` (Task 1), `Beams` (Task 2), `Aurora` (Task 3), Lottie assets (Task 4) all map to spec's cross-cutting components and assets. End-to-end QA (Task 8) covers the spec's "verification" criteria.
- **No placeholders:** All code blocks complete; no "TODO" or "TBD" outside Task 4 Step 1, where two LottieFiles URLs are noted as optional fallbacks since asset libraries change. Required size check is concrete.
- **Type consistency:** `Reason.lottie` is `() => Promise<{ default: object }>` matching `LottieAccent`'s `load` prop. `Testimonial` import re-uses the existing exported type from `@/data/testimonials`.
- **Open spec items resolved:** StatsStrip eyebrow set to "Trusted across Abuja"; featured testimonial = `testimonials[0]`; LottieFiles guidance provided in Task 4.
