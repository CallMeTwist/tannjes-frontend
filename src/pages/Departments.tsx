import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import Departments from "@/components/site/Departments";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import facilityWardTwin from "@/assets/facility-ward-twin.jpg";

const DepartmentsPage = () => (
  <SiteLayout>
    <SEO
      title="Departments & Specialties | Tannjes Clinics Abuja"
      description="Sixteen medical specialties under one trusted partner: paediatrics, geriatrics, cardiology, neurology, mental health, surgery and more."
    />
    <PageHero
      eyebrow="Specialties"
      title={<>Departments and <span className="text-brand-pink">specialties</span></>}
      subtitle="Specialists in every area of care, from paediatrics to geriatrics and surgery to mental health."
      image={facilityWardTwin}
      crumbs={[{ label: "Hospital", to: "/hospital" }, { label: "Departments" }]}
    />
    <Departments />
    <AppointmentStrip />
  </SiteLayout>
);

export default DepartmentsPage;
