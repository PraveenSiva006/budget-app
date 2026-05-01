import CategoryForm from "@/features/categories/components/form";

import { useCreateCategory } from "@/features/categories/hooks/use-category-actions";
import z from "zod";

import { createCategorySchema } from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};
type CreateAccountForm = z.infer<typeof createCategorySchema>;

function CategoryCreateForm({ onSuccess, onCancel }: Props) {
  const createMutation = useCreateCategory();

  const form = useForm<CreateAccountForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      type: "EXPENSE",
    },
  });

  const onSubmit = form.handleSubmit(async (category) => {
    await createMutation.mutateAsync({
      name: category.name,
      type: category.type,
    });
    form.reset();
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <CategoryForm
        {...{
          isSubmitting: form.formState.isSubmitting,
          onSubmit,
          onCancel,
        }}
      />
    </FormProvider>
  );
}

export default CategoryCreateForm;
