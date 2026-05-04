import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Microscope, BedDouble, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import facilityRecovery from "@/assets/facility-recovery.jpg";
import facilityLab from "@/assets/facility-lab.jpg";
import facilityPrivate from "@/assets/facility-private-room.jpg";
import facilityWardTwin from "@/assets/facility-ward-twin.jpg";

const features = [
  { icon: BedDouble, title: "Private & Shared Wards", body: "Climate-controlled rooms with adjustable beds, en-suite access, and family-friendly seating." },
  { icon: Microscope, title: "On-site Laboratory", body: "Modern haematology, biochemistry and microbiology workstations for fast turnaround." },
  { icon: Activity, title: "Diagnostic Imaging", body: "Doppler, ECG and partner imaging services for next-day reporting on most studies." },
  { icon: ShieldCheck, title: "Infection Control", body: "Hospital-grade cleaning, sterilisation and PPE protocols across every patient touchpoint." },
];

const gallery = [
  { src: facilityPrivate, label: "Private recovery room", caption: "Quiet single-occupancy rooms with X-ray screen partitions for privacy." },
  { src: facilityWardTwin, label: "Twin ward", caption: "Shared rooms with monitored care and family-friendly visitation." },
  { src: facilityLab, label: "Diagnostic laboratory", caption: "Microbiology, biochemistry and haematology — in-house and accredited." },
];

const Facilities = () => {
  const reduce = useReducedMotion();
  return (
    <SiteLayout>
      <SEO
        title="Facilities — Tannjes Clinics Abuja"
        description="Modern wards, on-site lab, private rooms and concierge logistics — a clinic purpose-built for comfortable, dignified recovery."
      />
      <PageHero
        eyebrow="Our Facilities"
        title={<>A clinic that feels <span className="text-brand-pink">like home</span>.</>}
        subtitle="Modern wards, an on-site lab, and concierge logistics — purpose-built for comfortable, dignified recovery."
        image={facilityRecovery}
        crumbs={[{ label: "Home", to: "/" }, { label: "Facilities" }]}
      />

      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 texture-cross opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inside Tannjes"
            title="Designed for healing — and for hospitality."
            subtitle="Every room is built with patient comfort in mind: quiet HVAC, accessible bathrooms, and natural light. Caregivers can stay close, families can rest easy."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="group h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-pink-soft text-brand-pink transition group-hover:bg-brand-pink group-hover:text-white">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-navy">{f.title}</h3>
                  <p className="mt-2 text-sm text-brand-slate">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-cream py-20">
        <div className="absolute inset-0 texture-dots opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A Quick Tour" title="Step inside our clinic." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {gallery.map((g, i) => (
              <motion.figure
                key={g.label}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.label}
                    className="h-full w-full object-cover transition [transition-duration:1500ms] ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" aria-hidden />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" /> {g.label}
                  </span>
                </div>
                <figcaption className="p-5">
                  <p className="text-sm text-brand-slate">{g.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink via-brand-pink-deep to-[#7a0f44] py-16 text-white">
        <div className="absolute inset-0 texture-cross-light opacity-90" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Visit our clinic in Kaura, Abuja.</h2>
            <p className="mt-2 text-white/85">By appointment Mon–Sat. Emergencies handled 24/7 via concierge line.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white text-brand-pink hover:bg-white/90">
              <Link to="/contact">Get directions</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/contact#book">Book a visit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Facilities;
