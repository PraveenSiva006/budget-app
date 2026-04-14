// shared/lib/forms/use-crud-form.ts

import {
  useForm,
  type UseFormReturn,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, type input as zInput, type output as zOutput } from "zod";
import { type UseMutationResult } from "@tanstack/react-query";
import type { $ZodTypeInternals } from "zod/v4/core";

type AnyZodObject = ZodType<
  Record<string, any>,
  any,
  $ZodTypeInternals<Record<string, any>, any>
>;

type UseCrudFormProps<TSchema extends AnyZodObject> = {
  schema: TSchema;
  defaultValues: DefaultValues<zInput<TSchema>>;
  mutation: UseMutationResult<any, unknown, zOutput<TSchema>>;
  onSuccess?: () => void;
};

export const useCrudForm = <TSchema extends AnyZodObject>({
  schema,
  defaultValues,
  mutation,
  onSuccess,
}: UseCrudFormProps<TSchema>) => {
  type Input = zInput<TSchema>;
  type Output = zOutput<TSchema>;

  const form = useForm<Input, unknown, Output>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutation.mutateAsync(data);
    form.reset();
    onSuccess?.();
  });

  return {
    form: form as UseFormReturn<Input, unknown, Output>,
    onSubmit,
    isSubmitting: form.formState.isSubmitting || mutation.isPending,
  };
};
