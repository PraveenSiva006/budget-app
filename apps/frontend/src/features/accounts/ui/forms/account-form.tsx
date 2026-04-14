import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { AppFormProvider, FormInput, FormSelect } from "@/lib/form";
import {
  createAccountSchema,
  updateAccountSchema,
  type AccountDTO,
} from "@budget/contracts";
import {
  useCreateAccount,
  useUpdateAccount,
} from "@/features/accounts/ui/hooks/use-account-actions";
import { useCrudForm } from "@/lib/form/use-crud-form";

type Props =
  | {
      mode: "create";
      account: null;
      onSuccess: () => void;
      onCancel: () => void;
    }
  | {
      mode: "edit";
      account: AccountDTO;
      onSuccess: () => void;
      onCancel: () => void;
    };

function AccountForm({ onSuccess, onCancel, account, mode }: Props) {
  const createMutation = useCreateAccount();
  const updateMutation = useUpdateAccount();

  const { form, onSubmit, isSubmitting } = useCrudForm({
    schema: createAccountSchema,
    defaultValues: {
      name: "",
      type: "BANK",
      accNumber: "",
      currency: "INR",
    },
    mutation: createMutation,
    onSuccess,
  });

  const { form, onSubmit, isSubmitting } = useCrudForm({
    schema: updateAccountSchema,
    defaultValues: {
      id: account.id,
      name: account.name,
      type: account.type,
      accNumber: account.accNumber ?? "",
      currency: account.currency,
    },
    mutation: updateMutation,
    onSuccess,
  });

  return (
    <AppFormProvider form={form}>
      <form onSubmit={onSubmit}>
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
            name="accNumber"
            type="number"
            label="Account Number"
            placeholder="eg: your 12 digit acc number"
          />
          <FormSelect
            name="currency"
            label="Currency*"
            placeholder="Select Currency"
            options={[{ value: "INR", label: "Indian INR" }]}
          />
        </FieldGroup>

        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </AppFormProvider>
  );
}
export default AccountForm;
