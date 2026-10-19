import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/contact";
import { CARE_CONTACT, careServiceLinks } from "@/data/careNav";
import { md } from "@/data/leadership";
import careImg from "@/assets/service-elderly.jpg";
import mdImg from "@/assets/care/md-portrait.jpeg";

type Slide = {
  image: string;
  /** CSS object-position, so faces stay clear of the text on wide screens. */
  focus: string;
  title: React.ReactNode;
  text: string;
  showMdLink?: boolean;
  /** Show a plain row of links to the main services under the buttons. */
  showServices?: boolean;
  /** Tall photo: shown framed beside the text from md up, as the background on phones. */
  portrait?: boolean;
};

const slides: Slide[] = [
  {
    image: careImg,
    focus: "center 35%",
    title: (
      <>
        Expert care for serious illness, <em className="font-medium text-care-secondary-soft">at home or in our hospice.</em>
      </>
    ),
    text: "Our nurses, doctors and carers look after people with serious illness across Abuja, and support the families caring for them.",
    showServices: true,
  },
  {
    image: mdImg,
    focus: "center 20%",
    title: (
      <>
        Care led by a doctor with <em className="font-medium text-care-secondary-soft">over 20 years' experience.</em>
      </>
    ),
    text: `${md.name}, our Managing Director, has worked in emergency medicine, home care and medical concierge since 2001. She leads the team that will look after your family.`,
    showMdLink: true,
    portrait: true,
  },
];

const SLIDE_MS = 8000;
const ease = [0.22, 1, 0.36, 1] as const;

export const CareHero = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [reduce, index]);

  return (
    <section className="relative isolate overflow-hidden bg-care-primary-deep" aria-roledescription="carousel" aria-label="Introduction">
      {/* Slow crossfade between backgrounds */}
      {/* On wider screens the photo fills the right two-thirds at full colour and only the
          left edge fades into teal behind the text. On phones it fills the hero with a light tint. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image}
          className={cn("absolute inset-0 -z-10 overflow-hidden md:left-auto md:w-[66%]", slide.portrait && "md:hidden")}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: slide.focus }}
            initial={reduce ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 9, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-care-primary-deep/60 md:bg-transparent md:bg-gradient-to-r md:from-care-primary-deep md:from-5% md:via-care-primary-deep/25 md:via-35% md:to-transparent md:to-60%" />
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto flex min-h-[600px] max-w-7xl items-center justify-between gap-10 px-4 pb-40 pt-20 md:pb-32 sm:px-6 md:min-h-[680px] lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-xl text-white"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{slide.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{slide.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-care-primary-deep hover:bg-care-secondary-soft">
                <Link to={CARE_CONTACT}>
                  Request an assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {slide.showMdLink ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:text-white"
                >
                  <a href="#leadership">
                    Meet {md.shortName} <ArrowDown className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:text-white"
                >
                  <a
                    href={buildWhatsAppUrl("Hello, I'd like to speak with a nurse about care.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp a nurse
                  </a>
                </Button>
              )}
            </div>
            {slide.showServices && (
              <nav aria-label="Our care" className="mt-10 border-t border-white/20 pt-5">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                  {careServiceLinks.slice(0, 4).map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {slide.portrait && (
            <motion.figure
              key={slide.image}
              className="relative hidden w-[300px] shrink-0 md:block lg:w-[380px]"
              initial={reduce ? false : { opacity: 0, x: 40, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: 20 }}
              transition={{ duration: 1, ease }}
            >
              <div aria-hidden className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-care-secondary-soft/40" />
              <img
                src={slide.image}
                alt={md.name}
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-2xl ring-4 ring-white/15"
              />
              <figcaption className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white px-4 py-3 text-center shadow-card">
                <span className="block font-serif text-base font-semibold text-care-ink">{md.name}</span>
                <span className="block text-xs text-care-ink/60">Managing Director & CEO</span>
              </figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-32 md:left-auto md:right-10 md:translate-x-0">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1} of ${slides.length}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default CareHero;
