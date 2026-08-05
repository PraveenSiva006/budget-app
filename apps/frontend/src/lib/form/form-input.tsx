import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import useFormField from "./use-form-field";
import type React from "react";

type FormInputProps = React.ComponentProps<"input"> & {
  name: string;
  label: string;
  placeholder?: string;
};

export default function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  ...rest
}: FormInputProps) {
  const { value, onChange, error, invalid } = useFormField(name);

  return (
    <Field data-invalid={invalid} className="gap-1 col-span-full">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={invalid}
        {...rest}
      />

      {invalid && <FieldError errors={[error]} className="text-xs" />}
    </Field>
  );
}
