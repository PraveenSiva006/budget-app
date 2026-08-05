import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { DatePickerTime } from "@/lib/form/date-time-picker";
import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";
import { TRANSACTION_UI } from "@/shared/domain/transaction-ui";
import {
  TransactionTypeValues,
  type CreateTransactionInput,
  type DropdownOption,
} from "@budget/contracts";

interface TransactionFormProps {
  accounts: DropdownOption[];
  categories: DropdownOption[];
}

function TransactionForm({ accounts, categories }: TransactionFormProps) {
  const { control, setValue } = useFormContext<CreateTransactionInput>();

  const transactionType = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {
    if (transactionType === "INCOME") {
      setValue("fromAccountId", null);
      setValue("categoryId", null);
      setValue("toAccountId", null);
    }

    if (transactionType === "EXPENSE") {
      setValue("fromAccountId", null);
      setValue("toAccountId", null);
      setValue("categoryId", null);
    }

    if (transactionType === "TRANSFER") {
      setValue("fromAccountId", null);
      setValue("toAccountId", null);
      setValue("categoryId", null);
    }
  }, [transactionType, setValue]);

  const options = Object.values(TransactionTypeValues).map((value) => ({
    value,
    label: TRANSACTION_UI[value].label,
  }));

  const isIncome = transactionType === "INCOME";
  const isExpense = transactionType === "EXPENSE";
  const isTransfer = transactionType === "TRANSFER";

  return (
    <FieldGroup className="mb-6 grid gap-4 md:grid-cols-6">
      <FormInput
        type="text"
        inputMode="decimal"
        name="amount"
        label="Amount"
        placeholder="Enter Amount"
      />

      {isIncome && (
        <FormSelect
          name="toAccountId"
          label="Account"
          options={accounts}
          placeholder="Select Account"
        />
      )}

      {isExpense && (
        <FormSelect
          name="fromAccountId"
          label="Account"
          options={accounts}
          placeholder="Select Account"
        />
      )}

      {isTransfer && (
        <>
          <FormSelect
            name="fromAccountId"
            label="From Account"
            options={accounts}
            placeholder="Select source account"
          />

          <FormSelect
            name="toAccountId"
            label="To Account"
            options={accounts}
            placeholder="Select destination account"
          />
        </>
      )}

      {!isTransfer && (
        <FormSelect
          name="categoryId"
          label="Category"
          options={categories}
          placeholder="Select Category"
        />
      )}

      <FormSelect
        name="type"
        label="Transaction Type"
        options={options}
        placeholder="Select transaction type"
      />

      <FormInput name="note" label="Note" placeholder="Transaction note" />

      <DatePickerTime name="occurredAt" label="Date & Time" />
    </FieldGroup>
  );
}

export default TransactionForm;
