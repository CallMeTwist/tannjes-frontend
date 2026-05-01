import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { team } from "@/data/team";

export const TeamPreview = () => (
  <section id="team" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Our Team"
        title="Meet the clinicians behind the care."
        subtitle="A small preview of our growing team of physicians, nurses, and specialists."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.05}>
            <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  width={400}
                  height={500}
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
      <p className="mt-10 text-center text-sm text-brand-slate">Meet the full team — coming soon.</p>
    </div>
  </section>
);

export default TeamPreview;
