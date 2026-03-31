// form-select.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { useFormField } from "./useFormField";

type Option = {
  value: string;
  label: string;
};

export function FormSelect({
  name,
  label,
  options,
  placeholder,
}: {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
}) {
  const { value, onChange, error, invalid } = useFormField(name);

  return (
    <Field data-invalid={invalid} className="gap-1 col-span-full">
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent aria-invalid={invalid}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {invalid && <FieldError errors={[error]} className="text-xs" />}
    </Field>
  );
}
