import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { FormInput, FormSelect } from "@/lib/form";

function CategoryForm({
  isSubmitting,
  onSubmit,
  onCancel,
  submissionError,
}: {
  isSubmitting: boolean;
  onSubmit: (persistForm?: boolean) => void;
  onCancel: () => void;
  submissionError: Error | null;
}) {
  return (
    <form>
      <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
        <FormInput name="name" label="Category name" />
        <FormSelect
          name="type"
          label="Category type"
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
        <Button
          type="button"
          onClick={() => onSubmit()}
          disabled={isSubmitting}
        >
          Save
        </Button>

        <Button
          type="submit"
          onClick={() => {
            onSubmit(true);
          }}
          disabled={isSubmitting}
        >
          Save & Add Another
        </Button>
      </DialogFooter>
    </form>
  );
}

export default CategoryForm;
