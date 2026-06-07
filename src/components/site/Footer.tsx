import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { services } from "@/data/services";
import { useSettings } from "@/hooks/useSettings";
import logo from "@/assets/logo.png";

const year = new Date().getFullYear();

export const Footer = () => {
  const settings = useSettings();
  return (
  <footer className="relative bg-brand-navy text-white">
    <div className="absolute inset-0 texture-cross-light opacity-70" aria-hidden />
    <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Tannjes Clinics Limited"
            className="h-12 w-12 shrink-0 rounded-md bg-white/95 object-contain p-1"
          />
          <span className="font-display text-lg font-bold leading-tight">Tannjes Clinics Limited</span>
        </div>
        <p className="mt-3 text-sm text-white/75">Your health, your call. Premium medical concierge — 24/7 in Abuja and beyond.</p>
        <p className="mt-3 text-xs text-white/55">RC: 1355314</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Quick Links</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li><Link to="/services" className="hover:text-white">Services</Link></li>
          <li><Link to="/departments" className="hover:text-white">Departments</Link></li>
          <li><Link to="/facilities" className="hover:text-white">Facilities</Link></li>
          <li><Link to="/team" className="hover:text-white">Team</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Services</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to="/services" className="hover:text-white">{s.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Contact</h4>
        <p className="mt-4 text-sm text-white/80">{settings.address}</p>
        <p className="mt-3 text-sm text-white/80">{settings.phone_primary}<br />{settings.phone_secondary}</p>
        <p className="mt-3 text-sm text-white/80">{settings.email}</p>
        <div className="mt-4 flex gap-3 text-white/70">
          <a href="#" aria-label="Facebook" className="hover:text-brand-pink"><Facebook className="h-5 w-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-brand-pink"><Instagram className="h-5 w-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-brand-pink"><Twitter className="h-5 w-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-brand-pink"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
    <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/55">
      © {year} Tannjes Clinics Limited. All rights reserved.
    </div>
  </footer>
  );
};

export default Footer;
