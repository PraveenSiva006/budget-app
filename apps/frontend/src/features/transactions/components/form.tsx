import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";

function TransactionForm({
  isSubmitting,
  onSubmit,
  onCancel,
  submissionError,
}: {
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  submissionError: Error | null;
}) {
  return (
    <form onSubmit={onSubmit}>
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default TransactionForm;
