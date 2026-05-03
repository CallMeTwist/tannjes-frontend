import { useCallback, useEffect, useRef, useState } from "react";
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
  const continueRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(FLAG, "1");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      continueRef.current?.focus();
    }
  }, [open]);

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
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-splash-heading"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy px-6 motion-safe:animate-[fadeIn_0.3s_ease]"
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
          onClick={() => window.setTimeout(dismiss, 300)}
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
          ref={continueRef}
          type="button"
          onClick={dismiss}
          className="mt-8 text-xs uppercase tracking-wider text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          Continue to site
        </button>
      </div>
    </div>
  );
};

export default EmergencySplash;
