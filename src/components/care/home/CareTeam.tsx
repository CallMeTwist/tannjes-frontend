import { Reveal } from "@/components/shared/Reveal";
import CareHeading from "@/components/care/CareHeading";
import { teamRoles } from "@/data/careHome";
import teamImg from "@/assets/care/care-team.jpeg";

export const CareTeam = () => (
  <section className="bg-care-secondary-soft/60 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <CareHeading
        align="center"
        title="Your care team"
        subtitle="Our doctors, nurses and carers work as one team, and keep your own doctors informed."
      />
      <Reveal className="mx-auto mt-12 max-w-5xl">
        <img
          src={teamImg}
          alt="Members of the Tannjes care team in their purple uniforms"
          loading="lazy"
          className="aspect-[16/9] w-full rounded-3xl object-cover object-[center_30%] shadow-card sm:aspect-[16/7]"
        />
      </Reveal>
      <ul className="mx-auto mt-8 grid max-w-5xl gap-px overflow-hidden rounded-2xl bg-care-sand sm:grid-cols-2 lg:grid-cols-3">
        {teamRoles.map((r, i) => (
          <Reveal as="li" key={r.title} delay={i * 0.04} className="bg-care-cream p-6 sm:p-8">
            <h3 className="text-xl text-care-ink">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{r.text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);

export default CareTeam;
