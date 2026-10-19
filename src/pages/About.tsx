import { Link } from "react-router-dom";
import { ArrowRight, Heart, Lightbulb, ShieldCheck, Sparkles, Target, Eye } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import StatsStrip from "@/components/site/StatsStrip";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-care.jpg";
import facilityRecovery from "@/assets/facility-recovery.jpg";

const values = [
  { icon: Heart, label: "Compassion", body: "We treat every patient with dignity and kindness." },
  { icon: Lightbulb, label: "Innovation", body: "Modern diagnostics, telemedicine and home visits." },
  { icon: ShieldCheck, label: "Trust", body: "Licensed clinicians, written care plans and clear communication with families." },
  { icon: Sparkles, label: "Extraordinary Care", body: "Hospitality-grade service paired with the rigour of evidence-based medicine." },
];

const About = () => (
  <SiteLayout>
    <SEO
      title="About Tannjes Clinics | Medical Concierge in Abuja"
      description="Tannjes Clinics Limited (RC: 1355314) delivers hospital-grade care at home, at work, or on the move. Learn our story, mission, and values."
    />
    <PageHero
      eyebrow="About Tannjes"
      title={<>About <span className="text-brand-pink">Tannjes Clinics</span></>}
      subtitle="A registered Nigerian medical concierge company providing care at home, at work and in our Abuja clinic."
      image={facilityRecovery}
      crumbs={[{ label: "Hospital", to: "/hospital" }, { label: "About" }]}
    />

    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 texture-waves opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-pink/20 to-sky/30 blur-xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-white">
              <img src={aboutImg} alt="Tannjes Clinics in care" className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Our Story"
            align="left"
            title="Our story"
            subtitle="Tannjes Clinics Limited (RC: 1355314) was founded to make good medical care easier to get. From doctor visits at home to skilled nursing, palliative care and medical escort, we provide hospital-standard care wherever it is needed."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-pink-soft bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-brand-pink">
                <Target className="h-5 w-5" />
                <p className="text-sm font-semibold">Mission</p>
              </div>
              <p className="mt-2 text-sm text-brand-navy">To provide expert, compassionate healthcare at home, at work and while travelling.</p>
            </div>
            <div className="rounded-2xl border border-brand-pink-soft bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-brand-pink">
                <Eye className="h-5 w-5" />
                <p className="text-sm font-semibold">Vision</p>
              </div>
              <p className="mt-2 text-sm text-brand-navy">Healthcare that comes to the patient, wherever they are in Nigeria.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <StatsStrip />

    <section className="relative overflow-hidden bg-brand-cream py-20">
      <div className="absolute inset-0 texture-dots opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Values" title="Our standards" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.05}>
              <div className="group h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="text-brand-pink">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-navy">{v.label}</h3>
                <p className="mt-2 text-sm text-brand-slate">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-brand-pink hover:bg-brand-pink-deep text-white">
            <Link to="/services">Explore our services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-brand-pink/40 text-brand-pink hover:bg-brand-pink-soft">
            <Link to="/team">Meet the team</Link>
          </Button>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default About;
