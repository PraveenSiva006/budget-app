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
import DeleteCategory from "@/features/categories/components/delete-category";
import UpdateCategory from "@/features/categories/components/update-category";

import { useListCategory } from "@/features/categories/hooks/use-category-actions";

import { Plus } from "lucide-react";

export default function Categories() {
  const { data: categories, isLoading } = useListCategory();

  const { form, closeForm, handleActions } = useCategoryUIStore();

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

      <DeleteCategory />
    </div>
  );
}
