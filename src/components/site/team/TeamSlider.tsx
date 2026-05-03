import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TeamMember } from "@/data/team";
import DoctorCard from "./DoctorCard";
import ThumbnailNav from "./ThumbnailNav";

type Props = {
  members: TeamMember[];
};

const SWIPE_THRESHOLD = 60;

export const TeamSlider = ({ members }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  if (members.length === 0) {
    return (
      <section className="relative bg-white py-24" aria-label="Team">
        <p className="mx-auto max-w-7xl px-4 text-center text-brand-slate sm:px-6 lg:px-8">
          Team coming soon.
        </p>
      </section>
    );
  }

  const advance = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + members.length) % members.length);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      advance(dx < 0 ? 1 : -1);
    }
    touchStartRef.current = null;
  };

  const active = members[activeIndex];
  const transition = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      role="region"
      aria-label="Team"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative min-h-screen overflow-hidden bg-white py-20 focus:outline-none lg:py-28"
    >
      <div className="absolute inset-0 texture-waves opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-stretch gap-12 px-4 sm:px-6 lg:px-8">
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -16, scale: 0.98 }}
              transition={transition}
            >
              <DoctorCard member={active} eager={activeIndex === 0} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ThumbnailNav members={members} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  );
};

export default TeamSlider;
