import { specialties } from "@/data/specialties";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const Departments = () => (
  <section id="departments" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Our Departments"
        title="Sixteen specialties. One trusted partner."
        subtitle="Coordinated, multidisciplinary expertise across every stage of care."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {specialties.map((sp, i) => (
          <Reveal key={sp.name} delay={i * 0.03}>
            <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-brand-pink-soft/60 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-pink hover:shadow-lg">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
                <sp.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-brand-navy">{sp.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Departments;
