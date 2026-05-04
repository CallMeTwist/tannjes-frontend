import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import Contact from "@/components/site/Contact";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import ctaFamily from "@/assets/cta-family.jpg";

const ContactPage = () => (
  <SiteLayout>
    <SEO
      title="Contact Tannjes Clinics — 24/7 Medical Concierge in Abuja"
      description="Reach Tannjes Clinics any time of day for appointments, urgent care coordination, and medical concierge support across Abuja."
    />
    <PageHero
      eyebrow="Contact Us"
      title={<>We're a phone call <span className="text-brand-pink">away</span>.</>}
      subtitle="24/7 support for medical concierge, appointments, and urgent care coordination across Abuja."
      image={ctaFamily}
      crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
    />
    <AppointmentStrip />
    <Contact />
  </SiteLayout>
);

export default ContactPage;
