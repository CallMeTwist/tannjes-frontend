import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#departments", label: "Departments" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-pink text-white font-bold">T</span>
          <span className="font-display text-lg font-bold text-brand-navy">Tannjes Clinics</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-brand-navy/80 transition hover:text-brand-pink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+2347019090013" className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy">
            <Phone className="h-4 w-4 text-brand-pink" /> +234 701 909 0013
          </a>
          <Button asChild className="bg-brand-pink hover:bg-brand-pink-deep text-white">
            <a href="#book">Book Appointment</a>
          </Button>
        </div>
        <button className="md:hidden text-brand-navy" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded px-2 py-2 text-sm font-medium text-brand-navy hover:bg-brand-pink-soft"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="mt-2 bg-brand-pink hover:bg-brand-pink-deep text-white">
              <a href="#book" onClick={() => setOpen(false)}>Book Appointment</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
