import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import family from "@/assets/cta-family.jpg";

export const CallToAction = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-elegant">
          <img src={family} alt="Happy family" loading="lazy" width={1536} height={1024}
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-cta opacity-90" />
          <div className="relative p-10 md:p-20 text-center text-primary-foreground">
            <p className="text-sm uppercase tracking-[0.3em] opacity-80 mb-4">Need urgent medical care?</p>
            <h2 className="text-4xl md:text-6xl font-display font-semibold leading-tight max-w-3xl mx-auto">
              We're a phone call away — <span className="italic font-light">day or night.</span>
            </h2>
            <p className="mt-6 text-lg opacity-90 max-w-xl mx-auto">
              Trusted clinicians, compassionate nurses, and rapid response across Abuja.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button variant="onPrimary" size="xl" asChild>
                <a href="tel:+2348000000000"><Phone className="mr-2 h-5 w-5" /> Call Now</a>
              </Button>
              <Button variant="ghostOnPrimary" size="xl" asChild>
                <a href="#contact"><Calendar className="mr-2 h-5 w-5" /> Book Appointment</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
