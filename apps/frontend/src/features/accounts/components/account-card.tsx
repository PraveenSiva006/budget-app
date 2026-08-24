import { Card } from "@/components/ui/card";

import { useAccountUIStore } from "@/features/accounts/account.store";

import { cn } from "@/lib/utils";
import type { AccountWithBalance } from "@budget/contracts";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AccountIcon } from "@/features/accounts/components/account-card-icon";

function AccountActionMenu({
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
        <Button variant="outline" className="h-fit rounded-sm p-1">
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

function AccountCard({
  account,
  className,
}: {
  account: AccountWithBalance;
  className: string;
}) {
  const handleAction = useAccountUIStore((s) => s.handleAction);

  const cardActions = {
    update: () => handleAction({ type: "update", payload: account }),
    delete: () => handleAction({ type: "delete", payload: account }),
  };

  return (
    <Card
      className={cn(
        "border-t-2 border-r-3 rounded-xl p-4 gap-0 dark:bg-gray-900",
        className,
      )}
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold uppercase tracking-wider">
          {account.name}
        </div>

        <AccountActionMenu actions={cardActions} />
      </div>
      <div>
        <span className="inline-block uppercase border rounded px-2 text-[10px] leading-4 font-bold tracking-wider">
          {account.type?.replaceAll("_", " ")}
        </span>
      </div>
      <div className="font-mono flex items-center tracking-widest h-16">
        {account.accountNumber}
      </div>
      <div className=" flex justify-between items-end mt-auto">
        <div>
          <div className="text-[10px] uppercase font-semibold">Balance</div>
          <div className="text-lg font-mono">{account.currentBalance}</div>
        </div>
        <AccountIcon cardType={account.type} />
      </div>
    </Card>
  );
}
export default AccountCard;
