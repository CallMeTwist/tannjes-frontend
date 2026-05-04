import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import facilityLab from "@/assets/facility-lab.jpg";
import aboutCare from "@/assets/about-care.jpg";

const ServicesPage = () => (
  <SiteLayout>
    <SEO
      title="Medical Services in Abuja — Doctors, Nursing, Diagnostics"
      description="Doctor home visits, skilled nursing, geriatric care, paediatrics, diagnostics, telemedicine and medical escort — full-service concierge healthcare in Abuja."
    />
    <PageHero
      eyebrow="Our Services"
      title={<>Care that <span className="text-brand-pink">comes to you</span>.</>}
      subtitle="Seven concierge service lines designed for real life — from doctor visits at home to skilled nursing, palliative care and medical escort."
      image={aboutCare}
      crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
    />

    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-0 texture-cross opacity-90" aria-hidden />
      <div className="relative mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8 lg:space-y-28">
        {services.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={s.slug}
              id={s.slug}
              className="grid items-center gap-10 md:grid-cols-2 lg:gap-16"
            >
              <Reveal className={reversed ? "md:order-2" : ""}>
                <div className="relative">
                  <div
                    className={`absolute -inset-3 rounded-[2rem] bg-gradient-to-br ${
                      reversed ? "from-sky/30 to-brand-pink/20" : "from-brand-pink/20 to-sky/30"
                    } blur-xl`}
                    aria-hidden
                  />
                  <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-white">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-pink-soft text-brand-pink">
                  <s.icon className="h-6 w-6" />
                </span>
                <SectionHeading
                  eyebrow={`Service 0${i + 1}`}
                  align="left"
                  title={s.title}
                  subtitle={s.description}
                  className="mt-5"
                />
                <ul className="mt-6 space-y-2 text-sm text-brand-navy">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" /> {b}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 bg-brand-pink hover:bg-brand-pink-deep text-white">
                  <Link to="/contact#book">
                    Book this service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>

    <section className="relative overflow-hidden bg-brand-cream py-20">
      <div className="absolute inset-0 texture-dots opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-white">
            <img
              src={facilityLab}
              alt="Tannjes diagnostic laboratory"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Diagnostics & Laboratory"
            align="left"
            title="On-site lab and modern diagnostic workflows."
            subtitle="Our in-house laboratory and partner network deliver fast turnaround on routine and advanced tests — with sample collection at your home or office when needed."
          />
          <ul className="mt-6 space-y-2 text-sm text-brand-navy">
            <li>• Full panel haematology and biochemistry</li>
            <li>• Microbiology and molecular testing</li>
            <li>• Imaging referrals through accredited partners</li>
            <li>• Doorstep sample collection across Abuja</li>
          </ul>
          <Button asChild className="mt-8 bg-brand-pink hover:bg-brand-pink-deep text-white">
            <Link to="/contact#book"><CalendarCheck className="mr-2 h-4 w-4" /> Request lab service</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  </SiteLayout>
);

export default ServicesPage;
