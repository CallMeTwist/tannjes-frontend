import { Link } from "react-router-dom";
import { ArrowUpRight, FlaskConical, Hospital, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOSPITAL_BRAND, HOSPITAL_HOME } from "@/data/careNav";
import hospitalImg from "@/assets/care/care-team.jpeg";

const features = [
  { icon: Stethoscope, label: "Specialist departments" },
  { icon: FlaskConical, label: "Laboratory & diagnostics" },
  { icon: Hospital, label: "Admission when needed" },
];

export const CareHospitalBridge = () => (
  <section className="px-4 py-20 sm:px-6 lg:px-8">
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-care-ink text-white">
      <img src={hospitalImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-care-ink via-care-ink/90 to-care-ink/40" />
      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:p-16">
        <div>
          <p className="font-serif text-lg italic text-care-secondary">Part of {HOSPITAL_BRAND}</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Hospital care when you need it
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            If a patient needs tests, a specialist or a hospital stay, we arrange it at Tannjes Clinics and bring
            them home again afterwards.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
            {features.map((f) => (
              <li key={f.label} className="inline-flex items-center gap-2">
                <f.icon className="h-4 w-4 text-care-secondary" aria-hidden />
                {f.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:text-right">
          <Button asChild size="lg" className="rounded-full bg-white text-care-ink hover:bg-care-secondary-soft">
            <Link to={HOSPITAL_HOME}>
              Visit {HOSPITAL_BRAND} <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CareHospitalBridge;
