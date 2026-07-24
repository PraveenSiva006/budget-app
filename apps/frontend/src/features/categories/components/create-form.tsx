import CategoryForm from "@/features/categories/components/form";

import { useCreateCategory } from "@/features/categories/hooks/use-category-actions";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import {
  createCategorySchema,
  type CreateCategoryInput,
} from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  onSuccess: (persistForm?: boolean) => void;
  onCancel: () => void;
};
function CategoryCreateForm({ onSuccess, onCancel }: Props) {
  const createMutation = useCreateCategory();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      type: "EXPENSE",
    },
  });

  useResetMutationOnChange(form, createMutation);

  const onSubmit = (persistForm?: boolean) => {
    form.handleSubmit(async (category) => {
      await createMutation.mutateAsync({
        name: category.name,
        type: category.type,
      });
      form.reset();
      onSuccess(persistForm);
    });
  };

  return (
    <FormProvider {...form}>
      <CategoryForm
        {...{
          isSubmitting: form.formState.isSubmitting,
          onSubmit,
          onCancel,
          submissionError: createMutation.error,
        }}
      />
    </FormProvider>
  );
}

export default CategoryCreateForm;
