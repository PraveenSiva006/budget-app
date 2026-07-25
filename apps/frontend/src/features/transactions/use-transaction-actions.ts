import { transactionApi } from "@/features/transactions/transaction.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transaction"],
    queryFn: transactionApi.getAll,
  });
};
