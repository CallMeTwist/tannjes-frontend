import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import imgHome from "@/assets/service-home.jpg";
import imgElderly from "@/assets/service-elderly.jpg";
import imgNursing from "@/assets/service-nursing.jpg";
import imgNewborn from "@/assets/service-newborn.jpg";

const reasons = [
  {
    title: "Care that comes to you",
    body: "Skip the waiting room. We bring physicians and nurses directly to your home, hotel, or office.",
    image: imgHome,
    points: ["Same-day visits", "Citywide coverage in Abuja", "Equipment and supplies included"],
  },
  {
    title: "Compassion at every step",
    body: "Our teams are trained not just clinically, but in dignity-first care for elderly and palliative patients.",
    image: imgElderly,
    points: ["Trauma-informed approach", "Family communication", "End-of-life sensitivity"],
  },
  {
    title: "Concierge from start to finish",
    body: "From hospital discharge to home recovery, we coordinate physicians, nurses, and family — so you don't have to.",
    image: imgNursing,
    points: ["Single point of contact", "Care plan handoff", "Pharmacy and lab logistics"],
  },
  {
    title: "Trusted, licensed, accountable",
    body: "Tannjes Clinics is a registered Nigerian medical company (RC: 1355314) with vetted, licensed physicians.",
    image: imgNewborn,
    points: ["Verified clinicians", "Documented care plans", "24/7 escalation"],
  },
];

export const WhyChoose = () => (
  <section id="why" className="bg-brand-cream py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Why Tannjes"
        title="The concierge advantage."
        subtitle="Four reasons families across Abuja choose us for the people they love most."
      />
      <div className="mt-14 space-y-16">
        {reasons.map((r, i) => (
          <Reveal key={r.title}>
            <div
              className={`grid items-center gap-10 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img src={r.image} alt="" className="h-full w-full object-cover" width={640} height={420} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">{r.title}</h3>
                <p className="mt-3 text-brand-slate">{r.body}</p>
                <ul className="mt-5 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-brand-navy">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
