import { categoryApi } from "@/features/categories/category.api";
import type { UpdateCategoryInput } from "@budget/contracts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

type UpdateCategoryProps = {
  id: string;
  payload: UpdateCategoryInput;
};
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: UpdateCategoryProps) =>
      categoryApi.update({ id, payload }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useListCategory() {
  return useQuery({
    initialData: [],
    queryKey: ["categories"],
    queryFn: categoryApi.getAll,
  });
}
