import { accountService } from "@/features/accounts/api/account.service";
import { useQuery } from "@tanstack/react-query";

export function useAccountsData() {
  return useQuery({
    queryKey: ["accounts"],
    initialData: [],
    queryFn: accountService.getAll,
  });
}
