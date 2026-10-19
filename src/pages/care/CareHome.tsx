import CareLayout from "@/components/care/CareLayout";
import SEO from "@/components/shared/SEO";
import CareHero from "@/components/care/home/CareHero";
import CareAudienceCards from "@/components/care/home/CareAudienceCards";
import CareTrustStrip from "@/components/care/home/CareTrustStrip";
import CareExplainer from "@/components/care/home/CareExplainer";
import CareServicesGrid from "@/components/care/home/CareServicesGrid";
import CareInpatient from "@/components/care/home/CareInpatient";
import CareJourney from "@/components/care/CareJourney";
import CareFamilies from "@/components/care/home/CareFamilies";
import CareTeam from "@/components/care/home/CareTeam";
import CareLeadership from "@/components/care/home/CareLeadership";
import CareStories from "@/components/care/home/CareStories";
import CareFaq from "@/components/care/home/CareFaq";
import CareHospitalBridge from "@/components/care/home/CareHospitalBridge";
import CareClosingCta from "@/components/care/home/CareClosingCta";
import { CARE_BRAND } from "@/data/careNav";

const CareHome = () => (
  <CareLayout>
    <SEO
      title={`${CARE_BRAND} | Home, Palliative & Hospice Care in Abuja`}
      description="Home care, palliative care, hospice and end-of-life care in Abuja, at home or in our inpatient hospice. Part of Tannjes Clinics."
      siteName={CARE_BRAND}
    />
    <CareHero />
    <CareAudienceCards />
    <CareTrustStrip />
    <CareExplainer />
    <CareServicesGrid />
    <CareInpatient />
    <CareJourney />
    <CareFamilies />
    <CareTeam />
    <CareLeadership />
    <CareStories />
    <CareFaq />
    <CareHospitalBridge />
    <CareClosingCta />
  </CareLayout>
);

export default CareHome;
