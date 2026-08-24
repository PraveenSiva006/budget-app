import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createAccountSchema,
  type CreateAccountInput,
} from "@budget/contracts";

import { useCreateAccount } from "../hooks/use-account-actions";

import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import AccountForm from "./account-form";

type Props = {
  onClose: () => void;
};

function AccountCreate({ onClose }: Props) {
  const mutation = useCreateAccount();

  const form = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
  });

  useResetMutationOnChange(form, mutation);

  const onSave = form.handleSubmit(async (payload) => {
    try {
      await mutation.mutateAsync(payload);

      toast.success("Account created");
      onClose();
    } catch (error: any) {
      toast.success(error.message);
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSave}>
        <AccountForm />

        <FormSubmissionError submissionError={mutation.error} />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export default AccountCreate;
