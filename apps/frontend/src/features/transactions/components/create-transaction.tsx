import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createTransactionSchema,
  TransactionTypeValues,
  type CreateTransactionInput,
} from "@budget/contracts";

import TransactionForm from "../components/transaction-form";
import { useCreateTransaction } from "../hooks/use-transaction-actions";

import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { useAccountDropdown, useCategoryDropdown } from "@/hooks/use-dropdown";

type Props = {
  onClose: () => void;
};

function CreateTransaction({ onClose }: Props) {
  const mutation = useCreateTransaction();

  const expenseValue = TransactionTypeValues.EXPENSE;

  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      fromAccountId: "",
      toAccountId: null,
      amount: "",
      categoryId: "",
      note: "",
      occurredAt: new Date().toISOString(),
      type: expenseValue,
    },
  });

  useResetMutationOnChange(form, mutation);

  const { data: accountsOptions } = useAccountDropdown();
  const { data: categoriesOptions } = useCategoryDropdown();

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);
    toast.success("Transaction created");
    onClose();
  });

  const onSaveAndNew = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync(payload);
    form.reset();
    toast.success("Transaction created");
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSave}>
        <TransactionForm
          accounts={accountsOptions || []}
          categories={categoriesOptions || []}
        />

        <FormSubmissionError submissionError={mutation.error} />

        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>

          <Button
            variant="outline"
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
