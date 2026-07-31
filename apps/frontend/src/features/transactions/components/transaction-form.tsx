import { DatePickerTime } from "@/lib/form/date-time-picker";
import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";
import { TRANSACTION_UI } from "@/shared/domain/transaction-ui";
import { TransactionTypeValues, type DropdownOption } from "@budget/contracts";

interface TransactionFormProps {
  accounts: DropdownOption[];
  categories: DropdownOption[];
}

function TransactionForm({ accounts, categories }: TransactionFormProps) {
  const options = Object.values(TransactionTypeValues).map((value) => ({
    value,
    label: TRANSACTION_UI[value].label,
  }));

  return (
    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
      <FormInput
        type="number"
        name="amount"
        label="Amount"
        placeholder="Enter Amount"
      />

      <FormSelect
        name="fromAccountId"
        label="Account"
        options={accounts || []}
        placeholder="Select Account"
      />

      <FormSelect
        name="categoryId"
        label="Category"
        placeholder="Select Category"
        options={categories || []}
      />

      <FormSelect
        name="type"
        label="Transaction type"
        options={options}
        placeholder="Select transaction type"
      />

      <FormInput name="note" label="Note" placeholder="Transaction Note" />

      <DatePickerTime name="occurredAt" label="Date & Time" />
    </FieldGroup>
  );
}

export default TransactionForm;
