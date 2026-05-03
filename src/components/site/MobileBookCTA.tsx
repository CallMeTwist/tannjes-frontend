import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export const MobileBookCTA = () => {
  const settings = useSettings();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-pink-soft bg-white/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(11,27,51,0.18)] transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
        <a
          href={`tel:${settings.phone_primary}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-brand-pink/30 bg-white px-3 py-2 text-sm font-semibold text-brand-pink"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <Link
          to="/contact#book"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-pink px-3 py-2 text-sm font-semibold text-white shadow-md shadow-brand-pink/30"
        >
          <CalendarCheck className="h-4 w-4" /> Book
        </Link>
      </div>
    </div>
  );
};

export default MobileBookCTA;
