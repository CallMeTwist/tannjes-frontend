# Team Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the home-page team preview and ship a new full-viewport asymmetric team slider on the dedicated `/team` page, both reading from the existing `src/data/team.ts` source.

**Architecture:** `TeamPreview` becomes a quieter 4-card grid with a routed CTA to `/team`. A new `team/` subfolder holds three coupled components (`TeamSlider`, `DoctorCard`, `ThumbnailNav`) where the slider owns active-index state and feeds two presentational children. All animation uses the existing `framer-motion` dep; brand palette (navy + pink) only.

**Tech Stack:** React 18 + TS, Tailwind, framer-motion (existing), lucide-react, vitest + Testing Library.

**Spec:** [docs/superpowers/specs/2026-05-03-team-redesign-design.md](../specs/2026-05-03-team-redesign-design.md)

---

## File Structure

- **Modify** [src/data/team.ts](../../../src/data/team.ts) — add optional `credentials?: string` to `TeamMember`
- **Modify** [src/components/site/TeamPreview.tsx](../../../src/components/site/TeamPreview.tsx) — refined styling, routed CTA
- **Create** `src/components/site/team/DoctorCard.tsx` — large portrait + info pane
- **Create** `src/components/site/team/DoctorCard.test.tsx`
- **Create** `src/components/site/team/ThumbnailNav.tsx` — bottom thumbnail strip
- **Create** `src/components/site/team/ThumbnailNav.test.tsx`
- **Create** `src/components/site/team/TeamSlider.tsx` — orchestrator, owns state
- **Create** `src/components/site/team/TeamSlider.test.tsx`
- **Modify** [src/pages/Team.tsx](../../../src/pages/Team.tsx) — replace `<TeamPreview />` with `<TeamSlider members={team} />`

---

## Task 1: Extend `TeamMember` type with optional credentials

**Files:**
- Modify: `src/data/team.ts`

- [ ] **Step 1: Add the optional field**

Edit `src/data/team.ts`. Replace the type declaration line:

```ts
export type TeamMember = { name: string; role: string; bio: string; image: string };
```

with:

```ts
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string;
};
```

Existing entries are untouched (the field is optional).

- [ ] **Step 2: Type-check passes**

