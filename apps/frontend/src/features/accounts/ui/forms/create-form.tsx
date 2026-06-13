import {
  createAccountSchema,
  type CreateAccountInput,
} from "@budget/contracts";
import { useCreateAccount } from "@/features/accounts/ui/hooks/use-account-actions";
import AccountFormUI from "./account-form-ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetMutationOnChange } from "@/lib/form/use-reset-mutation-on-change";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};
function AccountCreateForm({ onSuccess, onCancel }: Props) {
  const createMutation = useCreateAccount();

  const form = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: "BANK",
      accNumber: "",
      currency: "INR",
    },
  });

  useResetMutationOnChange(form, createMutation);

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
          submissionError: createMutation.error,
        }}
      />
    </FormProvider>
  );
}
export default AccountCreateForm;
