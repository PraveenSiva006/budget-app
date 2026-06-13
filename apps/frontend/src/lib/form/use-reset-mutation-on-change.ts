import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type MutationLike = {
  isError: boolean;
  reset: () => void;
};

export function useResetMutationOnChange<T extends FieldValues>(
  form: UseFormReturn<T>,
  mutation: MutationLike,
) {
  useEffect(() => {
    const subscription = form.watch(() => {
      if (mutation.isError) {
        mutation.reset();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, mutation.isError, mutation.reset]);
}
