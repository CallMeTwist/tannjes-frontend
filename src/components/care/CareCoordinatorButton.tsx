import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/contact";

// Calm replacement for the hospital's emergency button on care pages.
export const CareCoordinatorButton = () => (
  <a
    href={buildWhatsAppUrl("Hello, I'd like to speak with a care coordinator.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Talk to a care coordinator on WhatsApp"
    className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-care-primary px-4 py-3 text-white shadow-lg shadow-care-primary/30 ring-1 ring-white/30 transition hover:bg-care-primary-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-care-secondary print:hidden md:right-6 md:bottom-6"
  >
    <MessageCircle className="h-5 w-5" aria-hidden />
    <span className="hidden text-sm font-semibold sm:inline">Talk to a care coordinator</span>
  </a>
);

export default CareCoordinatorButton;
