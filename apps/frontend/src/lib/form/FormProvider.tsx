// form-provider.tsx
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

export function AppFormProvider<T extends FieldValues>({
  form,
  children,
}: {
  form: UseFormReturn<T>;
  children: React.ReactNode;
}) {
  return <FormProvider {...form}>{children}</FormProvider>;
}
