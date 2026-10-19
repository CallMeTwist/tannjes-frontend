import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import {
  CARE_BRAND,
  HOSPITAL_BRAND,
  HOSPITAL_HOME,
  careServiceLinks,
  careSupportLinks,
} from "@/data/careNav";
import logo from "@/assets/logo.png";

const year = new Date().getFullYear();

const hospitalLinks = [
  { to: HOSPITAL_HOME, label: "Hospital home" },
  { to: "/departments", label: "Departments" },
  { to: "/facilities", label: "Facilities" },
  { to: "/team", label: "Our doctors" },
  { to: "/patient/login", label: "Patient portal" },
];

const headingClass = "text-xs font-semibold uppercase tracking-[0.16em] text-care-secondary";
const linkClass = "text-white/75 transition hover:text-white";

export const CareFooter = () => {
  const settings = useSettings();
  return (
    <footer className="bg-care-primary-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 shrink-0 rounded-lg bg-white/95 object-contain p-1" />
            <span className="font-serif text-xl font-semibold leading-tight">{CARE_BRAND}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            Home care, palliative care, hospice and end-of-life care in Abuja, at home or in our inpatient hospice.
            Part of Tannjes Clinics Limited.
          </p>
          <p className="mt-4 text-sm text-white/75">{settings.address}</p>
          <p className="mt-2 text-sm text-white/75">
            <a href={`tel:${settings.phone_primary}`} className={linkClass}>{settings.phone_primary}</a>
            {" · "}
            <a href={`tel:${settings.phone_secondary}`} className={linkClass}>{settings.phone_secondary}</a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${settings.email}`} className={linkClass}>{settings.email}</a>
          </p>
          <div className="mt-5 flex gap-3 text-white/60">
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h4 className={headingClass}>Our Care</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {careServiceLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClass}>Support</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {careSupportLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClass}>{HOSPITAL_BRAND}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {hospitalLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
            ))}
          </ul>
          <Link
            to={HOSPITAL_HOME}
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 transition hover:bg-white/20"
          >
            Visit the hospital <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {year} Tannjes Clinics Limited · RC: 1355314. All rights reserved.
      </div>
    </footer>
  );
};

export default CareFooter;
