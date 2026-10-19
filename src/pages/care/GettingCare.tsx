import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import CareLayout from "@/components/care/CareLayout";
import CareHeading from "@/components/care/CareHeading";
import CarePageHero from "@/components/care/CarePageHero";
import CareFaqList from "@/components/care/CareFaqList";
import CareClosingCta from "@/components/care/home/CareClosingCta";
import CareJourney from "@/components/care/CareJourney";
import SEO from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contact";
import { CARE_BRAND } from "@/data/careNav";
import { assessmentPoints, contactRoutes, gettingCareFaqs, haveReady, referralInclude } from "@/data/careSupportPages";
import heroImg from "@/assets/care/elderly-wheelchair.jpeg";

const referralMailto = buildMailtoUrl({
  subject: "Patient referral: Tannjes Home & Hospice Care",
  body: [
    "Referrer name, role and contact:",
    "",
    "Patient name, age and contact (and next of kin):",
    "Diagnosis and relevant history:",
    "Current medicines and allergies:",
    "Reason for referral and urgency:",
    "Patient / family agree to referral (yes/no):",
  ].join("\n"),
});

const CheckList = ({ items, tone = "dark" }: { items: string[]; tone?: "dark" | "light" }) => (
  <ul className="space-y-3">
    {items.map((t) => (
      <li key={t} className={tone === "light" ? "flex gap-3 text-sm text-white/85" : "flex gap-3 text-care-ink/80"}>
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-care-secondary" aria-hidden />
        {t}
      </li>
    ))}
  </ul>
);

const GettingCare = () => {
  const settings = useSettings();
  const routes = contactRoutes(settings.phone_primary, settings.address);

  return (
    <CareLayout>
      <SEO
        title={`Getting Care & Referrals | ${CARE_BRAND}`}
        description="How to arrange home, palliative or hospice care in Abuja, for patients, families and referring doctors."
        siteName={CARE_BRAND}
      />

      <CarePageHero
        crumbs={[{ label: "Getting Care" }]}
        title="Getting care"
        intro={[
          "You don't need a referral to contact us. Call, WhatsApp or send a request for yourself, a family member or a patient, and we will explain the options.",
        ]}
        image={heroImg}
        topic="getting care"
      />

      {/* Ways to reach us */}
      <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CareHeading eyebrow="Reach out" title="Ways to contact us" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((r) => {
              const body = (
                <>
                  <span className="text-care-primary">
                    <r.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-4 block font-serif text-xl font-semibold text-care-ink">{r.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-care-ink/70">{r.text}</span>
                </>
              );
              const cardClass = "block h-full rounded-2xl bg-white p-6 ring-1 ring-care-sand";
              const linkClass = `${cardClass} transition hover:-translate-y-1 hover:ring-care-secondary`;
              return (
                <li key={r.title}>
                  {r.to ? (
                    <Link to={r.to} className={linkClass}>{body}</Link>
                  ) : r.external ? (
                    <a
                      href={buildWhatsAppUrl("Hello, I'd like to find out about getting care.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {body}
                    </a>
                  ) : r.href ? (
                    <a href={r.href} className={linkClass}>{body}</a>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CareJourney eyebrow="What happens next" title="Getting care in 5 steps" subtitle="" showCta={false} />

      {/* Assessment details */}
      <section className="px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-care-secondary-soft/70 p-6 sm:p-8">
              <h3 className="text-2xl text-care-ink">At the assessment</h3>
              <div className="mt-5">
                <CheckList items={assessmentPoints} />
              </div>
            </div>
            <div className="rounded-3xl bg-care-accent-soft/70 p-6 sm:p-8">
              <h3 className="text-2xl text-care-ink">Helpful to have ready</h3>
              <p className="mt-2 text-sm text-care-ink/70">If you don't have all of these, we can help you get them.</p>
              <div className="mt-5">
                <CheckList items={haveReady} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For professionals */}
      <section id="refer" className="scroll-mt-28 bg-care-primary-deep px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <CareHeading
              tone="light"
              eyebrow="For doctors and health professionals"
              title="Refer a patient."
              subtitle="We accept referrals for home care, palliative care, hospice and end-of-life care, and we keep the referring team updated."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-care-primary-deep hover:bg-care-secondary-soft">
                <a href={referralMailto}>
                  <Mail className="mr-2 h-5 w-5" /> Email a referral
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <a href={`tel:${settings.phone_primary}`}>
                  <Phone className="mr-2 h-5 w-5" /> Call the care team
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/15 sm:p-8">
            <h3 className="text-2xl">Please include</h3>
            <div className="mt-5">
              <CheckList items={referralInclude} tone="light" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <CareHeading eyebrow="Questions" title="Before you get in touch" />
            <Link
              to="/families"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-care-primary hover:underline"
            >
              Support for families <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <CareFaqList faqs={gettingCareFaqs} />
        </div>
      </section>

      <CareClosingCta />
    </CareLayout>
  );
};

export default GettingCare;
