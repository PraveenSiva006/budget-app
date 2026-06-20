import { categoryService } from "@/features/categories/category.service";
import type { UpdateCategoryInput } from "@budget/contracts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryService.create,
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
      categoryService.update({ id, payload }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useListCategory() {
  return useQuery({
    initialData: [],
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });
}
