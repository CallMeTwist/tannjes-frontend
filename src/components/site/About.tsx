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
  <section id="about" className="relative overflow-hidden bg-white py-20">
    <div className="absolute inset-0 texture-waves opacity-60" aria-hidden />
    <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-pink-soft/60 blur-3xl" aria-hidden />
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
      <Reveal>
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-pink/20 to-sky/30 blur-xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-white">
            <img
              src={aboutImg}
              alt="Tannjes Clinics in care"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              width={640}
              height={520}
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-pink-soft sm:block">
            <p className="font-display text-3xl font-extrabold text-brand-pink">10+ yrs</p>
            <p className="text-xs font-medium text-brand-slate">Concierge medicine</p>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <SectionHeading
          animate
          eyebrow="About Tannjes"
          align="left"
          title="Premium concierge medicine, built around you."
          subtitle="Tannjes Clinics Limited delivers compassionate, expert care wherever you need it — at home, at work, or in transit. We exist to make great healthcare effortlessly accessible."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
          {values.map((v) => (
            <div
              key={v.label}
              className="group flex items-center gap-3 rounded-xl border border-brand-pink-soft bg-white px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
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
