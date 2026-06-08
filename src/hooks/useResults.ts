import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "@/lib/resultsApi";

export const useResults = (enabled: boolean) =>
  useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
    enabled,
    staleTime: 60 * 1000,
  });
