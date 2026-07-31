import { accountApi } from "@/features/accounts/account.api";
import { categoryApi } from "@/features/categories/category.api";
import { useQuery } from "@tanstack/react-query";

export const useAccountDropdown = () => {
  return useQuery({
    queryKey: ["accounts-dropdown"],
    queryFn: accountApi.getDropdownOptions,
  });
};

export const useCategoryDropdown = () => {
  return useQuery({
    queryKey: ["categories-dropdown"],
    queryFn: categoryApi.getDropdownOptions,
  });
};
