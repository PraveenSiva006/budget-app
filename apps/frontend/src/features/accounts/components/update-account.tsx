import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import {
  updateAccountSchema,
  type Account,
  type UpdateAccountInput,
} from "@budget/contracts";

import { useUpdateAccount } from "../hooks/use-account-actions";

import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

import { FormSubmissionError } from "@/components/common/form-submission-error";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import AccountForm from "./account-form";

type Props = {
  account: Account;
  onClose: () => void;
};

function AccountUpdate({ account, onClose }: Props) {
  const mutation = useUpdateAccount();

  const form = useForm<UpdateAccountInput>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: account.name,
      type: account.type,
      accountNumber: account.accountNumber ?? "",
      currency: account.currency,
      openingBalance: account.openingBalance,
    },
  });

  useResetMutationOnChange(form, mutation);

  const onSave = form.handleSubmit(async (payload) => {
    await mutation.mutateAsync({
      id: account.id,
      payload,
    });

    toast.success("Account updated");
    onClose();
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
            Save {mutation.isPending && <Loader className="animate-spin" />}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export default AccountUpdate;
