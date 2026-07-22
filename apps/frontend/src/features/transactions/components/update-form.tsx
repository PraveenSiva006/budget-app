import TransactionForm from "@/features/transactions/components/form";
import { useUpdateTransaction } from "@/features/transactions/hooks/use-transaction-actions";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";
import {
  updateTransactionSchema,
  type Transaction,
  type UpdateTransactionInput,
} from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  transaction: Transaction;
  onSuccess: () => void;
  onCancel: () => void;
};

function TransactionUpdateForm({ transaction, onSuccess, onCancel }: Props) {
  const updateMutation = useUpdateTransaction();

  const form = useForm<UpdateTransactionInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      amount: "",
      categoryId: "",
      note: "",
      occurredAt: "",
      type: "EXPENSE",
    },
  });

  useResetMutationOnChange(form, updateMutation);

  const onSubmit = form.handleSubmit(async (payload) => {
    await updateMutation.mutateAsync({
      id: transaction.id,
      payload: {
        accountId: payload.accountId,
        amount: payload.amount,
        categoryId: payload.categoryId,
        note: payload.note,
        occurredAt: payload.occurredAt,
        type: payload.type,
      },
    });
    form.reset();
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <TransactionForm
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

export default TransactionUpdateForm;
