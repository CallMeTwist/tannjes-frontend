import { Phone } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export const EmergencyFloatingButton = () => {
  const settings = useSettings();
  return (
  <a
    href={`tel:${settings.phone_primary}`}
    aria-label="Emergency — call now"
    className="group fixed right-4 bottom-24 z-50 inline-flex items-center gap-2 rounded-full bg-brand-pink px-4 py-3 text-white shadow-lg shadow-brand-pink/40 ring-2 ring-white/40 transition hover:bg-brand-pink/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 print:hidden md:right-6 md:bottom-6"
  >
    <span
      aria-hidden
      className="absolute inset-0 -z-10 rounded-full bg-brand-pink/40 motion-safe:animate-[emergencyPulse_2s_ease-in-out_infinite]"
    />
    <Phone className="h-5 w-5" />
    <span className="hidden text-sm font-semibold md:inline">Emergency</span>
  </a>
  );
};

export default EmergencyFloatingButton;
