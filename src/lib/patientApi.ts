const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
export const TOKEN_KEY = "tannjes_patient_token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string): void => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

export type PatientProfile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: "pending_payment" | "pending_approval" | "approved" | "rejected";
  department: { name: string; slug: string } | null;
};

type AuthResponse = { token: string; patient: PatientProfile };

const json = async (r: Response) => {
  const body = await r.json().catch(() => ({}));
  if (!r.ok) {
    const message =
      (body as { message?: string }).message ??
      Object.values((body as { errors?: Record<string, string[]> }).errors ?? {})[0]?.[0] ??
      `Request failed (${r.status})`;
    throw new Error(message);
  }
  return body;
};

const authHeaders = (): HeadersInit => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const registerPatient = async (input: {
  name: string; email: string; phone?: string; password: string; department_slug?: string;
}): Promise<AuthResponse> => {
  const r = await fetch(`${BASE}/api/patient/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  return json(r) as Promise<AuthResponse>;
};

export const loginPatient = async (email: string, password: string): Promise<AuthResponse> => {
  const r = await fetch(`${BASE}/api/patient/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return json(r) as Promise<AuthResponse>;
};

export const fetchMe = async (): Promise<PatientProfile> => {
  const r = await fetch(`${BASE}/api/patient/me`, {
    headers: { Accept: "application/json", ...authHeaders() },
  });
  return json(r) as Promise<PatientProfile>;
};

export const logoutPatient = async (): Promise<void> => {
  await fetch(`${BASE}/api/patient/logout`, {
    method: "POST",
    headers: { Accept: "application/json", ...authHeaders() },
  }).catch(() => undefined);
  clearToken();
};

export const submitPayment = async (input: {
  amount: number; reference?: string; proof: File;
}): Promise<{ patient: { status: PatientProfile["status"] } }> => {
  const form = new FormData();
  form.append("amount", String(input.amount));
  if (input.reference) form.append("reference", input.reference);
  form.append("proof", input.proof);
  const r = await fetch(`${BASE}/api/patient/payment`, {
    method: "POST",
    headers: { Accept: "application/json", ...authHeaders() },
    body: form,
  });
  return json(r) as Promise<{ patient: { status: PatientProfile["status"] } }>;
};

export { BASE as API_BASE, authHeaders };
