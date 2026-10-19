import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import TeamScrollStack from "@/components/site/team/TeamScrollStack";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import { useTeam } from "@/hooks/useTeam";
import careTeam from "@/assets/care/care-team.jpeg";

const TeamPage = () => {
  const team = useTeam();
  return (
  <SiteLayout>
    <SEO
      title="Our Medical Team | Tannjes Clinics Abuja"
      description="Meet the consultants, doctors, nurses and specialists at Tannjes Clinics in Abuja."
    />
    <PageHero
      eyebrow="Our Team"
      title={<>The clinicians <span className="text-brand-pink">behind the care</span>.</>}
      subtitle="Our doctors, nurses and specialists."
      image={careTeam}
      crumbs={[{ label: "Hospital", to: "/hospital" }, { label: "Team" }]}
    />
    <TeamScrollStack members={team} />
    <AppointmentStrip />
  </SiteLayout>
  );
};

export default TeamPage;
