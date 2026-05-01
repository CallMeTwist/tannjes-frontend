import { ArrowUpRight, Briefcase, HomeIcon, HeartPulse, Stethoscope, Activity, Plane, Baby } from "lucide-react";
import elderly from "@/assets/service-elderly.jpg";
import home from "@/assets/service-home.jpg";
import nursing from "@/assets/service-nursing.jpg";
import newborn from "@/assets/service-newborn.jpg";

const services = [
  { title: "Doctor at Home / Hotel / Workplace", icon: HomeIcon, img: home,
    desc: "Premium concierge medicine wherever you are — discreet, fast and thorough." },
  { title: "Geriatrics Care", icon: HeartPulse, img: elderly,
    desc: "Comfort-first elderly care that supports independence and dignity." },
  { title: "Hospital to Home Care", icon: Stethoscope, img: nursing,
    desc: "Seamless transition from discharge to recovery in your own home." },
  { title: "Palliative Care", icon: HeartPulse, img: elderly,
    desc: "Gentle, holistic support focused on comfort and quality of life." },
  { title: "Skilled Nursing", icon: Activity, img: nursing,
    desc: "Post-operative and post-hospitalization nursing by certified pros." },
  { title: "Medical Escort Services", icon: Plane, img: home,
    desc: "Trained clinicians escort you safely to appointments or travel." },
  { title: "Newborn & Caregiver Training", icon: Baby, img: newborn,
    desc: "Confidence-building support for new parents and family caregivers." },
  { title: "Corporate Health", icon: Briefcase, img: home,
    desc: "Workplace wellness programs and on-demand staff clinicians." },
];

export const Services = () => {
  return (
    <section id="services" className="section-padding bg-gradient-soft relative overflow-hidden">
      <div className="blob bg-primary-soft w-[400px] h-[400px] top-20 left-1/3" />
      <div className="container mx-auto relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">What we do</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            Care that meets you <span className="gradient-text">where you are.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            From a single home visit to ongoing skilled nursing — every service is delivered with
            the same standard of compassion and clinical excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:shadow-card transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" width={1024} height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <div className="absolute top-4 left-4 h-10 w-10 rounded-xl glass-card flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group/link">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
