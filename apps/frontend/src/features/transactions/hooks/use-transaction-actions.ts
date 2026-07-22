import { transactionService } from "@/features/transactions/transaction.service";
import type { UpdateTransactionInput } from "@budget/contracts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionService.create,
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
      transactionService.update({ id, payload }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}

export function useListTransaction() {
  return useQuery({
    initialData: [],
    queryKey: ["transactions"],
    queryFn: transactionService.getAll,
  });
}
