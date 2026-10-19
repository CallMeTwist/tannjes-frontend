import { Link, useSearchParams } from "react-router-dom";
import { AlertTriangle, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import CareLayout from "@/components/care/CareLayout";
import CareAssessmentForm from "@/components/care/CareAssessmentForm";
import SEO from "@/components/shared/SEO";
import { useSettings } from "@/hooks/useSettings";
import { buildWhatsAppUrl } from "@/lib/contact";
import { CARE_BRAND, HOSPITAL_HOME } from "@/data/careNav";

const CareContact = () => {
  const settings = useSettings();
  const [params] = useSearchParams();

  const details = [
    {
      icon: Phone,
      label: "24/7 care line",
      value: (
        <>
          <a href={`tel:${settings.phone_primary}`} className="hover:text-care-primary">{settings.phone_primary}</a>
          <br />
          <a href={`tel:${settings.phone_secondary}`} className="hover:text-care-primary">{settings.phone_secondary}</a>
        </>
      ),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: (
        <a
          href={buildWhatsAppUrl("Hello, I'd like to speak with a care coordinator.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-care-primary"
        >
          Message a nurse
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      value: <a href={`mailto:${settings.email}`} className="break-all hover:text-care-primary">{settings.email}</a>,
    },
    { icon: MapPin, label: "Address", value: settings.address },
    { icon: Clock, label: "Hours", value: "Care line open 24 hours, 7 days a week" },
  ];

  return (
    <CareLayout>
      <SEO
        title={`Contact Us & Request an Assessment | ${CARE_BRAND}`}
        description="Request a home, palliative or hospice care assessment in Abuja, or call our 24/7 care line to speak with a nurse."
        siteName={CARE_BRAND}
      />

      <section className="px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm text-care-ink/60">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link to="/" className="hover:text-care-primary">Home</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="font-medium text-care-ink">Contact</li>
            </ol>
          </nav>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl leading-[1.1] text-care-ink sm:text-5xl lg:text-6xl">Contact us</h1>
            <p className="mt-5 text-lg leading-relaxed text-care-ink/80">
              Tell us about the situation and a member of our care team will call you back to arrange an assessment.
              To talk now, call our care line. It is open 24 hours a day.
            </p>
          </div>

          <div
            role="note"
            className="mt-8 flex max-w-3xl gap-3 rounded-2xl border border-care-accent/30 bg-care-accent-soft p-5 text-sm leading-relaxed text-care-ink"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-care-accent" aria-hidden />
            <p>
              <strong>In a medical emergency</strong>, please don't use this form. Call{" "}
              <a href={`tel:${settings.phone_primary}`} className="font-semibold text-care-primary underline">
                {settings.phone_primary}
              </a>{" "}
              or go to the nearest emergency department, such as{" "}
              <Link to={HOSPITAL_HOME} className="font-semibold text-care-primary underline">
                Tannjes Clinics
              </Link>
              .
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
            <aside className="order-2 space-y-6 lg:order-1">
              <dl className="space-y-5 rounded-2xl bg-white p-6 ring-1 ring-care-sand">
                {details.map((d) => (
                  <div key={d.label} className="flex gap-4">
                    <span className="shrink-0 text-care-primary">
                      <d.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <dt className="text-sm font-medium text-care-ink/60">{d.label}</dt>
                      <dd className="mt-1 text-care-ink">{d.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="overflow-hidden rounded-2xl ring-1 ring-care-sand">
                <iframe
                  title="Map showing Tannjes Clinics, Kaura District, Abuja"
                  src="https://www.google.com/maps?q=Prince+and+Princess+Estate+Kaura+Abuja&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </aside>

            <div className="order-1 lg:order-2">
              <CareAssessmentForm defaultCareType={params.get("care") ?? undefined} />
            </div>
          </div>
        </div>
      </section>
    </CareLayout>
  );
};

export default CareContact;
