import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";

function TransactionForm() {
  return (
    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
      <FormInput name="name" label="Transaction name" />

      <FormSelect
        name="type"
        label="Transaction type"
        options={[
          { label: "Income", value: "INCOME" },
          { label: "Expense", value: "EXPENSE" },
          { label: "Transfer", value: "TRANSFER" },
        ]}
      />
    </FieldGroup>
  );
}

export default TransactionForm;
