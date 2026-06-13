import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";
import { Loader } from "lucide-react";

type AccountFormUIProps = {
  onSubmit: () => void;
  isSubmitting: boolean;
  submissionError: Error | null;
  onCancel: () => void;
};

function AccountFormUI({
  onSubmit,
  isSubmitting,
  onCancel,
  submissionError,
}: AccountFormUIProps) {
  return (
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

      <FormSubmissionError submissionError={submissionError} />

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
          Submit {isSubmitting && <Loader />}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default AccountFormUI;
