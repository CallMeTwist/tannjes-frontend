import { useQuery } from "@tanstack/react-query";
import { fetchDepartments, fetchDepartment } from "@/lib/api";
import { specialties } from "@/data/specialties";
import type { DepartmentSummary, DepartmentDetail } from "@/lib/departments";

const fallbackSummaries: DepartmentSummary[] = specialties.map((s) => ({
  name: s.name,
  slug: s.slug,
  description: s.description,
  icon: s.icon,
  doctorCount: 0,
}));

export const useDepartments = (): DepartmentSummary[] => {
  const { data } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return data ?? fallbackSummaries;
};

export const useDepartment = (slug: string) =>
  useQuery<DepartmentDetail>({
    queryKey: ["department", slug],
    queryFn: () => fetchDepartment(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
  });
