import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Testimonials = () => {
  const [ref, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-20">
      <div className="absolute inset-0 texture-dots-pink opacity-70" aria-hidden />
      <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-pink-soft/70 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading animate eyebrow="What Families Say" title="Stories from people we've cared for." />
        <div className="mt-12 overflow-hidden" ref={ref} aria-live="polite">
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-pink-soft/60 md:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
              >
                <div className="flex gap-1 text-brand-pink" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-brand-navy">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.image} alt="" className="h-10 w-10 rounded-full object-cover" width={40} height={40} />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
                    <p className="text-xs text-brand-slate">{t.condition}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={prev}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-pink-soft bg-white text-brand-pink hover:bg-brand-pink hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
