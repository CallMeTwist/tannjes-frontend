import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "@/lib/api";
import { settings as staticSettings, type Settings } from "@/data/settings";

export const useSettings = (): Settings => {
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { ...staticSettings, ...(data ?? {}) };
};
