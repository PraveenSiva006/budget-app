import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryUIStore } from "@/features/categories/categories.store";
import { type CategoryDTO } from "@budget/contracts";
import { EllipsisVertical } from "lucide-react";

function CategoryActionMenu({
  actions,
}: {
  actions: {
    edit: () => void;
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
        <DropdownMenuItem onClick={actions.edit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={actions.delete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryList({ list }: { list: CategoryDTO[] }) {
  const { handleActions } = useCategoryUIStore();

  return (
    <div className="grid grid-cols-2 gap-3">
      {list.map((category) => (
        <div
          className="border rounded p-3 flex items-center bg-neutral-50 dark:bg-gray-900"
          key={category.id}
        >
          <span className="">{category.name}</span>

          <span className="ml-auto mr-3 text-capitalize text-xs bg-lime-300 px-2 rounded-lg leading-relaxed">
            {category.type.toLowerCase()}
          </span>
          <CategoryActionMenu
            actions={{
              edit: () => {
                handleActions({ type: "edit", payload: category });
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
