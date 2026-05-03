import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarCheck, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import heroImg from "@/assets/hero-doctor.jpg";
import aboutImg from "@/assets/about-care.jpg";
import ctaImg from "@/assets/cta-family.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  zoom: "in" | "out";
};

const slides: Slide[] = [
  {
    image: heroImg,
    eyebrow: "Medical Concierge · 24/7",
    title: (
      <>
        Take care of <span className="text-brand-pink">your health.</span>
      </>
    ),
    subtitle:
      "Not just better healthcare, but a better healthcare experience — delivered to your home, hotel, or workplace anywhere in Abuja.",
    zoom: "in",
  },
  {
    image: aboutImg,
    eyebrow: "Premium Home Care",
    title: (
      <>
        Bettering the <span className="text-brand-pink">human condition.</span>
      </>
    ),
    subtitle:
      "Licensed physicians, skilled nurses, and modern diagnostics — orchestrated around you and your family with discretion.",
    zoom: "out",
  },
  {
    image: ctaImg,
    eyebrow: "16+ Specialties",
    title: (
      <>
        Medicine that <span className="text-brand-pink">touches the world.</span>
      </>
    ),
    subtitle:
      "From paediatrics to geriatrics, surgery to mental health — book the right specialist in minutes, day or night.",
    zoom: "in",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const settings = useSettings();
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || reduce) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 7000);
    return () => window.clearInterval(id);
  }, [emblaApi, reduce]);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${slides.length}`}
            >
              <div className="relative h-[640px] w-full overflow-hidden md:h-[760px]">
                <motion.div
                  key={`bg-${selected === i ? "active" : "idle"}-${i}`}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.image})` }}
                  initial={{ scale: s.zoom === "in" ? 1 : 1.18 }}
                  animate={
                    selected === i && !reduce
                      ? { scale: s.zoom === "in" ? 1.18 : 1 }
                      : { scale: s.zoom === "in" ? 1 : 1.18 }
                  }
                  transition={{ duration: 8, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/60 to-brand-navy/10" />
                <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_55%,rgba(225,29,116,0.28),transparent_60%)]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              className="pointer-events-auto max-w-2xl text-white"
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" },
                  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
                  exit: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.7, ease, delay: 0.05 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/25 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                {slides[selected].eyebrow}
              </motion.span>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, x: -80, clipPath: "inset(0 100% 0 0)" },
                  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
                  exit: { opacity: 0, y: -30 },
                }}
                transition={{ duration: 0.9, ease, delay: 0.25 }}
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {slides[selected].title}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" },
                  show: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" },
                  exit: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.8, ease, delay: 0.5 }}
                className="mt-5 max-w-xl text-base text-white/90 sm:text-lg"
              >
                {slides[selected].subtitle}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.6, ease, delay: 0.85 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button asChild size="lg" className="bg-brand-pink hover:bg-brand-pink-deep text-white shadow-xl shadow-brand-pink/30">
                  <Link to="/contact#book">
                    <CalendarCheck className="mr-2 h-5 w-5" /> Book a Doctor
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:text-white"
                >
                  <a href={`tel:${settings.phone_primary}`}>
                    <Phone className="mr-2 h-5 w-5" /> {settings.phone_primary}
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-brand-pink hover:ring-brand-pink sm:left-6 sm:h-14 sm:w-14"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-brand-pink hover:ring-brand-pink sm:right-6 sm:h-14 sm:w-14"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [8, 0, 8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center text-white/70 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="mt-1 h-4 w-4" />
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            className={`h-1.5 rounded-full transition-all ${
              selected === i ? "w-10 bg-brand-pink" : "w-4 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
