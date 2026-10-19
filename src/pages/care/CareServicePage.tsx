import { Link } from "react-router-dom";
import { BedDouble, Building2, Check, Home, MapPin } from "lucide-react";
import CareLayout from "@/components/care/CareLayout";
import CareHeading from "@/components/care/CareHeading";
import CareHospitalBridge from "@/components/care/home/CareHospitalBridge";
import CareClosingCta from "@/components/care/home/CareClosingCta";
import SEO from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import CarePageHero from "@/components/care/CarePageHero";
import CareFaqList from "@/components/care/CareFaqList";
import { CARE_BRAND } from "@/data/careNav";
import { careServices, type CareService, type CareSetting } from "@/data/careServices";
import { steps } from "@/data/careHome";

const settingInfo: Record<CareSetting, { label: string; text: string; icon: typeof Home }> = {
  home: {
    label: "At home",
    text: "Care in your own home, with your family around you.",
    icon: Home,
  },
  inpatient: {
    label: "In our inpatient hospice",
    text: "A calm, homely unit with nursing around the clock.",
    icon: BedDouble,
  },
  residence: {
    label: "In our assisted living residence",
    text: "A supported home with help on hand day and night.",
    icon: Building2,
  },
  anywhere: {
    label: "Wherever you are",
    text: "At home, in your hotel or at your workplace.",
    icon: MapPin,
  },
};

const relatedTo = (service: CareService) => {
  const i = careServices.findIndex((s) => s.to === service.to);
  return [1, 2, 3].map((n) => careServices[(i + n) % careServices.length]);
};

type Props = { service: CareService };

const CareServicePage = ({ service }: Props) => {
  const related = relatedTo(service);

  return (
    <CareLayout>
      <SEO title={`${service.title} in Abuja | ${CARE_BRAND}`} description={service.summary} siteName={CARE_BRAND} />

      <CarePageHero
        crumbs={[{ label: "Our Care" }, { label: service.title }]}
        title={service.title}
        intro={service.intro}
        image={service.image}
        topic={service.title}
        careType={service.to.slice(1)}
      >
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Where this care is available">
          {service.settings.map((s) => {
            const Icon = settingInfo[s].icon;
            return (
              <li
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-care-ink/80 ring-1 ring-care-sand"
              >
                <Icon className="h-4 w-4 text-care-secondary" aria-hidden />
                {settingInfo[s].label}
              </li>
            );
          })}
        </ul>
      </CarePageHero>

      {/* Who it's for + what's included */}
      <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <CareHeading eyebrow="Who it's for" title="Is this the right care?" />
            <ul className="mt-6 space-y-3">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-care-ink/80">
                  <span className="mt-0.5 shrink-0 text-care-secondary">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-care-ink/60">
              Not sure? Talk to us and we'll help you work out what kind of care is right.
            </p>
          </div>
          <div>
            <CareHeading eyebrow="What's included" title="How we can help." />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.details.map((d, i) => (
                <Reveal as="li" key={d.title} delay={(i % 2) * 0.06} className="rounded-2xl bg-white p-6 ring-1 ring-care-sand">
                  <h3 className="text-xl text-care-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{d.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Where care happens */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CareHeading eyebrow="Where we care for you" title="In the place that's right for you." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.settings.map((s) => {
              const Icon = settingInfo[s].icon;
              return (
                <div key={s} className="flex gap-4 rounded-2xl border border-care-sand bg-white p-6">
                  <span className="shrink-0 text-care-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl text-care-ink">{settingInfo[s].label}</h3>
                    <p className="mt-1 text-sm text-care-ink/70">{settingInfo[s].text}</p>
                  </div>
                </div>
              );
            })}
            {!service.settings.includes("inpatient") && (
              <div className="rounded-2xl border border-dashed border-care-secondary p-6 text-sm leading-relaxed text-care-ink/70">
                If closer care is ever needed, we can arrange a stay in our{" "}
                <Link to="/inpatient-hospice" className="font-medium text-care-primary underline-offset-4 hover:underline">
                  inpatient hospice
                </Link>{" "}
                or at Tannjes Clinics hospital.
              </div>
            )}
          </div>

          <ol className="mt-16 grid gap-6 border-t border-care-sand pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((st, i) => (
              <li key={st.title}>
                <p className="font-serif text-base italic text-care-accent">Step {i + 1}</p>
                <h3 className="mt-1 text-xl text-care-ink">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="bg-care-secondary-soft/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <CareHeading eyebrow="Questions" title={`About ${service.title.toLowerCase()}`} />
          <CareFaqList faqs={service.faqs} />
        </div>
      </section>

      {/* Related services */}
      <section className="px-4 pt-20 sm:px-6 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CareHeading eyebrow="Related care" title="You may also be interested in" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-care-sand bg-white p-6 transition hover:-translate-y-1 hover:border-care-secondary"
                >
                  <span className="shrink-0 text-care-primary">
                    <r.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-semibold text-care-ink">{r.title}</span>
                    <span className="mt-1 block text-sm text-care-ink/70">{r.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CareHospitalBridge />
      <CareClosingCta />
    </CareLayout>
  );
};

export default CareServicePage;
