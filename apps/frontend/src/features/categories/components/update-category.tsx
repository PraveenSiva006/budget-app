import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import CategoryForm from "@/features/categories/components/category-form";
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
  onClose: () => void;
};
function UpdateCategory({ category, onClose }: Props) {
  const mutation = useUpdateCategory();

  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
      type: category.type,
    },
  });

  useResetMutationOnChange(form, mutation);

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync({
      id: category.id,
      payload,
    });

    onClose();
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSave}>
        <CategoryForm />

        <FormSubmissionError submissionError={mutation.error} />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={mutation.isPending}>
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export default UpdateCategory;
