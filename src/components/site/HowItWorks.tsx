import { PhoneCall, ClipboardList, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  { icon: PhoneCall, title: "Reach out", body: "Call, WhatsApp, or fill our 60-second form. We pick up 24/7." },
  { icon: ClipboardList, title: "We assess and match", body: "We pair you with the right physician, nurse, or specialist for your need." },
  { icon: HeartHandshake, title: "Care delivered", body: "Concierge care arrives at your door — and stays with you through recovery." },
];

export const HowItWorks = () => (
  <section id="how-it-works" className="relative overflow-hidden bg-white py-20">
    <div className="absolute inset-0 texture-cross opacity-90" aria-hidden />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading animate eyebrow="How It Works" title="Three steps to expert care." />
      <div className="relative mt-14 grid gap-10 md:grid-cols-3">
        <svg
          aria-hidden
          className="absolute left-[16%] right-[16%] top-7 hidden h-1 md:block"
          viewBox="0 0 800 4"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="2" x2="800" y2="2" stroke="#FFE4F0" strokeWidth="3" strokeDasharray="6 8" />
        </svg>
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="relative rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-brand-pink-soft/60 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-pink text-white shadow-lg shadow-brand-pink/40 ring-4 ring-white">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink">Step 0{i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-brand-slate">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
