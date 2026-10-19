import { Check, HeartHandshake } from "lucide-react";
import CareLayout from "@/components/care/CareLayout";
import CareHeading from "@/components/care/CareHeading";
import CarePageHero from "@/components/care/CarePageHero";
import CareFaqList from "@/components/care/CareFaqList";
import CareClosingCta from "@/components/care/home/CareClosingCta";
import SEO from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { CARE_BRAND } from "@/data/careNav";
import { familyFaqs, familyHelp, selfCare, trainingTopics } from "@/data/careSupportPages";
import familyImg from "@/assets/care/lounge-family.jpeg";
import trainingImg from "@/assets/care/care-team.jpeg";

const Families = () => (
  <CareLayout>
    <SEO
      title={`Support for Families & Carers | ${CARE_BRAND}`}
      description="Caregiver training, respite, honest guidance and bereavement support for families caring for someone with a serious illness in Abuja."
      siteName={CARE_BRAND}
    />

    <CarePageHero
      crumbs={[{ label: "For Families" }]}
      title="Support for families and carers"
      intro={[
        "Looking after a family member with a serious illness is tiring, and many families do it for months or years.",
        "We can train you in practical care, arrange a break, explain what is happening, and stay in touch after a death.",
      ]}
      image={familyImg}
      topic="support for our family"
    />

    <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CareHeading eyebrow="How we help" title="How we help families" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {familyHelp.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.06} className="rounded-2xl bg-white p-6 ring-1 ring-care-sand">
              <span className="text-care-accent">
                <f.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-xl text-care-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    {/* Caregiver training */}
    <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img src={trainingImg} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover object-[center_30%]" />
        </Reveal>
        <div>
          <CareHeading
            eyebrow="Learn at home"
            title="Caregiver training"
            subtitle="Our nurses train family members and house helps at home, one-to-one, in the skills they need day to day."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {trainingTopics.map((t) => (
              <li key={t} className="flex gap-3 text-care-ink/80">
                <span className="mt-0.5 shrink-0 text-care-secondary">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Looking after yourself */}
    <section className="bg-care-secondary-soft/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CareHeading
          align="center"
          eyebrow="For carers"
          title="Looking after yourself"
          subtitle="Carers often put their own needs last. These are some things that help."
        />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
          {selfCare.map((s) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-care-cream p-6">
              <s.icon className="mt-1 h-6 w-6 shrink-0 text-care-secondary" aria-hidden />
              <div>
                <h3 className="text-xl text-care-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-care-ink/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Bereavement */}
    <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-care-accent-soft p-8 text-center sm:p-12">
        <HeartHandshake className="mx-auto h-8 w-8 text-care-accent" aria-hidden />
        <h2 className="mt-4 text-3xl text-care-ink sm:text-4xl">After a loss</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-care-ink/75">
          Our team stays in touch with families after a death. We can help with practical questions and put you in
          touch with counselling or faith-based support if you would like it.
        </p>
      </div>
    </section>

    <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <CareHeading eyebrow="Questions" title="Families often ask" />
        <CareFaqList faqs={familyFaqs} />
      </div>
    </section>

    <div className="pt-20">
      <CareClosingCta />
    </div>
  </CareLayout>
);

export default Families;
