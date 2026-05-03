import type { TeamMember } from "@/data/team";

type Props = {
  members: TeamMember[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const ThumbnailNav = ({ members, activeIndex, onSelect }: Props) => (
  <div className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-2 py-3 md:justify-center md:overflow-visible">
    {members.map((m, i) => {
      const active = i === activeIndex;
      return (
        <button
          key={m.name}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show ${m.name}`}
          aria-current={active ? "true" : undefined}
          className={`group relative shrink-0 snap-center transition-transform duration-300 ${
            active ? "scale-110 opacity-100" : "scale-100 opacity-60 hover:scale-105 hover:opacity-90"
          }`}
        >
          <span
            className={`block h-12 w-12 overflow-hidden rounded-full ring-offset-2 md:h-14 md:w-14 ${
              active ? "ring-2 ring-brand-pink" : ""
            }`}
          >
            <img
              src={m.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>
          <span
            aria-hidden
            className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-pink transition-opacity ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      );
    })}
  </div>
);

export default ThumbnailNav;
