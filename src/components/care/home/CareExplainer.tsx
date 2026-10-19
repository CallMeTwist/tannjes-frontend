import { Reveal } from "@/components/shared/Reveal";
import CareHeading from "@/components/care/CareHeading";
import { careTypes } from "@/data/careHome";

export const CareExplainer = () => (
  <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div>
        <CareHeading
          title="What the different types of care mean"
          subtitle="People often use these terms to mean the same thing, but they are different. Here is a short guide."
        />
        <aside className="mt-10 rounded-3xl border-l-4 border-care-accent bg-care-accent-soft p-7 sm:p-9">
          <p className="font-serif text-3xl font-semibold leading-tight text-care-ink sm:text-[2.1rem]">
            Palliative care is about <span className="italic text-care-accent">living well.</span>
          </p>
          <p className="mt-4 text-lg leading-relaxed text-care-ink/75">
            It eases the pain and the worry, so people can keep doing what they love: time with family, Sunday service
            or Jumu&apos;ah prayers, a good meal, a visit from old friends. Asking for it early is a hopeful choice, and
            a brave one.
          </p>
        </aside>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {careTypes.map((c, i) => (
          <Reveal key={c.term} delay={i * 0.06} className="rounded-2xl border border-care-sand bg-white p-6">
            <span className="font-serif text-sm font-semibold text-care-secondary">0{i + 1}</span>
            <dt className="mt-2 font-serif text-xl font-semibold text-care-ink">{c.term}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-care-ink/70">{c.text}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
);

export default CareExplainer;
