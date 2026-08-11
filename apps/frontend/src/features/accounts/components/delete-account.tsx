import ConfirmDialog from "@/components/common/confirm-dialog";
import { useDeleteAccount } from "@/features/accounts/hooks/use-account-actions";
import { useAccountUIStore } from "@/features/accounts/account.store";
import { toast } from "sonner";

function DeleteAccount() {
  const deleteConfirm = useAccountUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useAccountUIStore((s) => s.closeDeleteConfirm);

  const deleteMutation = useDeleteAccount();

  const deleteAccount = async () => {
    try {
      if (deleteConfirm.open) {
        await deleteMutation.mutateAsync(deleteConfirm.account.id);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    closeDeleteConfirm();
  };

  return (
    <ConfirmDialog
      onCancel={closeDeleteConfirm}
      isPending={deleteMutation.isPending}
      open={deleteConfirm.open}
      onConfirm={deleteAccount}
      description="Are you sure on deleting this record?"
      title="Delete"
    />
  );
}

export default DeleteAccount;
