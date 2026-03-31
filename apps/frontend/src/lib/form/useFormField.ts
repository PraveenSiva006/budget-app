// use-form-field.ts
import { useFormContext, useController } from "react-hook-form";

export function useFormField(name: string) {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
  });

  return {
    value: field.value ?? "",
    onChange: field.onChange,
    error: fieldState.error,
    invalid: fieldState.invalid,
  };
}
