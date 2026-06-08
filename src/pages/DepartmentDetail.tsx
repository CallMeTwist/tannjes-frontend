import { Link, useParams } from "react-router-dom";
import { ArrowRight, Stethoscope, UserRound, Video } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import SEO from "@/components/shared/SEO";
import PageHero from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { useDepartment } from "@/hooks/useDepartments";

const steps = [
  { title: "Register", desc: "Create your patient account in minutes." },
  { title: "Pay consultation fee", desc: "Submit your fee and proof of payment." },
  { title: "Get approved & consult", desc: "Once approved, message your consultant securely." },
];

const DepartmentDetail = () => {
  const { slug = "" } = useParams();
  const { data, isLoading, isError } = useDepartment(slug);

  const name = data?.name ?? "Department";
  const description = data?.description ?? "";
  const doctors = data?.doctors ?? [];

  return (
    <SiteLayout>
      <SEO
        title={`${name} — Tannjes Clinics Abuja`}
        description={description || `Meet our ${name} consultants and start a telehealth consultation.`}
      />
      <PageHero
        eyebrow="Department"
        title={<>{name}</>}
        subtitle={description}
        crumbs={[{ label: "Home", to: "/" }, { label: "Departments", to: "/departments" }, { label: name }]}
      />

      <section className="relative bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">Our Consultants</h2>

          {isError && (
            <p className="mt-6 rounded-xl bg-brand-pink-soft/40 p-4 text-sm text-brand-navy">
              We couldn't load consultants right now. Please try again shortly.
            </p>
          )}

          {!isError && doctors.length === 0 && !isLoading && (
            <p className="mt-6 text-sm text-muted-foreground">
              Consultants for this department will be listed here soon.
            </p>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-2xl border border-brand-pink-soft/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-pink-soft text-brand-pink">
                        <UserRound className="h-7 w-7" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-semibold text-brand-navy">{doc.name}</h3>
                      <p className="text-sm text-brand-pink">{doc.role}</p>
                      {doc.credentials && <p className="text-xs text-muted-foreground">{doc.credentials}</p>}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{doc.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Telehealth CTA */}
          <div className="mt-14 overflow-hidden rounded-3xl bg-brand-navy p-8 text-white sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/25">
                  <Video className="h-3.5 w-3.5" /> Telehealth
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  Talk to a {name} consultant from anywhere
                </h3>
                <p className="mt-3 text-white/80">
                  Register as a patient, pay your consultation fee, and once approved you can message
                  your consultant securely and view your test results — all online.
                </p>
                <Link
                  to={`/patient/register?department=${slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-pink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-pink/90"
                >
                  Start a consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ol className="grid gap-4 sm:grid-cols-3 lg:max-w-md">
                {steps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-pink text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="mt-3 text-sm font-semibold">{s.title}</p>
                    <p className="mt-1 text-xs text-white/70">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/departments" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-pink">
              <Stethoscope className="h-4 w-4" /> Back to all departments
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default DepartmentDetail;
