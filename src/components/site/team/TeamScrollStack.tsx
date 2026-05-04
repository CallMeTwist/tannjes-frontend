import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TeamMember } from "@/data/team";
import TeamCard from "./TeamCard";
import TeamRail from "./TeamRail";
import TeamProfileDialog from "./TeamProfileDialog";

type Props = {
  members: TeamMember[];
};

export const TeamScrollStack = ({ members }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (cardRefs.current.length !== members.length) {
    cardRefs.current = Array(members.length).fill(null);
  }

  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root || members.length === 0) return;

    const visibility = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idxAttr = (entry.target as HTMLElement).getAttribute("data-card-index");
          if (idxAttr === null) continue;
          const idx = Number(idxAttr);
          visibility.set(idx, entry.intersectionRatio);
        }
        let bestIdx = -1;
        let bestRatio = 0.6;
        for (const [idx, ratio] of visibility) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        }
        if (bestIdx !== -1) {
          setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      { root, threshold: [0, 0.25, 0.6, 0.9, 1] },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [members.length]);

  const handleJump = useCallback((index: number) => {
    const root = containerRef.current;
    const target = cardRefs.current[index];
    if (!root || !target) return;
    root.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }, []);

  const handleOpenProfile = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  const handleDialogChange = useCallback((open: boolean) => {
    if (!open) setOpenIndex(null);
  }, []);

  const activeMember = openIndex !== null ? members[openIndex] : null;

  const openHandlers = useMemo(
    () => members.map((_, i) => () => handleOpenProfile(i)),
    [members, handleOpenProfile],
  );

  if (members.length === 0) {
    return (
      <section className="relative bg-white py-24" aria-label="Team">
        <p className="mx-auto max-w-7xl px-4 text-center text-brand-slate sm:px-6 lg:px-8">
          Team coming soon.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Team members"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-brand-pink/[0.03] to-white"
    >
      <div
        ref={containerRef}
        role="region"
        aria-label="Team members"
        tabIndex={0}
        className="
          relative mx-auto h-[calc(100dvh-72px)] max-h-[900px] w-full
          overflow-y-auto overflow-x-hidden
          [scroll-snap-type:y_mandatory]
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/40
        "
      >
        {members.map((m, i) => (
          <div key={`${m.name}-${i}`} className="relative h-full w-full">
            <TeamCard
              member={m}
              index={i}
              isActive={i === activeIndex}
              eager={i === 0}
              onOpenProfile={openHandlers[i]}
              cardRef={setCardRef(i)}
            />
          </div>
        ))}
      </div>

      {/* Rail lives OUTSIDE the scrolling container so it stays pinned in view */}
      <TeamRail members={members} activeIndex={activeIndex} onJump={handleJump} />

      <TeamProfileDialog
        member={activeMember}
        open={openIndex !== null}
        onOpenChange={handleDialogChange}
      />
    </section>
  );
};

export default TeamScrollStack;
