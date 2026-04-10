import { useFormContext, useController } from "react-hook-form";

export default function useFormField(name: string) {
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
