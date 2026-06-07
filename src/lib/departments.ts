import type { LucideIcon } from "lucide-react";
import { Stethoscope } from "lucide-react";
import { iconByName } from "@/data/specialties";

export type DepartmentSummary = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  doctorCount: number;
};

export type DepartmentDoctor = {
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  image?: string;
  isConsultant: boolean;
};

export type DepartmentDetail = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  doctors: DepartmentDoctor[];
};

export const resolveIcon = (name?: string | null): LucideIcon =>
  (name && iconByName[name]) || Stethoscope;
