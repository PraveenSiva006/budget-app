import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AppFormProvider, FormInput, FormSelect } from "@/lib/form";
import { accountFormSchema } from "@/features/accounts/account.schema";

type Schema = z.infer<typeof accountFormSchema>;

function AccountForm({
  open,
  closeForm,
}: {
  open: boolean;
  closeForm: () => void;
}) {
  const defaultValues: Schema = {
    accName: "",
    accType: "",
    accNum: "",
  };

  const form = useForm<Schema>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    try {
      console.log(data);
      form.reset();
      closeForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        closeForm();
        form.reset();
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="gap-1">
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>Add or Edit Account</DialogDescription>
        </DialogHeader>
        <AppFormProvider form={form}>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
              <FormInput
                name="accName"
                label="Account Name*"
                placeholder="eg: SBI, Cash, PhonePe Wallet"
              />

              <FormSelect
                name="accType"
                label="Account Type*"
                placeholder="Select Account type"
                options={[
                  { value: "BANK", label: "Bank" },
                  { value: "CREDIT_CARD", label: "Credit Card" },
                  { value: "CASH", label: "Cash" },
                  { value: "WALLET", label: "Wallet" },
                ]}
              />

              <FormInput
                name="accNum"
                label="Account Number"
                placeholder="eg: your 12 digit acc number"
              />
            </FieldGroup>

            <DialogFooter>
              <Button variant={"outline"} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </AppFormProvider>
      </DialogContent>
    </Dialog>
  );
}
export default AccountForm;
