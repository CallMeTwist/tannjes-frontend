import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchConsultations, fetchMessages, sendMessage } from "@/lib/consultationsApi";

export const useConsultations = () =>
  useQuery({
    queryKey: ["consultations"],
    queryFn: fetchConsultations,
    staleTime: 30 * 1000,
  });

export const useMessages = (consultationId: number | null) =>
  useQuery({
    queryKey: ["messages", consultationId],
    queryFn: () => fetchMessages(consultationId as number),
    enabled: consultationId !== null,
    refetchInterval: 10 * 1000, // poll for staff replies
  });

export const useSendMessage = (consultationId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ body, attachment }: { body: string; attachment?: File | null }) =>
      sendMessage(consultationId, body, attachment),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["messages", consultationId] });
      void qc.invalidateQueries({ queryKey: ["consultations"] });
    },
  });
};
