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
