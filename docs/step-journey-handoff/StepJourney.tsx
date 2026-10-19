/**
 * StepJourney: an animated "N easy steps" section.
 *
 * Desktop/tablet: a dashed wave path draws itself in, numbered circles pop in one by one
 * along the wave (up, down, up, down...), then the active step cycles every few seconds
 * with a pulsing ring, a gently bobbing icon and a solid line that fills the path up to it.
 * Visitors can click/focus any step to stop on it. Below the wave, the active step's
 * description fades in, with progress dots.
 * Phones: a vertical dashed line with the steps listed beside it.
 * Respects prefers-reduced-motion.
 *
 * Requirements: React 18+, Tailwind CSS 3+, framer-motion 10+ (also published as "motion").
 * Works with 3 to 7 steps. Pass any icon component (e.g. from lucide-react) per step.
 */
import { useEffect, useId, useRef, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

export type JourneyStep = {
  title: string;
  text: string;
  /** Any icon component that accepts className, e.g. from lucide-react. */
  icon: ComponentType<{ className?: string }>;
};

export type JourneyColors = {
  /** Main colour: active circle, numbers, progress line, buttons. */
  primary: string;
  /** Pale tint: completed circles. */
  primarySoft: string;
  /** Secondary colour: dashed line, inactive borders, dots. */
  secondary: string;
  /** Small "Step 2 of 5" label. */
  accent: string;
  /** Body text. */
  ink: string;
  /** Section background. */
  background: string;
};

// Default: Tannjes Home & Hospice Care teal palette.
const DEFAULT_COLORS: JourneyColors = {
  primary: "#1F5F5B",
  primarySoft: "#E6EFE8",
  secondary: "#8FAE9B",
  accent: "#B85C6E",
  ink: "#1E2B2A",
  background: "#FBF7F1",
};

type Props = {
  steps: JourneyStep[];
  title: string;
  subtitle?: string;
  /** Optional content under the animation, e.g. call-to-action buttons. */
  cta?: ReactNode;
  colors?: Partial<JourneyColors>;
  /** Milliseconds each step stays active while auto-cycling. */
  cycleMs?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const TOP = 80;
const BOTTOM = 205;
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");
const mix = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/** Evenly spaced points on a 1000 x 300 canvas, alternating high and low. */
function layout(count: number) {
  const nodes = Array.from({ length: count }, (_, i) => ({
    x: (1000 * (i + 0.5)) / count,
    y: i % 2 === 0 ? TOP : BOTTOM,
  }));
  let d = `M${nodes[0].x},${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1];
    const b = nodes[i];
    const mid = (a.x + b.x) / 2;
    d += ` C${mid},${a.y} ${mid},${b.y} ${b.x},${b.y}`;
  }
  return { nodes, d };
}

export function StepJourney({ steps, title, subtitle, cta, colors, cycleMs = 3200, className }: Props) {
  const c = { ...DEFAULT_COLORS, ...colors };
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const maskId = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { nodes, d } = layout(steps.length);
  const labelWidth = `${Math.min(18, 90 / steps.length)}%`;

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % steps.length), cycleMs);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, steps.length, cycleMs]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <section
      ref={ref}
      className={cx("relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8", className)}
      style={{ background: c.background, color: c.ink }}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(${mix(c.primary, 14)} 1px, transparent 1.4px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem]">{title}</h2>
          {subtitle && <p className="mt-4 text-base leading-relaxed opacity-70 sm:text-lg">{subtitle}</p>}
        </div>

        {/* Desktop / tablet: the wave */}
        <div className="relative mx-auto mt-16 hidden max-w-5xl pb-10 md:block">
          <div className="relative aspect-[1000/300]">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                {/* Reveals the dashed line by drawing a mask along it, so the dashes survive the draw-in */}
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="300">
                  <motion.path
                    d={d}
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
                d={d}
                fill="none"
                stroke={c.secondary}
                strokeWidth={2}
                strokeDasharray="6 8"
                vectorEffect="non-scaling-stroke"
                mask={`url(#${maskId})`}
              />
              {/* Progress line up to the active step */}
              <motion.path
                d={d}
                fill="none"
                stroke={c.primary}
                strokeWidth={3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: steps.length > 1 ? active / (steps.length - 1) : 1 }}
                transition={{ duration: reduce ? 0 : 0.9, ease }}
              />
            </svg>

            <ol>
              {steps.map((s, i) => {
                const node = nodes[i];
                const isActive = i === active;
                const done = i < active;
                const Icon = s.icon;
                return (
                  <motion.li
                    key={s.title}
                    className="absolute"
                    // Centre on the wave with framer's x/y (a Tailwind translate would be overwritten by the scale animation)
                    style={{ left: `${node.x / 10}%`, top: `${(node.y / 300) * 100}%`, width: labelWidth, x: "-50%", y: "-40px" }}
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
                          className="absolute -left-9 -top-8 font-serif text-6xl font-semibold leading-none transition-colors duration-500"
                          style={{ color: isActive ? c.primary : mix(c.secondary, 50) }}
                        >
                          {i + 1}
                        </span>
                        {isActive && !reduce && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full"
                            style={{ background: mix(c.primary, 25) }}
                            initial={{ scale: 1, opacity: 0.7 }}
                            animate={{ scale: 1.55, opacity: 0 }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <span
                          className="relative grid h-20 w-20 place-items-center rounded-full border-2 shadow-md transition-colors duration-500 group-focus-visible:ring-4"
                          style={{
                            borderColor: isActive || done ? c.primary : c.secondary,
                            background: isActive ? c.primary : done ? c.primarySoft : "#fff",
                            color: isActive ? "#fff" : c.primary,
                          }}
                        >
                          <motion.span
                            animate={isActive && !reduce ? { y: [0, -4, 0], rotate: [0, -6, 6, 0] } : { y: 0, rotate: 0 }}
                            transition={isActive ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                          >
                            <span aria-hidden><Icon className="h-8 w-8" /></span>
                          </motion.span>
                        </span>
                      </span>
                      <span
                        className={cx(
                          "mt-3 text-center font-serif text-lg leading-tight transition-opacity duration-500",
                          isActive ? "font-semibold opacity-100" : "opacity-60"
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
                <p className="font-serif text-base italic" style={{ color: c.accent }}>
                  Step {active + 1} of {steps.length}
                </p>
                <p className="mt-2 text-lg leading-relaxed opacity-75">{steps[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 flex justify-center gap-2" aria-hidden>
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={cx("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8" : "w-3")}
                  style={{ background: i === active ? c.primary : mix(c.secondary, 50) }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Phones: vertical path */}
        <ol className="relative mx-auto mt-12 max-w-md md:hidden">
          <motion.span
            aria-hidden
            className="absolute bottom-8 left-8 top-8 w-px origin-top border-l-2 border-dashed"
            style={{ borderColor: c.secondary }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {steps.map((s, i) => {
            const isActive = i === active;
            const Icon = s.icon;
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
                  className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500"
                  style={{
                    borderColor: isActive ? c.primary : c.secondary,
                    background: isActive ? c.primary : "#fff",
                    color: isActive ? "#fff" : c.primary,
                  }}
                >
                  <span aria-hidden><Icon className="h-7 w-7" /></span>
                </span>
                <div className="pt-1">
                  <p className="font-serif text-sm font-semibold" style={{ color: c.secondary }}>
                    Step {i + 1}
                  </p>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed opacity-70">{s.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {cta && <div className="mt-14 flex flex-col items-center gap-4 text-center md:mt-4">{cta}</div>}
      </div>
    </section>
  );
}

export default StepJourney;
