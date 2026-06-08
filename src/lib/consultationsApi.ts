import { API_BASE, authHeaders } from "@/lib/patientApi";

export type ConsultationSummary = {
  id: number;
  subject: string;
  status: string;
  doctor: { name: string; role: string } | null;
  last_message_at: string | null;
};

export type ChatMessage = {
  id: number;
  sender_type: "patient" | "staff";
  body: string;
  attachment_url: string | null;
  created_at: string;
};

const json = async (r: Response) => {
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((body as { message?: string }).message ?? `Request failed (${r.status})`);
  return body;
};

export const fetchConsultations = async (): Promise<ConsultationSummary[]> => {
  const r = await fetch(`${API_BASE}/api/patient/consultations`, {
    headers: { Accept: "application/json", ...authHeaders() },
  });
  return (await json(r) as { data: ConsultationSummary[] }).data;
};

export const fetchMessages = async (
  consultationId: number,
): Promise<{ consultation: ConsultationSummary; messages: ChatMessage[] }> => {
  const r = await fetch(`${API_BASE}/api/patient/consultations/${consultationId}/messages`, {
    headers: { Accept: "application/json", ...authHeaders() },
  });
  return json(r) as Promise<{ consultation: ConsultationSummary; messages: ChatMessage[] }>;
};

export const sendMessage = async (
  consultationId: number,
  body: string,
  attachment?: File | null,
): Promise<ChatMessage> => {
  const form = new FormData();
  form.append("body", body);
  if (attachment) form.append("attachment", attachment);
  const r = await fetch(`${API_BASE}/api/patient/consultations/${consultationId}/messages`, {
    method: "POST",
    headers: { Accept: "application/json", ...authHeaders() },
    body: form,
  });
  return (await json(r) as { message: ChatMessage }).message;
};
