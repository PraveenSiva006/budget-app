import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccountForm from "@/features/accounts/ui/forms/account-form";
import AccountsList from "@/features/accounts/ui/components/account-list";
import { useAccountUIStore } from "@/features/accounts/ui/store/accounts.store";
import { useAccountsData } from "@/features/accounts/ui/hooks/useAccountsData";

function AccountsPage() {
  const deleteConfirm = useAccountUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useAccountUIStore((s) => s.closeDeleteConfirm);

  const form = useAccountUIStore((s) => s.form);
  const closeForm = useAccountUIStore((s) => s.closeForm);

  const { data, isLoading } = useAccountsData();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AccountsList accounts={data!} />

      <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Add or Edit Account</DialogDescription>
          </DialogHeader>

          <AccountForm
            account={form.mode === "edit" ? form.account : null}
            onSuccess={closeForm}
            onCancel={closeForm}
            mode={form.mode}
          />
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

          <div className="text-lg">Are you sure on deleting this item?</div>
          <div className="flex justify-end gap-2">
            <Button variant={"secondary"} onClick={closeDeleteConfirm}>
              Cancel
            </Button>
            <Button variant={"destructive"} onClick={closeDeleteConfirm}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AccountsPage;
