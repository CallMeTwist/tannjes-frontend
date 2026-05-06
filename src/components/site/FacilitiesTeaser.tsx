import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import facilityRecovery from "@/assets/facility-recovery.jpg";
import facilityLab from "@/assets/facility-lab.jpg";
import facilityPrivate from "@/assets/facility-private-room.jpg";

export const FacilitiesTeaser = () => (
  <section className="relative overflow-hidden bg-white py-20">
    <div className="absolute inset-0 texture-waves opacity-50" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        animate
        eyebrow="Our Facilities"
        title="Step inside our Abuja clinic."
        subtitle="Modern wards, on-site lab, and concierge logistics — purpose-built for comfortable, dignified recovery."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal>
          <Link
            to="/facilities"
            className="group relative col-span-1 block overflow-hidden rounded-3xl shadow-xl ring-1 ring-white md:col-span-2 md:row-span-2"
          >
            <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
              <img
                src={facilityRecovery}
                alt="Recovery room"
                className="h-full w-full object-cover transition [transition-duration:1500ms] ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Inpatient Wards</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Comfortable, dignified recovery rooms</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink-soft transition group-hover:gap-2">
                Take the tour <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            to="/facilities"
            className="group relative block overflow-hidden rounded-3xl shadow-lg ring-1 ring-white"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={facilityLab}
                alt="Diagnostic lab"
                className="h-full w-full object-cover transition [transition-duration:1500ms] ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Diagnostics</p>
              <h3 className="mt-1 font-display text-2xl font-bold">On-site Laboratory</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink-soft transition group-hover:gap-2">
                Take the tour <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            to="/facilities"
            className="group relative block overflow-hidden rounded-3xl shadow-lg ring-1 ring-white"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={facilityPrivate}
                alt="Private room"
                className="h-full w-full object-cover transition [transition-duration:1500ms] ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" aria-hidden />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Privacy</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Private Rooms</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink-soft transition group-hover:gap-2">
                Take the tour <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
      <div className="mt-10 flex justify-center">
        <Button asChild className="bg-brand-pink hover:bg-brand-pink-deep text-white">
          <Link to="/facilities">Tour the full clinic <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  </section>
);

export default FacilitiesTeaser;
