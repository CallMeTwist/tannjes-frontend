import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { team } from "@/data/team";

export const TeamPreview = () => (
  <section id="team" className="relative overflow-hidden bg-white py-24">
    <div className="absolute inset-0 texture-waves opacity-70" aria-hidden />
    <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-sky-soft/80 blur-3xl" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        animate
        eyebrow="Our Team"
        title="Meet the clinicians behind the care."
        subtitle="A small preview of our growing team of physicians, nurses, and specialists."
      />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05}>
            <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:shadow-[0_8px_30px_-12px_rgba(11,27,51,0.15)]">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={533}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-brand-navy">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-pink">{m.role}</p>
                <p className="mt-2 text-sm text-brand-slate">{m.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/team"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pink hover:text-brand-navy"
        >
          Meet the full team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default TeamPreview;
