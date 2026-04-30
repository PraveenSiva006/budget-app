import { useCategoryUIStore } from "@/features/categories/categories.store";
import CategoryForm from "@/features/categories/components/form";

import { useCreateCategory } from "@/features/categories/hooks/use-category-actions";
import { AppFormProvider } from "@/lib/form";

import { useCrudForm } from "@/lib/form/use-crud-form";
import { createCategorySchema } from "@budget/contracts";

function CategoryCreateForm() {
  const createMutation = useCreateCategory();
  const { closeForm } = useCategoryUIStore();

  const { form, isSubmitting, onSubmit } = useCrudForm({
    schema: createCategorySchema,
    onSuccess: closeForm,
    defaultValues: {
      name: "",
      type: "INCOME",
    },
    mutation: createMutation,
  });

  return (
    <AppFormProvider form={form}>
      <CategoryForm {...{ isSubmitting, onSubmit, onCancel: closeForm }} />
    </AppFormProvider>
  );
}

export default CategoryCreateForm;
