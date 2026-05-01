import aboutImg from "@/assets/about-care.jpg";
import { Heart, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const values = [
  { icon: Heart, label: "Compassion" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: ShieldCheck, label: "Trust" },
  { icon: Sparkles, label: "Extraordinary Care" },
];

export const About = () => (
  <section id="about" className="bg-white py-20">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <img
            src={aboutImg}
            alt="Tannjes Clinics in care"
            className="h-full w-full object-cover"
            width={640}
            height={520}
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <SectionHeading
          eyebrow="About Tannjes"
          align="left"
          title="Premium concierge medicine, built around you."
          subtitle="Tannjes Clinics Limited delivers compassionate, expert care wherever you need it — at home, at work, or in transit. We exist to make great healthcare effortlessly accessible."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
          {values.map((v) => (
            <div
              key={v.label}
              className="flex items-center gap-3 rounded-xl border border-brand-pink-soft bg-white px-3 py-2 shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink">
                <v.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-brand-navy">{v.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
