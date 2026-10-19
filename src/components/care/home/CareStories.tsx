import { Quote } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import CareHeading from "@/components/care/CareHeading";
import { testimonials } from "@/data/testimonials";

// PLACEHOLDER: reuses the hospital testimonials until real family stories (with consent) are supplied.
const [featured, ...others] = [testimonials[2], testimonials[0], testimonials[1]];

export const CareStories = () => (
  <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <CareHeading title="What families say" />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-3xl bg-care-primary p-8 text-white sm:p-12">
          <figure>
            <Quote className="h-10 w-10 text-care-secondary" aria-hidden />
            <blockquote className="mt-6 font-serif text-2xl leading-snug sm:text-3xl">“{featured.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <img src={featured.image} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/30" />
              <span>
                <span className="block font-semibold">{featured.name}</span>
                <span className="block text-sm text-white/70">{featured.condition}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid gap-6">
          {others.map((t, i) => (
            <Reveal key={t.name} delay={0.1 + i * 0.08} className="rounded-3xl border border-care-sand bg-white p-6 sm:p-8">
              <figure>
                <blockquote className="text-care-ink/80">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img src={t.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <span>
                    <span className="block text-sm font-semibold text-care-ink">{t.name}</span>
                    <span className="block text-xs text-care-ink/60">{t.condition}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CareStories;
