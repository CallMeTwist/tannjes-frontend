import aboutImg from "@/assets/about-care.jpg";
import { Heart, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";

const values = [
  { icon: Heart, label: "Compassion", desc: "We treat every patient like family." },
  { icon: Lightbulb, label: "Innovation", desc: "Modern medicine, thoughtfully delivered." },
  { icon: ShieldCheck, label: "Trust", desc: "Licensed, vetted, and accountable." },
  { icon: Sparkles, label: "Extraordinary Care", desc: "Above and beyond, every visit." },
];

export const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 bg-gradient-hero rounded-[3rem] -rotate-3" />
          <img
            src={aboutImg}
            alt="Tannjes doctor holding a patient's hand with care"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative rounded-[2rem] shadow-card w-full object-cover h-[480px]"
          />
          <div className="absolute -bottom-6 -right-4 md:right-6 glass-card rounded-2xl p-5 max-w-[220px]">
            <p className="text-3xl font-display font-semibold gradient-text">15+</p>
            <p className="text-sm text-muted-foreground">Years of compassionate clinical care</p>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">Who we are</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            A modern Nigerian healthcare brand built on <span className="gradient-text">care, dignity, and trust.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tannjes Clinics Limited is a contemporary healthcare provider offering personalized,
            home-based and hospital care services across Abuja and beyond. We bring the clinic
            to you — without compromising on quality, expertise, or warmth.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {values.map((v) => (
              <div
                key={v.label}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-500"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-soft flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display font-semibold">{v.label}</p>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
