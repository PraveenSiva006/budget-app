import { useCategoryUIStore } from "@/features/categories/categories.store";
import CategoryForm from "@/features/categories/components/form";
import { useUpdateCategory } from "@/features/categories/hooks/use-category-actions";
import { AppFormProvider } from "@/lib/form";
import { updateCategorySchema, type CategoryDTO } from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function CategoryEditForm({ category }: { category: CategoryDTO }) {
  const updateMutation = useUpdateCategory();

  const { closeForm } = useCategoryUIStore();

  const form = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: category,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateMutation.mutateAsync({
      id: data.id,
      payload: data,
    });
    form.reset();
    closeForm();
  });

  return (
    <AppFormProvider form={form}>
      <CategoryForm
        {...{
          isSubmitting: updateMutation.isPending,
          onSubmit,
          onCancel: closeForm,
        }}
      />
    </AppFormProvider>
  );
}

export default CategoryEditForm;
