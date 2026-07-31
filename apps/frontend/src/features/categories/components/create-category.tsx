import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCategorySchema,
  type CreateCategoryInput,
} from "@budget/contracts";
import { useCreateCategory } from "../hooks/use-category-actions";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";
import CategoryForm from "./category-form";
import { FormSubmissionError } from "@/components/common/form-submission-error";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
};

function CreateCategory({ onClose }: Props) {
  const mutation = useCreateCategory();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  useResetMutationOnChange(form, mutation);

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);

    onClose();
  });

  const onSaveAndNew = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);

    form.reset();
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
            Save
          </Button>

          <Button
            type="button"
            onClick={onSaveAndNew}
            disabled={mutation.isPending}
          >
            Save & Create New
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export default CreateCategory;
