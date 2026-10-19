import { Check } from "lucide-react";
import CareLayout from "@/components/care/CareLayout";
import CareHeading from "@/components/care/CareHeading";
import CarePageHero from "@/components/care/CarePageHero";
import CareFaqList from "@/components/care/CareFaqList";
import CareHospitalBridge from "@/components/care/home/CareHospitalBridge";
import CareClosingCta from "@/components/care/home/CareClosingCta";
import SEO from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { CARE_BRAND } from "@/data/careNav";
import { admissionSteps, inpatientCare, inpatientFaqs, inpatientReasons, whatToBring } from "@/data/careSupportPages";
import roomImg from "@/assets/care/hospice-room.jpeg";
import careImg from "@/assets/care/elderly-wheelchair.jpeg";
import loungeImg from "@/assets/care/lounge-family.jpeg";

const gallery = [
  { src: roomImg, alt: "A patient room with a hospital bed and bedside table" },
  { src: loungeImg, alt: "A patient and family member in our lounge" },
  { src: careImg, alt: "A carer helping a patient in a wheelchair" },
];

const InpatientHospice = () => (
  <CareLayout>
    <SEO
      title={`Inpatient Hospice in Abuja | ${CARE_BRAND}`}
      description="A calm, homely inpatient hospice in Abuja for symptom control, respite and end-of-life care, with nursing around the clock."
      siteName={CARE_BRAND}
    />

    <CarePageHero
      crumbs={[{ label: "Inpatient Hospice" }]}
      title="Our inpatient hospice"
      intro={[
        "Our inpatient hospice is for people who need more care than can be given at home. Nurses are on duty day and night, and family can visit and stay close.",
        "People stay with us to get symptoms under control, to give their carers a rest, or for care in their final days.",
      ]}
      image={roomImg}
      topic="your inpatient hospice"
      careType="inpatient-hospice"
    />

    {/* Why people stay */}
    <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CareHeading eyebrow="Why people stay with us" title="Reasons for a stay" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inpatientReasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06} className="rounded-2xl bg-white p-6 ring-1 ring-care-sand">
              <span className="text-care-primary">
                <r.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl text-care-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* What to expect + gallery */}
    <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CareHeading
          eyebrow="During a stay"
          title="What to expect"
          subtitle="We ask about each person's routines, faith and family, and plan their care around them."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {inpatientCare.map((c) => (
            <li key={c.title} className="flex gap-4">
              <c.icon className="mt-1 h-6 w-6 shrink-0 text-care-secondary" aria-hidden />
              <div>
                <h3 className="text-xl text-care-ink">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-care-ink/70">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.alt} delay={i * 0.08}>
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover object-[center_30%]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Admission + what to bring */}
    <section className="bg-care-primary-deep px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <CareHeading tone="light" eyebrow="Coming to stay" title="How a stay is arranged." />
          <ol className="mt-10 space-y-6">
            {admissionSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-serif text-lg ring-1 ring-white/20">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/15 sm:p-8">
          <h3 className="text-2xl">What to bring</h3>
          <ul className="mt-5 space-y-3">
            {whatToBring.map((w) => (
              <li key={w} className="flex gap-3 text-sm text-white/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-care-secondary" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <CareHeading eyebrow="Questions" title="About staying with us" />
        <CareFaqList faqs={inpatientFaqs} />
      </div>
    </section>

    <CareHospitalBridge />
    <CareClosingCta />
  </CareLayout>
);

export default InpatientHospice;
