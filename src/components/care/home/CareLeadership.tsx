import { Award, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { md } from "@/data/leadership";
import mdImg from "@/assets/care/md-dr-jennifer.jpeg";

export const CareLeadership = () => (
  <section id="leadership" className="scroll-mt-28 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
      <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div
          aria-hidden
          className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] bg-care-secondary-soft sm:-left-6 sm:-top-6"
        />
        <img
          src={mdImg}
          alt={`${md.name}, ${md.role}`}
          className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-card"
        />
      </Reveal>

      <div>
        <p className="font-serif text-lg italic text-care-accent">Meet our Managing Director</p>
        <h2 className="mt-3 text-3xl leading-tight text-care-ink sm:text-4xl md:text-[2.75rem]">{md.name}</h2>
        <p className="mt-2 font-medium text-care-primary">{md.role}</p>

        <div className="mt-6 space-y-4 leading-relaxed text-care-ink/75">
          {md.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-care-sand py-6">
          {md.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs leading-snug text-care-ink/60 sm:text-sm">{s.label}</dt>
              <dd className="font-serif text-2xl font-semibold text-care-primary sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {md.credentials.map((c, i) => {
            const Icon = i < 2 ? GraduationCap : Award;
            return (
              <li key={c} className="flex gap-2.5 text-sm text-care-ink/80">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-care-secondary" aria-hidden />
                {c}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default CareLeadership;
