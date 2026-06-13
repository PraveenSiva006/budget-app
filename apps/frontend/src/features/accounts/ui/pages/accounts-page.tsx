import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccountEditForm from "@/features/accounts/ui/forms/edit-form";
import AccountsList from "@/features/accounts/ui/components/account-list";
import { useAccountUIStore } from "@/features/accounts/ui/store/accounts.store";
import AccountCreateForm from "../forms/create-form";
import { useDeleteAccount, useGetAccounts } from "../hooks/use-account-actions";
import { toast } from "sonner";

function AccountsPage() {
  const form = useAccountUIStore((s) => s.form);
  const closeForm = useAccountUIStore((s) => s.closeForm);

  const deleteConfirm = useAccountUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useAccountUIStore((s) => s.closeDeleteConfirm);

  const deleteMutation = useDeleteAccount();

  const { data, isLoading } = useGetAccounts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onCreateSuccess = () => {
    closeForm();
    toast.success("Account Created");
  };
  const onUpdateSuccess = () => {
    closeForm();
    toast.success("Account updated");
  };

  const deleteAccount = async () => {
    if (deleteConfirm.open) {
      await deleteMutation.mutateAsync(deleteConfirm.account.id);
      closeDeleteConfirm();
    }
  };

  return (
    <div className="px-20 pt-9 ">
      <AccountsList accounts={data!} />

      <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Add or Edit Account</DialogDescription>
          </DialogHeader>

          {form.mode === "edit" ? (
            <AccountEditForm
              account={form.account}
              onSuccess={onUpdateSuccess}
              onCancel={closeForm}
            />
          ) : (
            <AccountCreateForm
              onSuccess={onCreateSuccess}
              onCancel={closeForm}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirm.open} onOpenChange={closeDeleteConfirm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Deleting a record is irreversible
            </DialogDescription>
          </DialogHeader>

          <div className="text-base">Are you sure on deleting this item?</div>
          <div className="flex justify-end gap-2">
            <Button
              variant={"secondary"}
              onClick={closeDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={deleteAccount}
              disabled={deleteMutation.isPending}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AccountsPage;
