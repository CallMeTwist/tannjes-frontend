import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { buildWhatsAppUrl } from "@/lib/contact";
import {
  CARE_BRAND,
  CARE_CONTACT,
  HOSPITAL_BRAND,
  HOSPITAL_HOME,
  careServiceLinks,
  careSupportLinks,
} from "@/data/careNav";
import logo from "@/assets/logo.png";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative whitespace-nowrap text-sm font-medium text-care-ink/80 transition hover:text-care-primary",
    isActive && "text-care-primary after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-care-accent"
  );

export const CareNavbar = () => {
  const settings = useSettings();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesActive = careServiceLinks.some((l) => l.to === pathname);
  const whatsapp = buildWhatsAppUrl("Hello, I'd like to speak with a care coordinator.");

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar: care line and the link through to the hospital */}
      <div className="bg-care-primary-deep text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <a href={`tel:${settings.phone_primary}`} className="inline-flex items-center gap-1.5 hover:text-care-secondary-soft">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">24/7 care line:</span> {settings.phone_primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 hover:text-care-secondary-soft md:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp a nurse
            </a>
          </div>
          <Link
            to={HOSPITAL_HOME}
            className="inline-flex shrink-0 items-center gap-1 font-medium text-white/90 hover:text-white"
          >
            <span className="hidden sm:inline">Visit</span> {HOSPITAL_BRAND}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b border-care-sand bg-care-cream/95 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-16px_rgb(var(--care-primary-deep)/0.25)]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src={logo} alt="" className="h-11 w-11 shrink-0 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="truncate font-serif text-base font-semibold text-care-ink sm:text-lg">{CARE_BRAND}</span>
              <span className="hidden text-[11px] text-care-ink/60 sm:block">by Tannjes Clinics Limited</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="care-services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition hover:text-care-primary",
                  servicesActive ? "text-care-primary" : "text-care-ink/80"
                )}
              >
                Our Care
                <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} aria-hidden />
              </button>
              {servicesOpen && (
                <div id="care-services-menu" className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-4">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-care-sand bg-white p-3 shadow-card">
                    {careServiceLinks.map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          cn(
                            "rounded-xl px-3 py-2.5 transition hover:bg-care-secondary-soft",
                            isActive && "bg-care-secondary-soft"
                          )
                        }
                      >
                        <span className="block text-sm font-semibold text-care-ink">{l.label}</span>
                        <span className="mt-0.5 block text-xs text-care-ink/60">{l.blurb}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {careSupportLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:block">
            <Button asChild className="rounded-full bg-care-primary px-5 text-white hover:bg-care-primary-deep">
              <Link to={CARE_CONTACT}>Request an assessment</Link>
            </Button>
          </div>

          <button
            type="button"
            className="text-care-ink xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100vh-6.25rem)] overflow-y-auto border-t border-care-sand bg-care-cream xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-4">
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-care-ink/50">Our Care</p>
              {careServiceLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-2 py-2 text-sm font-medium",
                      isActive ? "bg-care-secondary-soft text-care-primary" : "text-care-ink"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="my-3 h-px bg-care-sand" />
              {careSupportLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-2 py-2 text-sm font-medium",
                      isActive ? "bg-care-secondary-soft text-care-primary" : "text-care-ink"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button asChild className="mt-4 rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
                <Link to={CARE_CONTACT}>Request an assessment</Link>
              </Button>
              <Link
                to={HOSPITAL_HOME}
                className="mt-3 inline-flex items-center justify-center gap-1 rounded-full border border-care-primary/30 px-4 py-2 text-sm font-medium text-care-primary"
              >
                Visit {HOSPITAL_BRAND} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CareNavbar;
