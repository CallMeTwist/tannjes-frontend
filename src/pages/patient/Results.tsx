import { Download, FileText, Loader2, Lock } from "lucide-react";
import RequireAuth from "@/components/patient/RequireAuth";
import PortalLayout from "@/components/patient/PortalLayout";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { useResults } from "@/hooks/useResults";

const Results = () => {
  const { patient } = usePatientAuth();
  const approved = patient?.status === "approved";
  const { data, isLoading } = useResults(approved);

  return (
    <RequireAuth>
      <PortalLayout>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Test Results</h1>
        <p className="mt-1 text-sm text-muted-foreground">Results uploaded by the hospital.</p>

        <div className="mt-6">
          {!approved ? (
            <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Lock className="h-10 w-10 text-brand-pink" />
              <h3 className="mt-4 font-semibold text-brand-navy">Awaiting approval</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Your results will appear here once your account is approved.
              </p>
            </div>
          ) : isLoading ? (
            <Loader2 className="mx-auto mt-12 h-6 w-6 animate-spin text-brand-pink" />
          ) : !data || data.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-muted-foreground">
              No results have been uploaded yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.map((r) => (
                <article key={r.id} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-pink-soft text-brand-pink">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-brand-navy">{r.title}</h3>
                      {r.description && <p className="mt-0.5 text-sm text-muted-foreground">{r.description}</p>}
                      {r.result_date && <p className="mt-1 text-xs text-muted-foreground">Result date: {r.result_date}</p>}
                    </div>
                  </div>
                  <a href={r.file_url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-brand-pink px-3 py-2 text-xs font-semibold text-white">
                    <Download className="h-3.5 w-3.5" /> Open
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </PortalLayout>
    </RequireAuth>
  );
};

export default Results;
