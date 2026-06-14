import {
  updateAccountSchema,
  type Account,
  type UpdateAccountInput,
} from "@budget/contracts";
import { useUpdateAccount } from "@/features/accounts/ui/hooks/use-account-actions";

import AccountFormUI from "./account-form-ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

type Props = {
  account: Account;
  onSuccess: () => void;
  onCancel: () => void;
};

function AccountUpdateForm({ onSuccess, onCancel, account }: Props) {
  const updateMutation = useUpdateAccount();

  const form = useForm<UpdateAccountInput>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: account.name,
      type: account.type,
      accNumber: account.accNumber ?? "",
      currency: account.currency,
    },
  });

  useResetMutationOnChange(form, updateMutation);

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await updateMutation.mutateAsync({
      id: account.id,
      payload: data,
    });
    console.log(response);
    form.reset();
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <AccountFormUI
        {...{
          onCancel,
          onSubmit,
          isSubmitting: form.formState.isSubmitting,
          submissionError: updateMutation.error,
        }}
      />
    </FormProvider>
  );
}
export default AccountUpdateForm;
