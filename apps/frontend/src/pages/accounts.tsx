import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AccountUpdate from "@/features/accounts/components/update-account";
import AccountCreate from "../features/accounts/components/create-account";
import AccountsList from "@/features/accounts/components/account-list";

import { useAccountUIStore } from "@/features/accounts/account.store";
import {
  useDeleteAccount,
  useGetAccounts,
} from "../features/accounts/hooks/use-account-actions";
import { toast } from "sonner";

function AccountsPage() {
  const form = useAccountUIStore((s) => s.form);
  const closeForm = useAccountUIStore((s) => s.closeForm);

  const deleteConfirm = useAccountUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useAccountUIStore((s) => s.closeDeleteConfirm);

  const deleteMutation = useDeleteAccount();

  const { data, isLoading } = useGetAccounts();

  if (isLoading) {
    return <div className="app-container mx-auto">Loading...</div>;
  }

  const deleteAccount = async () => {
    if (deleteConfirm.open) {
      try {
        await deleteMutation.mutateAsync(deleteConfirm.account.id);
        closeDeleteConfirm();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="app-container mx-auto pt-9">
      <AccountsList accounts={data!} />

      <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Add or Edit Account</DialogDescription>
          </DialogHeader>

          {form.mode === "update" ? (
            <AccountUpdate account={form.account} onClose={closeForm} />
          ) : (
            <AccountCreate onClose={closeForm} />
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