Run: `npx tsc --noEmit`
Expected: clean. (If the project doesn't have a typecheck script, this is the canonical invocation.)

- [ ] **Step 3: Commit**

```bash
git add src/data/team.ts
git commit -m "feat(team): add optional credentials field to TeamMember"
```

---

## Task 2: `DoctorCard` (presentational; no state)

**Files:**
- Create: `src/components/site/team/DoctorCard.tsx`
- Create: `src/components/site/team/DoctorCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/site/team/DoctorCard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import DoctorCard from "./DoctorCard";

const member = {
  name: "Dr. Adaeze Okonkwo",
  role: "Medical Director, General Medicine",
  bio: "20+ years leading concierge medical care in Abuja and beyond.",
  image: "/test.jpg",
};

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <DoctorCard member={member} eager {...props} />
    </MemoryRouter>,
  );

describe("DoctorCard", () => {
  it("renders the member's name, role, and bio", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: member.name })).toBeInTheDocument();
    expect(screen.getByText(member.role)).toBeInTheDocument();
    expect(screen.getByText(member.bio)).toBeInTheDocument();
  });

  it("renders a Book Appointment link to /contact#book", () => {
    renderCard();
    const cta = screen.getByRole("link", { name: /book appointment/i });
    expect(cta).toHaveAttribute("href", "/contact#book");
  });

  it("renders the View profile button as disabled placeholder", () => {
    renderCard();
    const btn = screen.getByRole("button", { name: /view profile/i });
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("renders credentials line only when provided", () => {
    const { rerender } = renderCard();
    expect(screen.queryByText(/MBBS/i)).not.toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <DoctorCard member={{ ...member, credentials: "MBBS, FMCP" }} eager />
      </MemoryRouter>,
    );
    expect(screen.getByText("MBBS, FMCP")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/site/team/DoctorCard.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/site/team/DoctorCard.tsx`:

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import type { TeamMember } from "@/data/team";

type Props = {
  member: TeamMember;
  eager?: boolean;
};

export const DoctorCard = ({ member, eager = false }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_30px_60px_-30px_rgba(11,27,51,0.25)]">
          <img
            src={member.image}
            alt={member.name}
            loading={eager ? "eager" : "lazy"}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            width={600}
            height={800}
          />
        </div>
      </div>
      <div className="md:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-pink">
          {member.role}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-brand-navy md:text-5xl">
          {member.name}
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-brand-slate">
          {member.bio}
        </p>
        {member.credentials && (
          <p className="mt-3 text-sm text-brand-slate/80">{member.credentials}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact#book"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-pink px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-pink/30 transition hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60"
          >
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </Link>
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-navy/15 px-5 py-3 text-sm font-semibold text-brand-navy/60"
          >
            View profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/site/team/DoctorCard.test.tsx`
Expected: PASS — all 4 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/team/DoctorCard.tsx src/components/site/team/DoctorCard.test.tsx
git commit -m "feat(team): add DoctorCard with portrait, bio, and CTAs"
```

---

## Task 3: `ThumbnailNav` (presentational)

**Files:**
- Create: `src/components/site/team/ThumbnailNav.tsx`
- Create: `src/components/site/team/ThumbnailNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/site/team/ThumbnailNav.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ThumbnailNav from "./ThumbnailNav";

const members = [
  { name: "Dr. A", role: "r", bio: "b", image: "/a.jpg" },
  { name: "Dr. B", role: "r", bio: "b", image: "/b.jpg" },
  { name: "Dr. C", role: "r", bio: "b", image: "/c.jpg" },
];

describe("ThumbnailNav", () => {
  it("renders one button per member", () => {
    render(<ThumbnailNav members={members} activeIndex={0} onSelect={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("marks the active button with aria-current", () => {
    render(<ThumbnailNav members={members} activeIndex={1} onSelect={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).not.toHaveAttribute("aria-current");
    expect(buttons[1]).toHaveAttribute("aria-current", "true");
    expect(buttons[2]).not.toHaveAttribute("aria-current");
  });

  it("calls onSelect with the clicked index", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ThumbnailNav members={members} activeIndex={0} onSelect={onSelect} />);
    await user.click(screen.getAllByRole("button")[2]);
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/site/team/ThumbnailNav.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/site/team/ThumbnailNav.tsx`:

```tsx
import type { TeamMember } from "@/data/team";

type Props = {
  members: TeamMember[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const ThumbnailNav = ({ members, activeIndex, onSelect }: Props) => (
  <div className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-2 py-3 md:justify-center md:overflow-visible">
    {members.map((m, i) => {
      const active = i === activeIndex;
      return (
        <button
          key={m.name}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show ${m.name}`}
          aria-current={active ? "true" : undefined}
          className={`group relative shrink-0 snap-center transition-transform duration-300 ${
            active ? "scale-110 opacity-100" : "scale-100 opacity-60 hover:scale-105 hover:opacity-90"
          }`}
        >
          <span
            className={`block h-12 w-12 overflow-hidden rounded-full ring-offset-2 md:h-14 md:w-14 ${
              active ? "ring-2 ring-brand-pink" : ""
            }`}
          >
            <img
              src={m.image}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>
          <span
            aria-hidden
            className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-pink transition-opacity ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      );
    })}
  </div>
);

export default ThumbnailNav;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/site/team/ThumbnailNav.test.tsx`
Expected: PASS — all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/team/ThumbnailNav.tsx src/components/site/team/ThumbnailNav.test.tsx
git commit -m "feat(team): add ThumbnailNav with active-state ring + dot indicator"
```

---

## Task 4: `TeamSlider` (orchestrator)

