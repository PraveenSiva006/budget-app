import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryUIStore } from "@/features/categories/categories.store";
import { type Category } from "@budget/contracts";

import { EllipsisVertical } from "lucide-react";

function CategoryActionMenu({
  actions,
}: {
  actions: {
    update: () => void;
    delete: () => void;
  };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-fit rounded-sm p-1">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-4" align="end">
        <DropdownMenuItem onClick={actions.update}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={actions.delete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryList({ list }: { list: Category[] }) {
  const { handleActions } = useCategoryUIStore();

  return (
    <div className="grid grid-cols-2 gap-3">
      {list.map((category) => (
        <div
          className="border rounded p-3 flex items-center bg-neutral-50 dark:bg-gray-900"
          key={category.id}
        >
          <span className="mr-auto">{category.name}</span>

          <CategoryActionMenu
            actions={{
              update: () => {
                handleActions({ type: "update", payload: category });
              },
              delete: () => {
                handleActions({ type: "delete", payload: category });
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}
export default CategoryList;
