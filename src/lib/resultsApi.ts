import { API_BASE, authHeaders } from "@/lib/patientApi";

export type TestResultItem = {
  id: number;
  title: string;
  description: string | null;
  result_date: string | null;
  file_url: string;
  created_at: string;
};

export const fetchResults = async (): Promise<TestResultItem[]> => {
  const r = await fetch(`${API_BASE}/api/patient/results`, {
    headers: { Accept: "application/json", ...authHeaders() },
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((body as { message?: string }).message ?? `Request failed (${r.status})`);
  return (body as { data: TestResultItem[] }).data;
};
