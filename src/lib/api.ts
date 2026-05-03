import type { TeamMember } from "@/data/team";
import type { Settings } from "@/data/settings";

const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

type ApiTeamMember = {
  name: string;
  role: string;
  bio: string;
  credentials: string | null;
  image_url: string | null;
  sort_order: number;
};

export const fetchTeam = async (): Promise<TeamMember[]> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/team`);
  if (!r.ok) throw new Error(`team ${r.status}`);
  const data = (await r.json()) as ApiTeamMember[];
  return data.map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio,
    credentials: m.credentials ?? undefined,
    image: m.image_url ?? "",
  }));
};

export const fetchSettings = async (): Promise<Settings> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/settings`);
  if (!r.ok) throw new Error(`settings ${r.status}`);
  return (await r.json()) as Settings;
};
