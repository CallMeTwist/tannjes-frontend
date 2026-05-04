import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** When true, eyebrow / title / subtitle reveal with the Hero-style staggered clip-path animation. */
  animate?: boolean;
  /** Override default text colors when used on dark backgrounds. */
  variant?: "default" | "light";
};

const ease = [0.22, 1, 0.36, 1] as const;

const eyebrowVariants = {
  hidden: { opacity: 0, x: -32, clipPath: "inset(0 100% 0 0)" },
  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
};
const titleVariants = {
  hidden: { opacity: 0, x: -64, clipPath: "inset(0 100% 0 0)" },
  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
};
const subtitleVariants = {
  hidden: { opacity: 0, x: -48, clipPath: "inset(0 100% 0 0)" },
  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  animate = false,
  variant = "default",
}: Props) {
  const reduce = useReducedMotion();
  const useAnim = animate && !reduce;

  const wrapperClass = cn(
    "max-w-2xl",
    align === "center" && "mx-auto text-center",
    className,
  );

  const titleColor = variant === "light" ? "text-white" : "text-brand-navy";
  const subtitleColor = variant === "light" ? "text-white/80" : "text-brand-slate";

  const motionProps = useAnim
    ? {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, margin: "-80px" },
      }
    : {};

  return (
    <div className={wrapperClass}>
      {eyebrow && (
        <motion.span
          {...motionProps}
          variants={useAnim ? eyebrowVariants : undefined}
          transition={useAnim ? { duration: 0.7, ease, delay: 0.05 } : undefined}
          className="inline-flex items-center gap-2 rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        {...motionProps}
        variants={useAnim ? titleVariants : undefined}
        transition={useAnim ? { duration: 0.85, ease, delay: 0.2 } : undefined}
        className={cn("mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl", titleColor)}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          {...motionProps}
          variants={useAnim ? subtitleVariants : undefined}
          transition={useAnim ? { duration: 0.8, ease, delay: 0.4 } : undefined}
          className={cn("mt-4 text-base leading-relaxed sm:text-lg", subtitleColor)}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
