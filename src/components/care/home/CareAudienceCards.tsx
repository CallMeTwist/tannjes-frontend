import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { audiences } from "@/data/careHome";

export const CareAudienceCards = () => (
  <section aria-labelledby="audience-heading" className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
    <h2 id="audience-heading" className="sr-only">How can we help?</h2>
    <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
      {audiences.map((a, i) => (
        <Reveal key={a.title} delay={i * 0.08}>
          <Link
            to={a.to}
            className="group flex h-full flex-col rounded-2xl border border-care-sand bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-care-secondary"
          >
            <span className="font-serif text-xl font-semibold text-care-ink">{a.title}</span>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-care-ink/70">{a.text}</span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-care-primary">
              {a.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  </section>
);

export default CareAudienceCards;
