import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, Siren, X } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const FLAG = "tcl-emergency-splash-seen";
const APPEAR_DELAY_MS = 900;

const formatNumber = (raw: string) => {
  if (!raw.startsWith("+234") || raw.length !== 14) return raw;
  return `+234 ${raw.slice(4, 7)} ${raw.slice(7, 10)} ${raw.slice(10)}`;
};

export const EmergencySplash = () => {
  const settings = useSettings();
  const shouldShow =
    typeof window !== "undefined" && sessionStorage.getItem(FLAG) === null;
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(FLAG, "1");
    setOpen(false);
    window.setTimeout(() => setMounted(false), 250);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    setMounted(true);
    const t = window.setTimeout(() => setOpen(true), APPEAR_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [shouldShow]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-splash-heading"
      className={`fixed inset-0 z-[100] flex items-end justify-center px-4 pb-6 transition-opacity duration-300 sm:items-center sm:p-6 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Dismiss emergency notice"
        onClick={dismiss}
        tabIndex={-1}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-navy/40 transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-95 sm:translate-y-0"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={dismiss}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-slate hover:bg-brand-pink-soft hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="bg-brand-navy px-6 pt-6 pb-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white motion-safe:animate-[emergencyBadgePulse_2s_ease-in-out_infinite]">
            <Siren className="h-3.5 w-3.5" /> Emergency
          </span>
          <h2
            id="emergency-splash-heading"
            className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl"
          >
            In an emergency?
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Our team is reachable 24/7. Tap to call now.
          </p>
        </div>
        <div className="px-6 py-6 text-center">
          <a
            href={`tel:${settings.phone_primary}`}
            onClick={() => window.setTimeout(dismiss, 300)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-pink px-5 py-3 text-base font-semibold text-white shadow-lg shadow-brand-pink/30 hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
          >
            <Phone className="h-5 w-5" /> {formatNumber(settings.phone_primary)}
          </a>
          <a
            href={`tel:${settings.phone_secondary}`}
            className="mt-3 block text-sm text-brand-slate hover:text-brand-navy"
          >
            or {formatNumber(settings.phone_secondary)}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="mt-5 text-xs uppercase tracking-wider text-brand-slate/70 underline-offset-4 hover:text-brand-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60"
          >
            Continue to site
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencySplash;
