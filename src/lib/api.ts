import type { TeamMember } from "@/data/team";
import type { Settings } from "@/data/settings";
import type { DepartmentSummary, DepartmentDetail } from "@/lib/departments";
import { resolveIcon } from "@/lib/departments";

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

type ApiDepartment = {
  name: string; slug: string; description: string | null;
  icon: string | null; doctor_count: number;
};

type ApiDepartmentDoctor = {
  name: string; role: string; bio: string; credentials: string | null;
  image_url: string | null; is_consultant: boolean;
};

export const fetchDepartments = async (): Promise<DepartmentSummary[]> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/departments`);
  if (!r.ok) throw new Error(`departments ${r.status}`);
  const data = (await r.json()) as ApiDepartment[];
  return data.map((d) => ({
    name: d.name,
    slug: d.slug,
    description: d.description ?? "",
    icon: resolveIcon(d.icon),
    doctorCount: d.doctor_count,
  }));
};

export const fetchDepartment = async (slug: string): Promise<DepartmentDetail> => {
  if (!BASE) throw new Error("VITE_API_URL not set");
  const r = await fetch(`${BASE}/api/departments/${slug}`);
  if (!r.ok) throw new Error(`department ${r.status}`);
  const data = (await r.json()) as { department: ApiDepartment; doctors: ApiDepartmentDoctor[] };
  return {
    name: data.department.name,
    slug: data.department.slug,
    description: data.department.description ?? "",
    icon: resolveIcon(data.department.icon),
    doctors: data.doctors.map((m) => ({
      name: m.name,
      role: m.role,
      bio: m.bio,
      credentials: m.credentials ?? undefined,
      image: m.image_url ?? undefined,
      isConsultant: m.is_consultant,
    })),
  };
};
