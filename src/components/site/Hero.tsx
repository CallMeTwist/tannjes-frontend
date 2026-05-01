import { motion, useReducedMotion } from "framer-motion";
import { Phone, CalendarCheck, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-doctor.jpg";

export const Hero = () => {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-pink-soft/40 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pink shadow-sm ring-1 ring-brand-pink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            Medical Concierge 24/7
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-brand-navy sm:text-5xl md:text-6xl">
            Your health, <span className="text-brand-pink">your call.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-brand-slate sm:text-lg">
            Compassionate, expert medical care delivered to your home, hotel, or place of work — anywhere in Abuja, anytime.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-pink hover:bg-brand-pink-deep text-white">
              <a href="#book">
                <CalendarCheck className="mr-2 h-5 w-5" /> Book a Doctor
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-brand-navy/20 text-brand-navy">
              <a href="tel:+2347019090013">
                <Phone className="mr-2 h-5 w-5" /> +234 701 909 0013
              </a>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-slate">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-brand-pink" /> RC: 1355314
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-pink" /> 24/7 Availability
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-pink" /> Licensed Physicians
            </span>
          </div>
        </div>

        <div className="relative md:col-span-5">
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[40%] bg-gradient-to-br from-brand-pink/30 via-brand-pink-soft to-white blur-2xl"
              animate={{ borderRadius: ["40%", "55% 45% 50% 60%", "45% 55% 40% 60%", "40%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-brand-navy/5">
            <img
              src={heroImg}
              alt="Tannjes Clinics doctor"
              width={720}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -right-3 top-6 max-w-[220px] rotate-[-2deg] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur ring-1 ring-brand-pink-soft"
          >
            <div className="flex items-center gap-2 text-brand-navy">
              <Clock className="h-5 w-5 text-brand-pink" />
              <span className="text-sm font-semibold">24/7 Concierge</span>
            </div>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Next available: Today
            </span>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -left-3 bottom-6 max-w-[200px] rotate-[2deg] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur ring-1 ring-brand-pink-soft"
          >
            <p className="text-2xl font-extrabold text-brand-navy">16+</p>
            <p className="text-xs text-brand-slate">Medical specialties under one roof</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
