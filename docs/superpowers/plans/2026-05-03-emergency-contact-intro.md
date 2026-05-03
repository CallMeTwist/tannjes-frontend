# Emergency Contact Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a session-gated emergency splash plus a persistent emergency-call floating button across every route of the marketing site.

**Architecture:** Two new components mounted inside `SiteLayout`. `EmergencySplash` is a `sessionStorage`-gated full-viewport overlay that auto-dismisses after 3s with a "Continue" escape hatch. `EmergencyFloatingButton` is an always-visible `tel:` anchor styled as a FAB. Phone constants are added to `src/lib/contact.ts` so a future API swap (sub-project 3) is a one-file change.

**Tech Stack:** React 18 + TypeScript, Tailwind, framer-motion (already in deps), lucide-react icons, vitest + Testing Library.

**Spec:** [docs/superpowers/specs/2026-05-03-emergency-contact-intro-design.md](../specs/2026-05-03-emergency-contact-intro-design.md)

---

## File Structure

- **Modify** [src/lib/contact.ts](../../../src/lib/contact.ts) — add `TCL_PHONE_PRIMARY` and `TCL_PHONE_SECONDARY` constants
- **Create** `src/components/site/EmergencySplash.tsx` — session-gated overlay
- **Create** `src/components/site/EmergencySplash.test.tsx` — unit tests
- **Create** `src/components/site/EmergencyFloatingButton.tsx` — persistent FAB
- **Create** `src/components/site/EmergencyFloatingButton.test.tsx` — unit tests
- **Modify** [src/components/site/SiteLayout.tsx](../../../src/components/site/SiteLayout.tsx) — mount both components

---

## Task 1: Extend `contact.ts` with phone constants

**Files:**
- Modify: `src/lib/contact.ts`

- [ ] **Step 1: Add the two phone constants**

Edit `src/lib/contact.ts`. After the existing `TCL_EMAIL` line, add:

```ts
export const TCL_PHONE_PRIMARY = "+2347019090013";
export const TCL_PHONE_SECONDARY = "+2347086113160";
```

Final file contents should be:

