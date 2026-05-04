import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  crumbs?: Crumb[];
};

export const PageHero = ({ eyebrow, title, subtitle, image, crumbs }: Props) => {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      {image ? (
        <>
          <div
            className={`absolute inset-0 bg-cover bg-center ${reduce ? "" : "kenburns"}`}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/40" aria-hidden />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#102447] to-brand-navy" aria-hidden />
          <div className="absolute inset-0 texture-cross-light opacity-80" aria-hidden />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_50%,rgba(225,29,116,0.30),transparent_60%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/70">
            <ol className="flex flex-wrap items-center gap-1">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  {c.to ? (
                    <Link to={c.to} className="hover:text-white">{c.label}</Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/25 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" /> {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>
          )}
        </motion.div>
      </div>

      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 60" className="block h-10 w-full" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 L0 30 Q360 0 720 30 T1440 30 L1440 60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default PageHero;
