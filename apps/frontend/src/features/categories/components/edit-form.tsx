import CategoryForm from "@/features/categories/components/form";
import { useUpdateCategory } from "@/features/categories/hooks/use-category-actions";
import { updateCategorySchema, type CategoryDTO } from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type z from "zod";

type Props = {
  category: CategoryDTO;
  onSuccess: () => void;
  onCancel: () => void;
};

type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;

function CategoryEditForm({ category, onSuccess, onCancel }: Props) {
  const updateMutation = useUpdateCategory();

  const form = useForm<UpdateCategoryForm>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      type: category.type,
    },
  });

  const onSubmit = form.handleSubmit(async (category) => {
    await updateMutation.mutateAsync({
      id: category.id,
      payload: {
        name: category.name,
        type: category.type,
      },
    });
    form.reset();
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <CategoryForm
        {...{
          isSubmitting: updateMutation.isPending,
          onSubmit,
          onCancel,
        }}
      />
    </FormProvider>
  );
}

export default CategoryEditForm;
