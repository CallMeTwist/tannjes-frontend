import { PhoneCall, ClipboardList, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  { icon: PhoneCall, title: "Reach out", body: "Call, WhatsApp, or fill our 60-second form. We pick up 24/7." },
  { icon: ClipboardList, title: "We assess and match", body: "We pair you with the right physician, nurse, or specialist for your need." },
  { icon: HeartHandshake, title: "Care delivered", body: "Concierge care arrives at your door — and stays with you through recovery." },
];

export const HowItWorks = () => (
  <section id="how-it-works" className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="How It Works" title="Three steps to expert care." />
      <div className="relative mt-14 grid gap-10 md:grid-cols-3">
        <div
          className="absolute left-0 right-0 top-7 hidden h-px border-t-2 border-dashed border-brand-pink-soft md:block"
          aria-hidden
        />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="relative rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-pink-soft/60">
              <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-pink text-white shadow-lg ring-4 ring-white">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-pink">Step {i + 1}</p>
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
