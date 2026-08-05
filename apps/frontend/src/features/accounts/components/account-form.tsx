import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";

function AccountForm() {
  return (
    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
      <FormInput
        name="name"
        label="Account Name*"
        placeholder="eg: SBI, Cash, PhonePe Wallet"
      />

      <FormSelect
        name="type"
        label="Account Type*"
        placeholder="Select Account type"
        options={[
          { value: "BANK", label: "Bank" },
          { value: "CREDIT_CARD", label: "Credit Card" },
          { value: "CASH", label: "Cash" },
          { value: "WALLET", label: "Wallet" },
        ]}
      />

      <FormInput
        name="openingBalance"
        label="Initial Amount*"
        placeholder="Your current balance"
      />

      <FormInput
        name="accountNumber"
        type="number"
        label="Account Number"
        placeholder="eg: your 12 digit acc number"
      />

      <FormSelect
        name="currency"
        label="Currency*"
        placeholder="Select Currency"
        options={[
          {
            value: "INR",
            label: "Indian INR",
          },
        ]}
      />
    </FieldGroup>
  );
}

export default AccountForm;
