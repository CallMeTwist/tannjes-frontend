import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { buildWhatsAppUrl } from "@/lib/contact";
import CareHeading from "@/components/care/CareHeading";
import { steps } from "@/data/careHome";

// Positions on a 1000 x 300 canvas: a gentle wave going up, down, up, down, up.
const NODES = [
  { x: 100, y: 80 },
  { x: 300, y: 205 },
  { x: 500, y: 80 },
  { x: 700, y: 205 },
  { x: 900, y: 80 },
];
const WAVE = "M100,80 C200,80 200,205 300,205 C400,205 400,80 500,80 C600,80 600,205 700,205 C800,205 800,80 900,80";
const CYCLE_MS = 3200;
const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showCta?: boolean;
};

/**
 * "Care in 5 simple steps": an animated journey inspired by step illustrations on
 * hospital sites: a wave path draws in, each step pops in, then the active step cycles.
 */
export const CareJourney = ({
  eyebrow = "How it works",
  title = "Getting care in 5 steps",
  subtitle = "Here is what happens from your first call to your first visit.",
  showCta = true,
}: Props) => {
  const settings = useSettings();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const step = steps[active];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-care-cream px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(var(--care-primary)/0.14)_1px,transparent_1.4px)] [background-size:22px_22px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <CareHeading align="center" eyebrow={eyebrow} title={title} subtitle={subtitle} />

        {/* Desktop / tablet: the wave */}
        <div className="relative mx-auto mt-16 hidden max-w-5xl pb-10 md:block">
          <div className="relative aspect-[1000/300]">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <mask id="care-journey-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="300">
                  <motion.path
                    d={WAVE}
                    fill="none"
                    stroke="white"
                    strokeWidth={24}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={inView || reduce ? { pathLength: 1 } : undefined}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                </mask>
              </defs>
              <path
                d={WAVE}
                fill="none"
                stroke="rgb(var(--care-secondary))"
                strokeWidth={2}
                strokeDasharray="6 8"
                vectorEffect="non-scaling-stroke"
                mask="url(#care-journey-reveal)"
              />
              <motion.path
                d={WAVE}
                fill="none"
                stroke="rgb(var(--care-primary))"
                strokeWidth={3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: active / (steps.length - 1) }}
                transition={{ duration: reduce ? 0 : 0.9, ease }}
              />
            </svg>

            <ol>
              {steps.map((s, i) => {
                const node = NODES[i];
                const isActive = i === active;
                const done = i < active;
                return (
                  <motion.li
                    key={s.title}
                    className="absolute w-44"
                    style={{ left: `${node.x / 10}%`, top: `${(node.y / 300) * 100}%`, x: "-50%", y: "-40px" }}
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    animate={inView || reduce ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ delay: reduce ? 0 : 0.5 + i * 0.25, type: "spring", stiffness: 220, damping: 18 }}
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onFocus={() => select(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group mx-auto flex flex-col items-center focus:outline-none"
                    >
                      <span className="relative">
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -left-9 -top-8 font-serif text-6xl font-semibold leading-none transition-colors duration-500",
                            isActive ? "text-care-primary" : "text-care-secondary/50"
                          )}
                        >
                          {i + 1}
                        </span>
                        {isActive && !reduce && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-care-primary/25"
                            initial={{ scale: 1, opacity: 0.7 }}
                            animate={{ scale: 1.55, opacity: 0 }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <span
                          className={cn(
                            "relative grid h-20 w-20 place-items-center rounded-full border-2 shadow-soft transition-colors duration-500 group-focus-visible:ring-4 group-focus-visible:ring-care-primary/30",
                            isActive
                              ? "border-care-primary bg-care-primary text-white"
                              : done
                                ? "border-care-primary bg-care-secondary-soft text-care-primary"
                                : "border-care-secondary bg-white text-care-primary group-hover:border-care-primary"
                          )}
                        >
                          <motion.span
                            animate={isActive && !reduce ? { y: [0, -4, 0], rotate: [0, -6, 6, 0] } : { y: 0, rotate: 0 }}
                            transition={isActive ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                          >
                            <s.icon className="h-8 w-8" aria-hidden />
                          </motion.span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-3 text-center font-serif text-lg leading-tight transition-colors duration-500",
                          isActive ? "font-semibold text-care-ink" : "text-care-ink/60"
                        )}
                      >
                        <span className="sr-only">Step {i + 1}: </span>
                        {s.title}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Active step detail */}
          <div className="mx-auto mt-24 max-w-xl text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <p className="font-serif text-base italic text-care-accent">
                  Step {active + 1} of {steps.length}
                </p>
                <p className="mt-2 text-lg leading-relaxed text-care-ink/75">{step.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 flex justify-center gap-2" aria-hidden>
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active ? "w-8 bg-care-primary" : "w-3 bg-care-secondary/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: a vertical path */}
        <ol className="relative mx-auto mt-12 max-w-md md:hidden">
          <motion.span
            aria-hidden
            className="absolute bottom-8 left-8 top-8 w-px origin-top border-l-2 border-dashed border-care-secondary"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.li
                key={s.title}
                className="relative flex gap-5 pb-8 last:pb-0"
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease }}
              >
                <span
                  className={cn(
                    "relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500",
                    isActive ? "border-care-primary bg-care-primary text-white" : "border-care-secondary bg-white text-care-primary"
                  )}
                >
                  <s.icon className="h-7 w-7" aria-hidden />
                </span>
                <div className="pt-1">
                  <p className="font-serif text-sm font-semibold text-care-secondary">Step {i + 1}</p>
                  <h3 className="text-xl text-care-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-care-ink/70">{s.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {showCta && (
          <div className="mt-14 flex flex-col items-center gap-4 text-center md:mt-4">
            <p className="text-care-ink/70">Ready for step 1?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
                <a href={`tel:${settings.phone_primary}`}>
                  <Phone className="mr-2 h-5 w-5" /> Book a call
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary"
              >
                <a
                  href={buildWhatsAppUrl("Hello, I'd like to get started with care.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp us
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareJourney;
