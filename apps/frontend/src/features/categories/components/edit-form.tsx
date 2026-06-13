import CategoryForm from "@/features/categories/components/form";
import { useUpdateCategory } from "@/features/categories/hooks/use-category-actions";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";
import {
  updateCategorySchema,
  type Category,
  type UpdateCategoryInput,
} from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
type Props = {
  category: Category;
  onSuccess: () => void;
  onCancel: () => void;
};

function CategoryEditForm({ category, onSuccess, onCancel }: Props) {
  const updateMutation = useUpdateCategory();

  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
      type: category.type,
    },
  });

  useResetMutationOnChange(form, updateMutation);

  const onSubmit = form.handleSubmit(async (payload) => {
    await updateMutation.mutateAsync({
      id: category.id,
      payload: {
        name: payload.name,
        type: payload.type,
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
          submissionError: updateMutation.error,
        }}
      />
    </FormProvider>
  );
}

export default CategoryEditForm;
