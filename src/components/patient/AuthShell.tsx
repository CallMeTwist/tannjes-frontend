import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export const AuthShell = ({ title, subtitle, badge, children, footer }: Props) => (
  <div className="grid min-h-screen lg:grid-cols-2">
    {/* Brand panel */}
    <div className="relative hidden overflow-hidden bg-brand-navy p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_30%,rgba(225,29,116,0.35),transparent_60%)]" aria-hidden />
      <Link to="/" className="relative inline-flex items-center gap-2 font-display text-xl font-bold">
        <HeartPulse className="h-6 w-6 text-brand-pink" /> Tannjes Clinics
      </Link>
      <div className="relative max-w-md">
        <h2 className="font-display text-3xl font-extrabold leading-tight">
          Care that follows you home.
        </h2>
        <p className="mt-4 text-white/80">
          Register once, pay your consultation fee, and consult our specialists securely from
          anywhere — plus view your test results online.
        </p>
      </div>
      <p className="relative text-sm text-white/50">Abuja, Nigeria</p>
    </div>

    {/* Form panel */}
    <div className="flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        {badge && (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-semibold text-brand-pink">
            {badge}
          </span>
        )}
        <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-navy">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  </div>
);

export default AuthShell;
