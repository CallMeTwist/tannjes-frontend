import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import logo from "@/assets/logo.png";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/departments", label: "Departments" },
  { to: "/facilities", label: "Facilities" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const settings = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Inner pages have light hero background context, so navbar should be solid by default.
  const transparentBg = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparentBg
          ? "bg-white/5 backdrop-blur-md ring-1 ring-white/10"
          : "bg-white/85 shadow-[0_8px_30px_-10px_rgba(11,27,51,0.15)] backdrop-blur-xl ring-1 ring-brand-navy/5"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img
            src={logo}
            alt="Tannjes Clinics Limited"
            className="h-12 w-12 shrink-0 object-contain"
          />
          <span
            className={cn(
              "font-display text-base font-bold leading-tight whitespace-nowrap transition-colors lg:text-lg",
              transparentBg ? "text-white" : "text-brand-navy"
            )}
          >
            Tannjes Clinics Limited
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium transition hover:text-brand-pink",
                  transparentBg ? "text-white/90" : "text-brand-navy/80",
                  isActive && "text-brand-pink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-brand-pink"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${settings.phone_primary}`}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition",
              transparentBg ? "text-white" : "text-brand-navy"
            )}
          >
            <Phone className="h-4 w-4 text-brand-pink" /> {settings.phone_primary}
          </a>
          <Button asChild className="bg-brand-pink hover:bg-brand-pink-deep text-white shadow-lg shadow-brand-pink/30">
            <Link to="/contact#book">Book Appointment</Link>
          </Button>
        </div>
        <button
          className={cn("lg:hidden transition-colors", transparentBg ? "text-white" : "text-brand-navy")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded px-2 py-2 text-sm font-medium hover:bg-brand-pink-soft",
                    isActive ? "bg-brand-pink-soft text-brand-pink" : "text-brand-navy"
                  )
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2 bg-brand-pink hover:bg-brand-pink-deep text-white">
              <Link to="/contact#book" onClick={() => setOpen(false)}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
