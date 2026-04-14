import {
  useCreateAccount,
  useUpdateAccount,
} from "@/features/accounts/ui/hooks/use-account-actions";

import {
  createAccountSchema,
  updateAccountSchema,
  type AccountDTO,
  type CreateAccountDTO,
  type UpdateAccountDTO,
} from "@budget/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAccountForm = ({
  mode,
  account,
  onSuccess,
}: {
  mode: "create" | "edit";
  account: AccountDTO | null;
  onSuccess: () => void;
}) => {
  let defaultValues: Partial<CreateAccountDTO & UpdateAccountDTO> = {
    name: account?.name || "",
    type: account?.type || "BANK",
    accNumber: account?.accNumber || "",
    currency: account?.currency || "INR",
  };

  if (mode === "edit") defaultValues.id = account?.id;

  const createAccountMutation = useCreateAccount();
  const updateAccountMutation = useUpdateAccount();

  const form = useForm<CreateAccountDTO | UpdateAccountDTO>({
    resolver: zodResolver(
      mode === "create" ? createAccountSchema : updateAccountSchema,
    ),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (mode === "create") {
        await createAccountMutation.mutateAsync(data as CreateAccountDTO);
      } else {
        await updateAccountMutation.mutateAsync(data as UpdateAccountDTO);
      }

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

  return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
};
