import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/contact";
import { CARE_CONTACT } from "@/data/careNav";

type Crumb = { label: string; to?: string };

type Props = {
  crumbs: Crumb[];
  title: string;
  intro: string[];
  image: string;
  eyebrow?: string;
  /** Topic used to pre-fill the WhatsApp message. */
  topic: string;
  /** Pre-selects the care type on the contact form, e.g. "hospice-care". */
  careType?: string;
  /** Extra content under the intro, e.g. setting chips. */
  children?: React.ReactNode;
};

// Shared hero for care inner pages: breadcrumb, title, intro, CTAs and an image.
export const CarePageHero = ({ crumbs, title, intro, image, eyebrow, topic, careType, children }: Props) => (
  <section className="px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <nav aria-label="Breadcrumb" className="text-sm text-care-ink/60">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-care-primary">Home</Link>
          </li>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                {c.to && !last ? (
                  <Link to={c.to} className="hover:text-care-primary">{c.label}</Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-care-ink" : undefined}>
                    {c.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          {eyebrow && (
            <p className="mb-3 font-serif text-lg italic text-care-accent">{eyebrow}</p>
          )}
          <h1 className="text-4xl leading-[1.1] text-care-ink sm:text-5xl lg:text-6xl">{title}</h1>
          {intro.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "mt-5 text-lg leading-relaxed text-care-ink/80" : "mt-4 leading-relaxed text-care-ink/70"}
            >
              {p}
            </p>
          ))}
          {children}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
              <Link to={careType ? `${CARE_CONTACT}?care=${careType}` : CARE_CONTACT}>
                Request an assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary"
            >
              <a href={buildWhatsAppUrl(`Hello, I'd like to ask about ${topic}.`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Ask a nurse
              </a>
            </Button>
          </div>
        </div>
        <Reveal>
          <img src={image} alt="" className="aspect-[4/3] w-full rounded-3xl object-cover object-[center_30%] shadow-card lg:aspect-[4/5]" />
        </Reveal>
      </div>
    </div>
  </section>
);

export default CarePageHero;
