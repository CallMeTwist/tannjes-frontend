import type { TeamMember } from "@/data/team";

export type TeamRailProps = {
  members: TeamMember[];
  activeIndex: number;
  onJump: (index: number) => void;
};

export const TeamRail = ({ members, activeIndex, onJump }: TeamRailProps) => {
  const total = members.length;
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(total - 1, 0));
  const active = members[safeIndex];
  const percent = total > 1 ? (safeIndex / (total - 1)) * 100 : 0;

  return (
    <>
      {/* Mobile: top progress bar + label, pinned over the section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-2 px-5 pt-4 md:hidden">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={safeIndex + 1}
          aria-label="Team scroll progress"
          className="h-[2px] w-full overflow-hidden rounded-full bg-brand-navy/10"
        >
          <div
            className="h-full rounded-full bg-brand-pink transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        {active && (
          <p className="flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
            <span className="text-brand-pink">{String(safeIndex + 1).padStart(2, "0")}</span>
            <span className="text-brand-navy/30">/ {String(total).padStart(2, "0")}</span>
            <span className="ml-auto truncate normal-case tracking-normal text-brand-navy/70">
              {active.name}
            </span>
          </p>
        )}
      </div>

      {/* Desktop: vertical dot rail, pinned to the right of the section viewport */}
      <nav
        aria-label="Jump to clinician"
        className="pointer-events-auto absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:right-10 md:block"
      >
        <ul className="flex flex-col items-center gap-2.5">
          {members.map((m, i) => {
            const isActive = i === safeIndex;
            return (
              <li key={`${m.name}-${i}`} className="group relative">
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-label={`Jump to ${m.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "block h-7 w-[3px] rounded-full bg-brand-pink transition-all duration-300"
                      : "block h-[3px] w-[3px] rounded-full bg-brand-navy/30 transition-all duration-300 hover:h-5 hover:bg-brand-navy/70 focus-visible:h-5 focus-visible:bg-brand-navy/70 focus-visible:outline-none"
                  }
                />
                <span
                  className="
                    pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2
                    whitespace-nowrap rounded-md bg-brand-navy px-3 py-1.5 text-xs text-white opacity-0
                    shadow-lg transition-opacity duration-200
                    group-hover:opacity-100 group-focus-within:opacity-100
                  "
                >
                  <span className="block text-[11px] font-semibold leading-tight">{m.name}</span>
                  <span className="block text-[10px] font-normal leading-tight text-white/60">
                    {m.role}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default TeamRail;
