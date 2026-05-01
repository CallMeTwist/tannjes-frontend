import { Clock, Home, Award, Zap, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Clock, title: "24/7 Medical Concierge", desc: "Access licensed clinicians any time of day or night." },
  { icon: Home, title: "Home-based Personalized Care", desc: "Comfort, dignity, and privacy in your own space." },
  { icon: Award, title: "Experienced Professionals", desc: "Board-certified doctors and specialty-trained nurses." },
  { icon: Zap, title: "Fast Response & Access", desc: "Average dispatch under 30 minutes within Abuja." },
  { icon: HeartHandshake, title: "Compassion-driven Approach", desc: "We listen, we care, and we remember." },
];

export const WhyChoose = () => {
  return (
    <section className="section-padding bg-gradient-soft relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Why choose us</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            The Tannjes <span className="gradient-text">difference.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                i === 0
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                  : "bg-card border-border hover:shadow-card"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 ${
                  i === 0 ? "bg-white/20" : "bg-primary-soft"
                }`}
              >
                <r.icon className={`h-6 w-6 ${i === 0 ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
              <p className={`text-sm ${i === 0 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