**Files:**
- Create: `src/components/site/team/TeamSlider.tsx`
- Create: `src/components/site/team/TeamSlider.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/site/team/TeamSlider.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TeamSlider from "./TeamSlider";

const members = [
  { name: "Dr. Alpha", role: "Cardiology", bio: "Bio A.", image: "/a.jpg" },
  { name: "Dr. Beta", role: "Paediatrics", bio: "Bio B.", image: "/b.jpg" },
  { name: "Dr. Gamma", role: "Geriatrics", bio: "Bio C.", image: "/c.jpg" },
];

const renderSlider = (props = {}) =>
  render(
    <MemoryRouter>
      <TeamSlider members={members} {...props} />
    </MemoryRouter>,
  );

describe("TeamSlider", () => {
  it("renders the first member by default", () => {
    renderSlider();
    expect(screen.getByRole("heading", { name: "Dr. Alpha" })).toBeInTheDocument();
  });

  it("switches to a member when their thumbnail is clicked", async () => {
    const user = userEvent.setup();
    renderSlider();
    await user.click(screen.getByRole("button", { name: /show dr\. beta/i }));
    expect(screen.getByRole("heading", { name: "Dr. Beta" })).toBeInTheDocument();
  });

  it("ArrowRight advances and wraps", () => {
    renderSlider();
    const region = screen.getByRole("region", { name: /team/i });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Dr. Beta" })).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowRight" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Dr. Alpha" })).toBeInTheDocument();
  });

  it("ArrowLeft rewinds and wraps", () => {
    renderSlider();
    const region = screen.getByRole("region", { name: /team/i });
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: "Dr. Gamma" })).toBeInTheDocument();
  });

  it("renders fallback when members is empty", () => {
    render(
      <MemoryRouter>
        <TeamSlider members={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/team coming soon/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/site/team/TeamSlider.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/site/team/TeamSlider.tsx`:

```tsx
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TeamMember } from "@/data/team";
import DoctorCard from "./DoctorCard";
import ThumbnailNav from "./ThumbnailNav";

type Props = {
  members: TeamMember[];
};

const SWIPE_THRESHOLD = 60;

export const TeamSlider = ({ members }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  if (members.length === 0) {
    return (
      <section className="relative bg-white py-24" aria-label="Team">
        <p className="mx-auto max-w-7xl px-4 text-center text-brand-slate sm:px-6 lg:px-8">
          Team coming soon.
        </p>
      </section>
    );
  }

  const advance = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + members.length) % members.length);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      advance(dx < 0 ? 1 : -1);
    }
    touchStartRef.current = null;
  };

  const active = members[activeIndex];
  const transition = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      role="region"
      aria-label="Team"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative min-h-screen overflow-hidden bg-white py-20 focus:outline-none lg:py-28"
    >
      <div className="absolute inset-0 texture-waves opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-stretch gap-12 px-4 sm:px-6 lg:px-8">
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.98 }}
              transition={transition}
            >
              <DoctorCard member={active} eager={activeIndex === 0} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ThumbnailNav members={members} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  );
};

export default TeamSlider;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/site/team/TeamSlider.test.tsx`
Expected: PASS — all 5 tests green.

If a test fails because `AnimatePresence` keeps the previous heading mounted briefly during exit, the test waits for nothing — the assertion uses `getByRole`, which throws on multiple matches. If this happens, switch the failing assertion to `findByRole` (async) so framer-motion's microtask queue can flush:
```tsx
expect(await screen.findByRole("heading", { name: "Dr. Beta" })).toBeInTheDocument();
```
(Apply only if needed.)

- [ ] **Step 5: Commit**

```bash
git add src/components/site/team/TeamSlider.tsx src/components/site/team/TeamSlider.test.tsx
git commit -m "feat(team): add TeamSlider with thumbnail nav, keyboard, swipe"
```

---

## Task 5: Refine `TeamPreview` (home page)

**Files:**
- Modify: `src/components/site/TeamPreview.tsx`

- [ ] **Step 1: Apply the refinements**

Replace the entire contents of `src/components/site/TeamPreview.tsx` with:

```tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { team } from "@/data/team";

export const TeamPreview = () => (
  <section id="team" className="relative overflow-hidden bg-white py-24">
    <div className="absolute inset-0 texture-waves opacity-70" aria-hidden />
    <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-sky-soft/80 blur-3xl" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        animate
        eyebrow="Our Team"
        title="Meet the clinicians behind the care."
        subtitle="A small preview of our growing team of physicians, nurses, and specialists."
      />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05}>
            <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:shadow-[0_8px_30px_-12px_rgba(11,27,51,0.15)]">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={533}
                />
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
      <div className="mt-12 text-center">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pink hover:text-brand-navy"
        >
          Meet the full team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default TeamPreview;
```

Changes from the previous version: aspect changed from `4:5` to `3:4`, gap `6` → `8`, padding `20` → `24`, removed `hover:-translate-y-1`, softer hover shadow, replaced "coming soon" trailing line with a routed CTA, added `loading="lazy"` to images.

- [ ] **Step 2: Run the existing test sweep**

Run: `npm run test`
Expected: all green. (TeamPreview has no direct test today; the change is styling + a new `Link`, so other tests are unaffected.)

- [ ] **Step 3: Commit**

```bash
git add src/components/site/TeamPreview.tsx
git commit -m "feat(team): refine home preview cards and route to /team"
```

---

## Task 6: Wire `TeamSlider` into the `/team` page

**Files:**
- Modify: `src/pages/Team.tsx`

- [ ] **Step 1: Replace `<TeamPreview />` with the slider**

Replace the contents of `src/pages/Team.tsx` with:

```tsx
import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/shared/PageHero";
import TeamSlider from "@/components/site/team/TeamSlider";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import { team } from "@/data/team";
import heroDoctor from "@/assets/hero-doctor.jpg";

const TeamPage = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Our Team"
      title={<>The clinicians <span className="text-brand-pink">behind the care</span>.</>}
      subtitle="A growing team of physicians, nurses, and specialists — selected for both clinical excellence and the warmth they bring to patients."
      image={heroDoctor}
      crumbs={[{ label: "Home", to: "/" }, { label: "Team" }]}
    />
    <TeamSlider members={team} />
    <AppointmentStrip />
  </SiteLayout>
);

export default TeamPage;
```

- [ ] **Step 2: Run the full test suite**

Run: `npm run test`
Expected: all green.

- [ ] **Step 3: Lint**

Run: `npx eslint src/components/site/team src/components/site/TeamPreview.tsx src/pages/Team.tsx src/data/team.ts`
Expected: no errors.

- [ ] **Step 4: Manual verification**

Run `npm run dev` and visit:
- `/` — confirm the home `TeamPreview` shows 4 cards in 3:4 aspect, no translate on hover, soft shadow on hover, and a "Meet the full team →" link below the grid.
- Click the link → routes to `/team`.
- `/team` — confirm:
  - The slider section is large (≥ viewport height) with asymmetric layout (portrait on the left ~40%, info on the right ~60%) on desktop.
  - Clicking each thumbnail switches the active member with a smooth fade+slide transition.
  - Pressing `ArrowLeft` / `ArrowRight` while the section has focus also switches.
  - On mobile (DevTools mobile mode): portrait stacks above the info pane; thumbnails scroll horizontally; swiping the portrait left/right switches members.
  - The "View profile" button looks visibly disabled and shows the "Coming soon" tooltip on hover.
  - "Book Appointment" routes to `/contact#book`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Team.tsx
git commit -m "feat(team): wire TeamSlider into /team page"
```

---

## Self-review checklist (run before merging)

- [ ] All 12+ new tests pass with `npm run test`
- [ ] Lint clean on all touched files
- [ ] Home `/` preview matches the spec's refined card description
- [ ] `/team` slider thumbnail click + keyboard + swipe all switch the active member
- [ ] Empty `members=[]` shows "Team coming soon." instead of crashing
- [ ] `prefers-reduced-motion: reduce` (DevTools → Rendering) — slider switches instantly with no animation, but visual diff (heading + portrait + ring) is still clear
- [ ] No new dependencies added to `package.json`
