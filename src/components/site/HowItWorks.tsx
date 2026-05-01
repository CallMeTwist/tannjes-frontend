import { PhoneCall, UserCheck, HeartPulse } from "lucide-react";

const steps = [
  { icon: PhoneCall, title: "Contact or Book", desc: "Call our 24/7 line or fill the booking form online." },
  { icon: UserCheck, title: "Get Matched", desc: "We pair you with the right medical expert for your needs." },
  { icon: HeartPulse, title: "Receive Care", desc: "At home, in a hotel, your workplace, or our clinic." },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="section-padding">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            Care in <span className="gradient-text">three simple steps.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center group">
              <div className="relative mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
                <s.icon className="h-9 w-9 text-primary" />
                <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-display font-bold flex items-center justify-center shadow-glow">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
