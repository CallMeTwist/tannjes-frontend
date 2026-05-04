import { memo, useId } from "react";
import type { TeamMember } from "@/data/team";

export type TeamCardProps = {
  member: TeamMember;
  index: number;
  isActive: boolean;
  eager: boolean;
  onOpenProfile: () => void;
  cardRef: React.Ref<HTMLElement>;
};

const TeamCardImpl = ({
  member,
  index,
  isActive,
  eager,
  onOpenProfile,
  cardRef,
}: TeamCardProps) => {
  const nameId = useId();

  return (
    <article
      ref={cardRef as React.Ref<HTMLElement>}
      data-active={isActive ? "true" : "false"}
      data-card-index={index}
      aria-labelledby={nameId}
      className="
        group relative flex h-full w-full shrink-0 snap-center snap-always
        items-center justify-center px-6 py-10 sm:px-10 lg:px-20
        transition-opacity duration-500 ease-out
        data-[active=false]:opacity-70 data-[active=true]:opacity-100
        motion-reduce:opacity-100
      "
      style={{ scrollSnapStop: "always" }}
    >
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14">
        {/* Portrait */}
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-brand-navy/5">
            <img
              src={member.image}
              alt={member.name}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="
                h-full w-full object-cover object-center
                transition-transform duration-[1200ms] ease-out
                group-data-[active=true]:scale-[1.02]
                motion-reduce:transition-none motion-reduce:transform-none
              "
            />
          </div>
          {/* Soft accent shape behind portrait */}
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 rounded-[32px] bg-gradient-to-br from-brand-pink/15 via-transparent to-brand-navy/10 blur-2xl"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 md:col-span-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-pink">
            {member.role}
          </p>

          <h3
            id={nameId}
            className="font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-brand-navy md:text-[2.75rem] lg:text-[3.25rem]"
          >
            {member.name}
          </h3>

          {member.credentials && (
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-slate/60">
              {member.credentials}
            </p>
          )}

          <p className="max-w-prose text-base leading-relaxed text-brand-slate md:text-lg">
            {member.bio}
          </p>

          <div className="mt-2 flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenProfile}
              className="
                group/btn inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-navy
                underline decoration-brand-pink decoration-2 underline-offset-[6px]
                transition hover:text-brand-pink focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-brand-pink/60 focus-visible:rounded-sm
              "
            >
              View profile
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const TeamCard = memo(TeamCardImpl);

export default TeamCard;
