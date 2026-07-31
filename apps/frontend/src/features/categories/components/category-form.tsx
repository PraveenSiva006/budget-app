import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/lib/form";

function CategoryForm() {
  return (
    <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
      <FormInput name="name" label="Category name" />
    </FieldGroup>
  );
}

export default CategoryForm;
