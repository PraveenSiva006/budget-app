import { transactionService } from "@/features/transactions/transaction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: transactionService.getAll,
  });
};
