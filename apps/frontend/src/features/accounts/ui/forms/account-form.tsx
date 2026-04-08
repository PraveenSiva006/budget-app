import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import { AppFormProvider, FormInput, FormSelect } from "@/lib/form";
import {
  createAccountSchema,
  type AccountDTO,
  type CreateAccountDTO,
} from "@budget/contracts";

function AccountForm({
  onSuccess,
  onCancel,
  account,
}: {
  onSuccess: () => void;
  onCancel: () => void;
  account: AccountDTO | null;
  mode: "create" | "edit" | "closed";
}) {
  const defaultValues: CreateAccountDTO = {
    name: account?.name || "",
    type: account?.type || "BANK",
    accNumber: account?.accNumber || "",
    currency: account?.currency || "INR",
  };

  const form = useForm<CreateAccountDTO>({
    resolver: zodResolver(createAccountSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = form.handleSubmit(async (data: CreateAccountDTO) => {
    try {
      console.log(data);
      form.reset();
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  });

  return (
    <AppFormProvider form={form}>
      <form onSubmit={handleSubmit}>
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
