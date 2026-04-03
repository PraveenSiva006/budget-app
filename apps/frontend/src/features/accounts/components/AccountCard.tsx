import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AccountDTO, AccountType } from "@budget/contracts";

import clsx from "clsx";
import { Edit2, HandCoins, Wallet } from "lucide-react";

function AccCardBottomIcon({ cardType }: { cardType: AccountType }) {
  if (cardType === "BANK" || cardType === "CREDIT_CARD") {
    const circleColors = {
      BANK: {
        circleA: "bg-[#e84141]",
        circleB: "bg-[#f79f1f]",
      },
      CREDIT_CARD: {
        circleA: "bg-gray-200",
        circleB: "bg-gray-100",
      },
    };

    const { circleA, circleB } =
      circleColors[cardType as keyof typeof circleColors];

    return (
      <div className="flex">
        <div
          className={clsx(
            "h-7 w-7 rounded-full opacity-85 translate-x-2.5",
            circleA,
          )}
        />
        <div className={clsx("h-7 w-7 rounded-full opacity-85", circleB)} />
      </div>
    );
  }

  if (cardType === "CASH") {
    return (
      <div className="inline-flex items-center justify-center w-9 h-9 bg-green-50 dark:bg-background rounded-full text-green-400">
        <HandCoins size={22} strokeWidth={0.8} />
      </div>
    );
  }

  if (cardType === "WALLET") {
    return (
      <div className="inline-flex items-center justify-center w-9 h-9 bg-purple-50 dark:bg-background rounded-full text-purple-500">
        <Wallet size={20} strokeWidth={0.8} />
      </div>
    );
  }
}

function AccountCard({
  account,
  className,
  onEdit,
}: {
  account: AccountDTO;
  className: string;
  onEdit: (account: AccountDTO) => void;
}) {
  return (
    <Card
      className={cn(
        "border-t-2 border-r-3 rounded-xl p-4 gap-0 dark:bg-gray-900",
        className,
      )}
    >
      <div className="flex justify-between">
        <div className="text-xl font-semibold uppercase tracking-wider">
          {account.name}
        </div>

        <Button
          variant="outline"
          className="h-fit rounded-sm p-1"
          onClick={() => onEdit(account)}
        >
          <Edit2 />
        </Button>
      </div>
      <div>
        <span className="inline-block uppercase border rounded px-2 text-[10px] leading-4 font-bold tracking-wider">
          {account.type?.replaceAll("_", " ")}
        </span>
      </div>
      <div className="font-mono flex items-center tracking-widest h-16">
        {account.accNumber}
      </div>
      <div className=" flex justify-between items-end mt-auto">
        <div>
          <div className="text-[10px] uppercase font-semibold">Currency</div>
          <div className="text-sm font-semibold">{account.currency}</div>
        </div>
        <AccCardBottomIcon cardType={account.type} />
      </div>
    </Card>
  );
}
export default AccountCard;
