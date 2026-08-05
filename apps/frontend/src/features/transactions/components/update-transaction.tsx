import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  updateTransactionSchema,
  type TransactionWithRelations,
  type UpdateTransactionInput,
} from "@budget/contracts";

import TransactionForm from "../components/transaction-form";
import { useUpdateTransaction } from "../hooks/use-transaction-actions";

import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useAccountDropdown, useCategoryDropdown } from "@/hooks/use-dropdown";

type Props = {
  transaction: TransactionWithRelations;
  onClose: () => void;
};

function UpdateTransaction({ transaction, onClose }: Props) {
  const mutation = useUpdateTransaction();

  const form = useForm<UpdateTransactionInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      fromAccountId: transaction.fromAccount?.id,
      toAccountId: transaction.toAccount?.id,
      amount: transaction.amount,
      categoryId: transaction.categoryId ?? "",
      note: transaction.note ?? "",
      occurredAt: transaction.occurredAt,
      type: transaction.type,
    },
  });

  useResetMutationOnChange(form, mutation);

  const { data: accountsOptions } = useAccountDropdown();
  const { data: categoriesOptions } = useCategoryDropdown();

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync({
      id: transaction.id,
      payload,
    });

    toast.success("Transaction updated");
    onClose();
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSave}>
        <TransactionForm
          accounts={accountsOptions!}
          categories={categoriesOptions!}
        />

        <FormSubmissionError submissionError={mutation.error} />

        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export default UpdateTransaction;
