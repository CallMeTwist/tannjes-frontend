import { useQuery } from "@tanstack/react-query";
import { fetchTeam } from "@/lib/api";
import { team as staticTeam, type TeamMember } from "@/data/team";

export const useTeam = (): TeamMember[] => {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return data ?? staticTeam;
};
