import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import TeamScrollStack from "@/components/site/team/TeamScrollStack";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import { useTeam } from "@/hooks/useTeam";
import heroDoctor from "@/assets/hero-doctor.jpg";

const TeamPage = () => {
  const team = useTeam();
  return (
  <SiteLayout>
    <SEO
      title="Our Medical Team — Tannjes Clinics Abuja"
      description="Meet the consultants, physicians, nurses and specialists behind Tannjes Clinics — selected for clinical excellence and warmth of care."
    />
    <PageHero
      eyebrow="Our Team"
      title={<>The clinicians <span className="text-brand-pink">behind the care</span>.</>}
      subtitle="A growing team of physicians, nurses, and specialists — selected for both clinical excellence and the warmth they bring to patients."
      image={heroDoctor}
      crumbs={[{ label: "Home", to: "/" }, { label: "Team" }]}
    />
    <TeamScrollStack members={team} />
    <AppointmentStrip />
  </SiteLayout>
  );
};

export default TeamPage;
