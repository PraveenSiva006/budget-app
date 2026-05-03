import { updateAccountSchema, type Account } from "@budget/contracts";
import { useUpdateAccount } from "@/features/accounts/ui/hooks/use-account-actions";

import AccountFormUI from "./account-form-ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type Props = {
  account: Account;
  onSuccess: () => void;
  onCancel: () => void;
};
type UpdateAccountForm = z.infer<typeof updateAccountSchema>;

function AccountEditForm({ onSuccess, onCancel, account }: Props) {
  const updateMutation = useUpdateAccount();

  const form = useForm<UpdateAccountForm>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      id: account.id,
      name: account.name,
      type: account.type,
      accNumber: account.accNumber ?? "",
      currency: account.currency,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateMutation.mutateAsync({ id: account.id, payload: data });
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
        }}
      />
    </FormProvider>
  );
}
export default AccountEditForm;
