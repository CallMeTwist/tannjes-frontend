import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { services } from "@/data/services";

const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="bg-brand-navy text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-pink font-bold">T</span>
          <span className="font-display text-lg font-bold">Tannjes Clinics</span>
        </div>
        <p className="mt-3 text-sm text-white/75">Your health, your call. Premium medical concierge — 24/7 in Abuja and beyond.</p>
        <p className="mt-3 text-xs text-white/55">RC: 1355314</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Quick Links</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li><a href="#about" className="hover:text-white">About</a></li>
          <li><a href="#services" className="hover:text-white">Services</a></li>
          <li><a href="#departments" className="hover:text-white">Departments</a></li>
          <li><a href="#team" className="hover:text-white">Team</a></li>
          <li><a href="#contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Services</h4>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          {services.map((s) => (
            <li key={s.slug}>
              <a href="#services" className="hover:text-white">{s.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-pink">Contact</h4>
        <p className="mt-4 text-sm text-white/80">
          Drive 2, 1st Crescent, 3rd Avenue, House 38<br />
          Prince and Princess Estate, Kaura District, Abuja
        </p>
        <p className="mt-3 text-sm text-white/80">+234 701 909 0013<br />+234 708 611 3160</p>
        <p className="mt-3 text-sm text-white/80">tannjes03@gmail.com</p>
        <div className="mt-4 flex gap-3 text-white/70">
          <a href="#" aria-label="Facebook" className="hover:text-brand-pink"><Facebook className="h-5 w-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-brand-pink"><Instagram className="h-5 w-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-brand-pink"><Twitter className="h-5 w-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-brand-pink"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
      © {year} Tannjes Clinics Limited. All rights reserved.
    </div>
  </footer>
);

export default Footer;
