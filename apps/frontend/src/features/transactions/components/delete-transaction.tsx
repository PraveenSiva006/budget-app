import ConfirmDialog from "@/components/common/confirm-dialog";
import { useDeleteTransaction } from "@/features/transactions/hooks/use-transaction-actions";
import { useTransactionUIStore } from "@/features/transactions/transaction.store";
import { toast } from "sonner";

function DeleteTransaction({
  onDeleteSuccess,
}: {
  onDeleteSuccess: () => void;
}) {
  const deleteConfirm = useTransactionUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useTransactionUIStore((s) => s.closeDeleteConfirm);

  const deleteMutation = useDeleteTransaction();

  const deleteTransaction = async () => {
    try {
      if (deleteConfirm.open) {
        await deleteMutation.mutateAsync(deleteConfirm.transaction.id);
        onDeleteSuccess();
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
      onConfirm={deleteTransaction}
      description="Are you sure on deleting this record?"
      title="Delete"
    />
  );
}

export default DeleteTransaction;
