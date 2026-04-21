import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <Button variant="ghost" className="h-fit rounded-sm p-1">
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
  return (
    <div className="grid grid-cols-2 gap-3">
      {list.map((val) => (
        <div className="border rounded p-3 flex justify-between items-center">
          <span className="">{val.name}</span>
          <CategoryActionMenu actions={{ edit: () => {}, delete: () => {} }} />
        </div>
      ))}
    </div>
  );
}
export default CategoryList;
