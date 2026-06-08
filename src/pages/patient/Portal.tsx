import { Link } from "react-router-dom";
import { Clock, MessageSquare, FileText, CheckCircle2, CreditCard } from "lucide-react";
import RequireAuth from "@/components/patient/RequireAuth";
import PortalLayout from "@/components/patient/PortalLayout";
import { usePatientAuth } from "@/hooks/usePatientAuth";

const StatusBanner = ({ status }: { status: string }) => {
  if (status === "approved") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle2 className="h-5 w-5" />
        <p className="text-sm font-medium">Your account is approved. You have full access to consultations and results.</p>
      </div>
    );
  }
  if (status === "pending_payment") {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
        <span className="flex items-center gap-3"><CreditCard className="h-5 w-5" /><p className="text-sm font-medium">Pay your consultation fee to continue.</p></span>
        <Link to="/patient/pay" className="rounded-full bg-brand-pink px-4 py-2 text-xs font-semibold text-white">Pay now</Link>
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
        Your registration was not approved. Please contact the clinic for assistance.
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
      <Clock className="h-5 w-5" />
      <p className="text-sm font-medium">Your payment is being verified. We'll unlock your portal once approved.</p>
    </div>
  );
};

const Portal = () => {
  const { patient } = usePatientAuth();
  const approved = patient?.status === "approved";

  return (
    <RequireAuth>
      <PortalLayout>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Welcome, {patient?.name?.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {patient?.department ? `Consulting with ${patient.department.name}` : "Your telehealth dashboard"}
        </p>

        <div className="mt-6">{patient && <StatusBanner status={patient.status} />}</div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Link
            to="/patient/portal/consultations"
            className={`rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md ${approved ? "" : "pointer-events-none opacity-60"}`}
          >
            <MessageSquare className="h-8 w-8 text-brand-pink" />
            <h3 className="mt-4 font-semibold text-brand-navy">Consultations</h3>
            <p className="mt-1 text-sm text-muted-foreground">Message your consultant securely.</p>
          </Link>
          <Link
            to="/patient/portal/results"
            className={`rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md ${approved ? "" : "pointer-events-none opacity-60"}`}
          >
            <FileText className="h-8 w-8 text-brand-pink" />
            <h3 className="mt-4 font-semibold text-brand-navy">Test Results</h3>
            <p className="mt-1 text-sm text-muted-foreground">View and download results from the hospital.</p>
          </Link>
        </div>
      </PortalLayout>
    </RequireAuth>
  );
};

export default Portal;
