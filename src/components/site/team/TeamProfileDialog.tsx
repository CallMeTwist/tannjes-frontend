import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { TeamMember } from "@/data/team";

type Props = {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TeamProfileDialog = ({ member, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open && member !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 sm:rounded-2xl">
        {member && (
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="relative md:col-span-2">
              <div className="aspect-[3/4] md:h-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/0"
              />
            </div>
            <div className="flex flex-col p-6 md:col-span-3 md:p-8">
              <DialogHeader className="space-y-2 text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-pink">
                  {member.role}
                </p>
                <DialogTitle className="font-display text-2xl font-bold text-brand-navy md:text-3xl">
                  {member.name}
                </DialogTitle>
                {member.credentials && (
                  <p className="text-xs text-brand-slate/80">{member.credentials}</p>
                )}
              </DialogHeader>

              <DialogDescription className="mt-5 text-sm leading-relaxed text-brand-slate md:text-base">
                {member.bio}
              </DialogDescription>

              <div className="mt-auto pt-6">
                <Link
                  to="/contact#book"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-pink px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-pink/30 transition hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/60"
                >
                  <CalendarCheck className="h-4 w-4" /> Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TeamProfileDialog;
