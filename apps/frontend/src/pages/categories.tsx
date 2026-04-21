import { Button } from "@/components/ui/button";
import CategoryList from "@/features/categories/components/category-list";
import { categories } from "@/features/categories/mock/categories.db";
import { Plus } from "lucide-react";

export default function Categories() {
  return (
    <div className="py-5 px-24">
      <div className="mb-2 font-semibold flex justify-between">
        <span>Categories</span>
        <Button variant="outline">
          <Plus />
        </Button>
      </div>
      <CategoryList list={categories} />
    </div>
  );
}
