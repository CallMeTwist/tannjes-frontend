import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Lock, Paperclip, Send } from "lucide-react";
import RequireAuth from "@/components/patient/RequireAuth";
import PortalLayout from "@/components/patient/PortalLayout";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { useConsultations, useMessages, useSendMessage } from "@/hooks/useConsultations";
import { cn } from "@/lib/utils";

const LockedState = () => (
  <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
    <Lock className="h-10 w-10 text-brand-pink" />
    <h3 className="mt-4 font-semibold text-brand-navy">Awaiting approval</h3>
    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
      Your consultation unlocks once the clinic approves your payment. Please check back soon.
    </p>
  </div>
);

const Composer = ({ consultationId }: { consultationId: number }) => {
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const send = useSendMessage(consultationId);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    send.mutate(
      { body, attachment },
      { onSuccess: () => { setBody(""); setAttachment(null); } },
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
      <label className="cursor-pointer rounded-full p-2 text-brand-navy hover:bg-slate-100">
        <Paperclip className="h-5 w-5" />
        <input type="file" accept="image/*,application/pdf" className="hidden"
          onChange={(e) => setAttachment(e.target.files?.[0] ?? null)} />
      </label>
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={attachment ? `Attached: ${attachment.name}` : "Type your message…"}
        className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-pink"
      />
      <button type="submit" disabled={send.isPending}
        className="grid h-10 w-10 place-items-center rounded-full bg-brand-pink text-white disabled:opacity-50">
        {send.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </button>
    </form>
  );
};

const Thread = ({ consultationId }: { consultationId: number }) => {
  const { data, isLoading } = useMessages(consultationId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages.length]);

  return (
    <div className="flex h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <p className="font-semibold text-brand-navy">{data?.consultation.subject ?? "Consultation"}</p>
        <p className="text-xs text-muted-foreground">
          {data?.consultation.doctor ? `${data.consultation.doctor.name} · ${data.consultation.doctor.role}` : "A consultant will respond shortly"}
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
        {isLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin text-brand-pink" />}
        {data?.messages.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No messages yet. Say hello to your consultant 👋
          </p>
        )}
        {data?.messages.map((m) => (
          <div key={m.id} className={cn("flex", m.sender_type === "patient" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
              m.sender_type === "patient" ? "bg-brand-pink text-white" : "bg-white text-brand-navy ring-1 ring-slate-200",
            )}>
              <p className="whitespace-pre-wrap">{m.body}</p>
              {m.attachment_url && (
                <a href={m.attachment_url} target="_blank" rel="noreferrer"
                  className={cn("mt-1 inline-flex items-center gap-1 text-xs underline", m.sender_type === "patient" ? "text-white/90" : "text-brand-pink")}>
                  <Paperclip className="h-3 w-3" /> Attachment
                </a>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <Composer consultationId={consultationId} />
    </div>
  );
};

const Consultations = () => {
  const { patient } = usePatientAuth();
  const approved = patient?.status === "approved";
  const { data: consultations, isLoading } = useConsultations();
  const [activeId, setActiveId] = useState<number | null>(null);

  const active = useMemo(
    () => activeId ?? consultations?.[0]?.id ?? null,
    [activeId, consultations],
  );

  return (
    <RequireAuth>
      <PortalLayout>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Consultations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Secure messaging with your consultant.</p>

        <div className="mt-6">
          {!approved ? (
            <LockedState />
          ) : isLoading ? (
            <Loader2 className="mx-auto mt-12 h-6 w-6 animate-spin text-brand-pink" />
          ) : !consultations || consultations.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-muted-foreground">
              Your consultation will appear here shortly.
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
              <div className="space-y-2">
                {consultations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left transition",
                      active === c.id ? "border-brand-pink bg-brand-pink-soft/30" : "border-slate-200 bg-white hover:border-brand-pink",
                    )}
                  >
                    <p className="text-sm font-semibold text-brand-navy">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.doctor?.name ?? "Consultant"}</p>
                  </button>
                ))}
              </div>
              {active !== null && <Thread consultationId={active} />}
            </div>
          )}
        </div>
      </PortalLayout>
    </RequireAuth>
  );
};

export default Consultations;
