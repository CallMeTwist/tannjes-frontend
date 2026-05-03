import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import type { TeamMember } from "@/data/team";

type Props = {
  member: TeamMember;
  eager?: boolean;
};

export const DoctorCard = ({ member, eager = false }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_30px_60px_-30px_rgba(11,27,51,0.25)]">
          <img
            src={member.image}
            alt={member.name}
            loading={eager ? "eager" : "lazy"}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            width={600}
            height={800}
          />
        </div>
      </div>
      <div className="md:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-pink">
          {member.role}
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-brand-navy md:text-5xl">
          {member.name}
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-brand-slate">
          {member.bio}
        </p>
        {member.credentials && (
          <p className="mt-3 text-sm text-brand-slate/80">{member.credentials}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact#book"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-pink px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-pink/30 transition hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60"
          >
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </Link>
          <button
            type="button"
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-navy/15 px-5 py-3 text-sm font-semibold text-brand-navy/60"
          >
            View profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
