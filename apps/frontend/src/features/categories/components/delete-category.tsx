import ConfirmDialog from "@/components/common/confirm-dialog";
import { useDeleteCategory } from "@/features/categories/hooks/use-category-actions";
import { useCategoryUIStore } from "@/features/categories/categories.store";
import { toast } from "sonner";

function DeleteCategory() {
  const deleteConfirm = useCategoryUIStore((s) => s.deleteConfirm);
  const closeDeleteConfirm = useCategoryUIStore((s) => s.closeDeleteConfirm);

  const deleteMutation = useDeleteCategory();

  const deleteCategory = async () => {
    try {
      if (deleteConfirm.open) {
        await deleteMutation.mutateAsync(deleteConfirm.category.id);
      }
      closeDeleteConfirm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <ConfirmDialog
      onCancel={closeDeleteConfirm}
      isPending={deleteMutation.isPending}
      open={deleteConfirm.open}
      onConfirm={deleteCategory}
      description="Are you sure on deleting this record?"
      title="Delete"
    />
  );
}

export default DeleteCategory;
