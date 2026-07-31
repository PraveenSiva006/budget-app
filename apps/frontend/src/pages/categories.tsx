import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryUIStore } from "@/features/categories/categories.store";
import CategoryList from "@/features/categories/components/category-list";
import CategoryCreateForm from "@/features/categories/components/create-category";
import UpdateCategory from "@/features/categories/components/update-category";

import {
  useDeleteCategory,
  useListCategory,
} from "@/features/categories/hooks/use-category-actions";

import { Plus } from "lucide-react";

export default function Categories() {
  const { data: categories, isLoading } = useListCategory();

  const deleteMutation = useDeleteCategory();

  const { form, closeForm, deleteConfirm, closeDeleteConfirm, handleActions } =
    useCategoryUIStore();

  const onDelete = async () => {
    try {
      if (deleteConfirm.open)
        await deleteMutation.mutateAsync(deleteConfirm.category.id);
    } catch (error) {
      console.error(error);
    }
    closeDeleteConfirm();
  };

  return (
    <div className="py-5 app-container mx-auto">
      <div className="mb-2 font-semibold flex justify-between">
        <span>Categories</span>
        <Button
          variant="outline"
          onClick={() => handleActions({ type: "create" })}
        >
          <Plus />
        </Button>
      </div>
      {!isLoading && <CategoryList list={categories} />}

      <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Category</DialogTitle>
            <DialogDescription>
              {form.mode === "create" ? "Add" : "Edit"} Category
            </DialogDescription>
          </DialogHeader>
          {form.mode === "update" ? (
            <UpdateCategory category={form.category} onClose={closeForm} />
          ) : (
            <CategoryCreateForm onClose={closeForm} />
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

          <div className="text-lg font-light">
            Are you sure on deleting this item?
          </div>
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
              onClick={onDelete}
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
