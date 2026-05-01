import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#specialties", label: "Specialties" },
  { href: "#how", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-500 ${
          scrolled ? "glass-card" : "bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-display font-bold text-sm">T</span>
          </div>
          <div className="leading-tight">
            <p className="font-display font-semibold text-foreground">Tannjes</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-0.5">Clinics Limited</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+2348000000000" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <Phone className="h-4 w-4" /> 24/7 Line
          </a>
          <Button variant="hero" size="sm" asChild>
            <a href="#contact">Book Appointment</a>
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden container mx-auto mt-3">
          <div className="glass-card rounded-3xl p-6 flex flex-col gap-4 animate-fade-up">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground/90 font-medium">
                {l.label}
              </a>
            ))}
            <Button variant="hero" asChild>
              <a href="#contact">Book Appointment</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
