import { Button } from "@/components/ui/button";
import { Phone, Calendar, ShieldCheck, Heart, Clock } from "lucide-react";
import heroImg from "@/assets/hero-doctor.jpg";

export const Hero = () => {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 overflow-hidden bg-gradient-aurora">
      <div className="blob bg-primary-soft w-[420px] h-[420px] -top-20 -left-20 animate-float-slow" />
      <div className="blob bg-sky-soft w-[500px] h-[500px] top-40 -right-32 animate-float" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-up">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-foreground/80">
              24/7 Medical Concierge — Abuja
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.05] tracking-tight animate-fade-up delay-100">
            Your Health, <br />
            <span className="gradient-text">Our Call.</span>
            <br />
            <span className="text-foreground/90">Compassionate Care</span>
            <br />
            <span className="text-foreground/60 font-light italic">anytime, anywhere.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up delay-200">
            Premium medical concierge services delivered to your home, hotel, or workplace
            in Abuja and beyond — with compassion, precision, and dignity.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <a href="#contact"><Calendar className="mr-2 h-5 w-5" /> Book Appointment</a>
            </Button>
            <Button variant="softOutline" size="xl" asChild>
              <a href="tel:+2348000000000"><Phone className="mr-2 h-5 w-5" /> Call Now</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-6 animate-fade-up delay-500">
            {[
              { icon: Clock, label: "24/7 Availability" },
              { icon: ShieldCheck, label: "Licensed Clinicians" },
              { icon: Heart, label: "Compassion First" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-foreground/70">
                <b.icon className="h-4 w-4 text-primary" /> {b.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in delay-200">
          <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-[3rem]" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-elegant border border-white/60">
            <img
              src={heroImg}
              alt="Compassionate Tannjes nurse caring for an elderly patient at home"
              width={1536}
              height={1280}
              className="w-full h-[520px] md:h-[620px] object-cover"
            />
          </div>

          {/* floating cards */}
          <div className="absolute -left-4 md:-left-10 bottom-10 glass-card rounded-2xl p-4 flex items-center gap-3 animate-float">
            <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Patients cared for</p>
              <p className="font-display font-semibold">12,400+</p>
            </div>
          </div>
          <div className="absolute -right-2 md:-right-8 top-10 glass-card rounded-2xl p-4 flex items-center gap-3 animate-float-slow">
            <div className="h-11 w-11 rounded-full bg-sky-soft flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-sky" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Response time</p>
              <p className="font-display font-semibold">&lt; 30 min</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