```ts
export const TCL_WHATSAPP_NUMBER = "2347019090013";
export const TCL_EMAIL = "tannjes03@gmail.com";
export const TCL_PHONE_PRIMARY = "+2347019090013";
export const TCL_PHONE_SECONDARY = "+2347086113160";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TCL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl({ subject, body }: { subject: string; body: string }): string {
  return `mailto:${TCL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 2: Verify the existing tests still pass**

Run: `npx vitest run src/lib/contact.test.ts`
Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact.ts
git commit -m "feat(contact): add primary/secondary phone constants"
```

---

## Task 2: `EmergencyFloatingButton` (do this first — simpler, no session state)

**Files:**
- Create: `src/components/site/EmergencyFloatingButton.tsx`
- Create: `src/components/site/EmergencyFloatingButton.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/site/EmergencyFloatingButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmergencyFloatingButton from "./EmergencyFloatingButton";

describe("EmergencyFloatingButton", () => {
  it("renders a tel: link to the primary number", () => {
    render(<EmergencyFloatingButton />);
    const link = screen.getByRole("link", { name: /emergency/i });
    expect(link).toHaveAttribute("href", "tel:+2347019090013");
  });

  it("has an accessible name mentioning emergency", () => {
    render(<EmergencyFloatingButton />);
    expect(screen.getByRole("link", { name: /emergency/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/site/EmergencyFloatingButton.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/site/EmergencyFloatingButton.tsx`:

```tsx
import { Phone } from "lucide-react";
import { TCL_PHONE_PRIMARY } from "@/lib/contact";

export const EmergencyFloatingButton = () => (
  <a
    href={`tel:${TCL_PHONE_PRIMARY}`}
    aria-label="Emergency — call now"
    className="group fixed right-4 bottom-24 z-50 inline-flex items-center gap-2 rounded-full bg-brand-pink px-4 py-3 text-white shadow-lg shadow-brand-pink/40 ring-2 ring-white/40 transition hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 print:hidden md:right-6 md:bottom-6"
  >
    <span
      aria-hidden
      className="absolute inset-0 -z-10 rounded-full bg-brand-pink/40 motion-safe:animate-[emergencyPulse_2s_ease-in-out_infinite]"
    />
    <Phone className="h-5 w-5" />
    <span className="hidden text-sm font-semibold md:inline">Emergency</span>
  </a>
);

export default EmergencyFloatingButton;
```

- [ ] **Step 4: Add the pulse keyframes**

Edit `src/index.css`. Find the `@layer utilities` section (or the bottom of the file if no such layer exists) and add:

```css
@keyframes emergencyPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.4); opacity: 0; }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/components/site/EmergencyFloatingButton.test.tsx`
Expected: PASS, both tests green.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/EmergencyFloatingButton.tsx src/components/site/EmergencyFloatingButton.test.tsx src/index.css
git commit -m "feat(site): add persistent emergency call floating button"
```

---

## Task 3: `EmergencySplash` — render & dismiss logic

**Files:**
- Create: `src/components/site/EmergencySplash.tsx`
- Create: `src/components/site/EmergencySplash.test.tsx`

The test suite uses fake timers (the component has a 3s auto-dismiss).

- [ ] **Step 1: Write the failing tests**

Create `src/components/site/EmergencySplash.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EmergencySplash from "./EmergencySplash";

const FLAG = "tcl-emergency-splash-seen";

describe("EmergencySplash", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the dialog when the session flag is absent", () => {
    render(<EmergencySplash />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+234 701 909 0013/ })).toHaveAttribute(
      "href",
      "tel:+2347019090013",
    );
  });

  it("renders nothing when the session flag is set", () => {
    sessionStorage.setItem(FLAG, "1");
    render(<EmergencySplash />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sets the flag and unmounts on Continue tap", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EmergencySplash />);
    await user.click(screen.getByRole("button", { name: /continue to site/i }));
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("auto-dismisses after 3 seconds and sets the flag", () => {
    render(<EmergencySplash />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses on Escape key", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<EmergencySplash />);
    await user.keyboard("{Escape}");
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/site/EmergencySplash.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/site/EmergencySplash.tsx`:

```tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Siren } from "lucide-react";
import { TCL_PHONE_PRIMARY, TCL_PHONE_SECONDARY } from "@/lib/contact";

const FLAG = "tcl-emergency-splash-seen";
const AUTO_DISMISS_MS = 3000;
const AUTO_DISMISS_MS_REDUCED_MOTION = 8000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const formatNumber = (raw: string) => {
  // "+2347019090013" -> "+234 701 909 0013"
  if (!raw.startsWith("+234") || raw.length !== 14) return raw;
  return `+234 ${raw.slice(4, 7)} ${raw.slice(7, 10)} ${raw.slice(10)}`;
};

export const EmergencySplash = () => {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(FLAG) === null;
  });

  useEffect(() => {
    if (!open) return;
    const delay = prefersReducedMotion() ? AUTO_DISMISS_MS_REDUCED_MOTION : AUTO_DISMISS_MS;
    const timer = window.setTimeout(() => dismiss(), delay);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    sessionStorage.setItem(FLAG, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-splash-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy px-6"
        >
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white motion-safe:animate-[emergencyBadgePulse_2s_ease-in-out_infinite]">
              <Siren className="h-3.5 w-3.5" /> Emergency
            </span>
            <h2
              id="emergency-splash-heading"
              className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl"
            >
              In an emergency?
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Our team is reachable 24/7. Tap to call now.
            </p>
            <a
              href={`tel:${TCL_PHONE_PRIMARY}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-pink px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-pink/30 hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="h-5 w-5" /> {formatNumber(TCL_PHONE_PRIMARY)}
            </a>
            <a
              href={`tel:${TCL_PHONE_SECONDARY}`}
              className="mt-3 text-sm text-white/80 hover:text-white"
            >
              or {formatNumber(TCL_PHONE_SECONDARY)}
            </a>
            <button
              type="button"
              onClick={dismiss}
              autoFocus
              className="mt-8 text-xs uppercase tracking-wider text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Continue to site
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencySplash;
```

- [ ] **Step 4: Add the badge keyframes**

Edit `src/index.css`. Add (next to the previous `@keyframes emergencyPulse` you added in Task 2):

```css
@keyframes emergencyBadgePulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.05); opacity: 1; }
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run src/components/site/EmergencySplash.test.tsx`
Expected: PASS — all 5 tests green.

If a test fails because `framer-motion` exit animation is interfering with unmount, the tests already advance timers by 400ms (longer than the 300ms exit) — this should suffice. If it still fails, add `transition={{ duration: 0 }}` conditionally based on a test-detection flag is **not** the right path; instead inspect the actual failure and add a longer `vi.advanceTimersByTime` window (up to 500ms) to the failing test.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/EmergencySplash.tsx src/components/site/EmergencySplash.test.tsx src/index.css
git commit -m "feat(site): add session-gated emergency splash overlay"
```

---

## Task 4: Mount both components in `SiteLayout`

**Files:**
- Modify: `src/components/site/SiteLayout.tsx`

- [ ] **Step 1: Add imports and mount the components**

Edit `src/components/site/SiteLayout.tsx`. Add two imports near the top:

```tsx
import EmergencySplash from "@/components/site/EmergencySplash";
import EmergencyFloatingButton from "@/components/site/EmergencyFloatingButton";
```

Then update the JSX so the new components render after `Footer` and before/around `MobileBookCTA`:

```tsx
return (
  <div className="min-h-screen bg-white overflow-x-hidden">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-pink focus:px-3 focus:py-2 focus:text-sm focus:text-white"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main">{children}</main>
    <Footer />
    <MobileBookCTA />
    <EmergencyFloatingButton />
    <EmergencySplash />
  </div>
);
```

- [ ] **Step 2: Run the full test suite**

Run: `npm run test`
Expected: all green. The SiteLayout has no direct test, but adding components there should not break any sibling tests.

- [ ] **Step 3: Manual verification — splash**

Run: `npm run dev`. Open the site in a browser.
- First load: splash overlay should appear with the navy background, pink "Emergency" pulsing badge, primary number as a big pink button, secondary number below, "Continue to site" link.
- Wait 3s — splash fades out automatically.
- Refresh: splash does **not** reappear (sessionStorage flag set).
- Open a new tab → splash reappears (new session).
- Press Esc on the splash before it auto-dismisses — it goes away immediately.
- Tap "Continue to site" — it goes away immediately.

- [ ] **Step 4: Manual verification — floating button**

Still in dev mode:
- Pink pill "Emergency" button is visible bottom-right on desktop.
- On a narrow viewport (DevTools mobile mode), it's an icon-only round button at `bottom-24 right-4`, **not overlapping** the `MobileBookCTA` strip (which appears after scrolling past 600px).
- Tapping the button opens the device's dial prompt to `+2347019090013` (mobile) or shows a `tel:` handler dialog (desktop).

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no new errors introduced by the changes.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/SiteLayout.tsx
git commit -m "feat(site): mount emergency splash and floating button in layout"
```

---

## Self-review checklist (run before merging)

- [ ] Splash auto-dismisses after 3s in browser
- [ ] sessionStorage flag is set on dismiss (verify in DevTools → Application → Session Storage)
- [ ] Floating button visible on every page (check `/`, `/about`, `/contact`, `/404`)
- [ ] Floating button does not overlap `MobileBookCTA` on mobile after scrolling past 600px
- [ ] No lint errors
- [ ] All vitest specs green
- [ ] `prefers-reduced-motion: reduce` (DevTools → Rendering pane) — pulses stop, splash still appears and dismisses
