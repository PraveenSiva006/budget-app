import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useFormField } from "./useFormField";

export function FormInput({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
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
      />

      {invalid && <FieldError errors={[error]} className="text-xs" />}
    </Field>
  );
}
