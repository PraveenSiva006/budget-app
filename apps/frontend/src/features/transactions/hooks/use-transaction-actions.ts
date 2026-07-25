import { transactionApi } from "@/features/transactions/transaction.api";
import type { UpdateTransactionInput } from "@budget/contracts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

type UpdateTransactionProps = {
  id: string;
  payload: UpdateTransactionInput;
};
export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: UpdateTransactionProps) =>
      transactionApi.update({ id, payload }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionApi.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useListTransaction() {
  return useQuery({
    initialData: [],
    queryKey: ["transactions"],
    queryFn: transactionApi.getAll,
  });
}
