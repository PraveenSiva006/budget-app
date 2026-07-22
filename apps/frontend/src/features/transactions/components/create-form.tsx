import TransactionForm from "@/features/transactions/components/form";

import { useCreateTransaction } from "@/features/transactions/hooks/use-transaction-actions";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};
function TransactionCreateForm({ onSuccess, onCancel }: Props) {
  const createMutation = useCreateTransaction();

  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      accountId: "1",
      amount: "100",
      categoryId: "1",
      note: "",
      occurredAt: "10/10/2026",
      type: "EXPENSE",
    },
  });

  useResetMutationOnChange(form, createMutation);

  const onSubmit = form.handleSubmit(async (transaction) => {
    await createMutation.mutateAsync({
      accountId: transaction.accountId,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      note: transaction.note,
      occurredAt: transaction.occurredAt,
      type: transaction.type,
    });
    form.reset();
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <TransactionForm
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

export default TransactionCreateForm;
