import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Services = () => (
  <section id="services" className="relative overflow-hidden bg-brand-cream py-20">
    <div className="absolute inset-0 texture-dots-pink opacity-60" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        animate
        eyebrow="What We Do"
        title="Care that comes to you."
        subtitle="Seven concierge service lines designed around real life — from doctor visits at home to skilled nursing and medical travel."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-brand-pink-soft/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-pink/40 hover:shadow-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-pink-soft/0 transition group-hover:bg-brand-pink-soft/60" aria-hidden />
              <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold text-brand-navy">{s.title}</h3>
              <p className="relative mt-2 text-sm text-brand-slate">{s.description}</p>
              <ul className="relative mt-4 space-y-1.5 text-sm text-brand-slate">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" /> {b}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink transition group-hover:gap-2"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
