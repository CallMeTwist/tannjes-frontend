import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, ShieldCheck, UploadCloud } from "lucide-react";
import AuthShell from "@/components/patient/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { submitPayment } from "@/lib/patientApi";

const CONSULTATION_FEE = 15000; // NGN — adjust to clinic's fee
const BANK = { name: "Tannjes Clinics Ltd", bank: "Zenith Bank", account: "1012345678" };

const Pay = () => {
  const navigate = useNavigate();
  const { patient, refresh } = usePatientAuth();
  const [reference, setReference] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (patient && patient.status !== "pending_payment" && !done) {
    // Already paid / approved — send to portal.
    navigate("/patient/portal", { replace: true });
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proof) {
      setError("Please attach your proof of payment.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await submitPayment({ amount: CONSULTATION_FEE, reference, proof });
      await refresh();
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit payment");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthShell
        title="Payment received"
        footer={<button onClick={() => navigate("/patient/portal")} className="font-semibold text-brand-pink">Go to my portal</button>}
      >
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
          <h3 className="mt-4 font-semibold text-brand-navy">Awaiting approval</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you! Our team will verify your payment and approve your account shortly. You'll be
            able to message your consultant and view results once approved.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Consultation fee"
      subtitle="Pay the consultation fee to unlock your telehealth portal."
      badge="Step 2 of 3"
      footer={<span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Your details are kept private.</span>}
    >
      <div className="mb-6 rounded-2xl border border-brand-pink-soft/60 bg-brand-pink-soft/20 p-5">
        <p className="text-sm text-muted-foreground">Consultation fee</p>
        <p className="font-display text-3xl font-extrabold text-brand-navy">₦{CONSULTATION_FEE.toLocaleString()}</p>
        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Account name</dt><dd className="font-semibold text-brand-navy">{BANK.name}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Bank</dt><dd className="font-semibold text-brand-navy">{BANK.bank}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Account number</dt><dd className="font-semibold text-brand-navy">{BANK.account}</dd></div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Transfer the fee, then upload your proof of payment below. Use your name as the transfer narration.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="reference">Transfer reference (optional)</Label>
          <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g. bank transaction ID" />
        </div>
        <div>
          <Label htmlFor="proof">Proof of payment</Label>
          <label className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-pink-soft bg-white p-6 text-center transition hover:border-brand-pink">
            <UploadCloud className="h-8 w-8 text-brand-pink" />
            <span className="mt-2 text-sm font-medium text-brand-navy">
              {proof ? proof.name : "Click to upload (image or PDF, max 5MB)"}
            </span>
            <input
              id="proof"
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setProof(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full bg-brand-pink hover:bg-brand-pink/90">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit payment
        </Button>
      </form>
    </AuthShell>
  );
};

export default Pay;
