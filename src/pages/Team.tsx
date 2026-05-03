import SiteLayout from "@/components/site/SiteLayout";
import PageHero from "@/components/shared/PageHero";
import TeamSlider from "@/components/site/team/TeamSlider";
import AppointmentStrip from "@/components/site/AppointmentStrip";
import { team } from "@/data/team";
import heroDoctor from "@/assets/hero-doctor.jpg";

const TeamPage = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Our Team"
      title={<>The clinicians <span className="text-brand-pink">behind the care</span>.</>}
      subtitle="A growing team of physicians, nurses, and specialists — selected for both clinical excellence and the warmth they bring to patients."
      image={heroDoctor}
      crumbs={[{ label: "Home", to: "/" }, { label: "Team" }]}
    />
    <TeamSlider members={team} />
    <AppointmentStrip />
  </SiteLayout>
);

export default TeamPage;
