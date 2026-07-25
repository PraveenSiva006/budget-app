import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@budget/contracts";

import TransactionForm from "../components/transaction-form";
import { useCreateTransaction } from "../hooks/use-transaction-actions";

import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

type Props = {
  onClose: () => void;
};

function CreateTransaction({ onClose }: Props) {
  const mutation = useCreateTransaction();

  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      accountId: "1",
      amount: 100,
      categoryId: "1",
      note: "",
      occurredAt: "10/10/2026",
      type: "EXPENSE",
    },
  });

  useResetMutationOnChange(form, mutation);

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);
    toast.success("Transaction created");
    onClose();
  });

  const onSaveAndNew = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);

    toast.success("Transaction created");
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSave}>
        <TransactionForm />

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

export default CreateTransaction;
