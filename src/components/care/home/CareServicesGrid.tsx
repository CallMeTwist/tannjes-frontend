import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import CareHeading from "@/components/care/CareHeading";
import { careServices } from "@/data/careServices";

export const CareServicesGrid = () => (
  <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <CareHeading
        title="Our services"
        subtitle="Each care plan is agreed with you and your family, and we change it as your needs change."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {careServices.map((s, i) => (
          <Reveal key={s.to} delay={(i % 4) * 0.06}>
            <Link
              to={s.to}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-care-sand transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_30%] transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl text-care-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{s.summary}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-care-ink/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-care-secondary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-care-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  <span className="sr-only">about {s.title}</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default CareServicesGrid;
