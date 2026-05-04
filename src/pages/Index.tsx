import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import Hero from "@/components/site/Hero";
import StatsStrip from "@/components/site/StatsStrip";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import HowItWorks from "@/components/site/HowItWorks";
import WhyChoose from "@/components/site/WhyChoose";
import FacilitiesTeaser from "@/components/site/FacilitiesTeaser";
import Testimonials from "@/components/site/Testimonials";
import TeamPreview from "@/components/site/TeamPreview";

const Index = () => (
  <SiteLayout>
    <SEO
      title="Tannjes Clinics — Compassionate 24/7 Healthcare in Abuja"
      description="Premium home-based and hospital medical concierge services in Abuja. Doctors, skilled nursing, geriatrics, paediatrics and more — available 24/7."
    />
    <Hero />
    <StatsStrip />
    <About />
    <Services />
    <HowItWorks />
    <WhyChoose />
    <FacilitiesTeaser />
    <Testimonials />
    <TeamPreview />
    <AppointmentStrip />
  </SiteLayout>
);

export default Index;
