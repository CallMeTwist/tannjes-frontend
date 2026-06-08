import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FileText, LogOut, HeartPulse } from "lucide-react";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/patient/portal", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/patient/portal/consultations", label: "Consultations", icon: MessageSquare, end: false },
  { to: "/patient/portal/results", label: "Test Results", icon: FileText, end: false },
];

export const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const { patient, logout } = usePatientAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/patient/login");
  };

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[260px_1fr]">
      <aside className="hidden flex-col border-r border-slate-200 bg-white p-5 lg:flex">
        <NavLink to="/" className="mb-8 inline-flex items-center gap-2 font-display text-lg font-bold text-brand-navy">
          <HeartPulse className="h-5 w-5 text-brand-pink" /> Tannjes
        </NavLink>
        <nav className="flex-1 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-brand-pink text-white" : "text-brand-navy hover:bg-brand-pink-soft/40",
                )
              }
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-200 pt-4">
          <p className="truncate text-sm font-semibold text-brand-navy">{patient?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{patient?.email}</p>
          <button onClick={onLogout} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-pink">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <span className="font-display font-bold text-brand-navy">Patient Portal</span>
          <button onClick={onLogout} className="text-sm font-medium text-brand-pink">Sign out</button>
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
