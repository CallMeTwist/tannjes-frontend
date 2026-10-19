import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export const CareHeading = ({ eyebrow, title, subtitle, align = "left", tone = "dark", className }: Props) => (
  <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <p
        className={cn(
          "font-serif text-lg italic",
          tone === "light" ? "text-care-secondary-soft" : "text-care-accent"
        )}
      >
        {eyebrow}
      </p>
    )}
    <h2
      className={cn(
        "mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]",
        tone === "light" ? "text-white" : "text-care-ink"
      )}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={cn(
          "mt-4 text-base leading-relaxed sm:text-lg",
          tone === "light" ? "text-white/80" : "text-care-ink/70"
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default CareHeading;
