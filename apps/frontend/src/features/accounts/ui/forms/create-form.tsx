import { createAccountSchema } from "@budget/contracts";
import { useCreateAccount } from "@/features/accounts/ui/hooks/use-account-actions";
import z from "zod";
import AccountFormUI from "./account-form-ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};
type CreateAccountForm = z.infer<typeof createAccountSchema>;

function AccountCreateForm({ onSuccess, onCancel }: Props) {
  const createMutation = useCreateAccount();

  const form = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      accNumber: "",
      currency: "INR",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createMutation.mutateAsync(data);
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
export default AccountCreateForm;
