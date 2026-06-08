import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useDepartments } from "@/hooks/useDepartments";

export const Departments = () => {
  const departments = useDepartments();

  return (
    <section id="departments" className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 texture-cross opacity-80" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Departments"
          title="Sixteen specialties. One trusted partner."
          subtitle="Coordinated, multidisciplinary expertise across every stage of care. Tap a department to meet the consultants and start a telehealth consultation."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {departments.map((sp, i) => (
            <Reveal key={sp.slug} delay={i * 0.03}>
              <Link
                to={`/departments/${sp.slug}`}
                className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-brand-pink-soft/60 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-pink hover:shadow-lg"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
                  <sp.icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold text-brand-navy">{sp.name}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-pink opacity-0 transition group-hover:opacity-100">
                  View department <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
