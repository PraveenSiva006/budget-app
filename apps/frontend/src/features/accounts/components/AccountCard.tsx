import { Button } from "@/components/ui/button";
import type { AccountDTO, AccountType } from "@budget/types";
import clsx from "clsx";
import { Edit2, Wallet } from "lucide-react";

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

    const circleAColor = circleColors[cardType].circleA;
    const circleBColor = circleColors[cardType].circleB;

    return (
      <div className="flex">
        <div
          className={clsx(
            "h-7 w-7 rounded-full opacity-85 translate-x-2.5",
            circleAColor,
          )}
        ></div>
        <div
          className={clsx("h-7 w-7 rounded-full opacity-85", circleBColor)}
        ></div>
      </div>
    );
  }
  if (cardType === "CASH") {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 border border-green-500 rounded-full font-serif font-semibold text-lg">
        ₹
      </div>
    );
  }
  if (cardType === "WALLET") {
    return (
      <Wallet
        className="text-purple-700"
        size={26}
        strokeWidth={0.8}
        absoluteStrokeWidth
      />
    );
  }
}
function AccountCard({ account }: { account: AccountDTO }) {
  return (
    <div className="border border-t-2 border-r-3 rounded-xl p-4 flex flex-col">
      <div className="flex justify-between">
        <div className="text-xl font-semibold uppercase tracking-wider">
          {account.name}
        </div>
        <Button variant={"outline"} className="h-fit rounded-sm p-1">
          <Edit2 />
        </Button>
      </div>
      <div>
        <span className="inline-block uppercase border rounded px-2 text-[10px] leading-4 font-bold tracking-wider">
          {account.type?.replaceAll("_", " ")}
        </span>
      </div>
      <div className="font-mono tracking-widest my-4">{account.accNumber}</div>
      <div className=" flex justify-between items-end mt-auto">
        <div>
          <div className="text-[10px] uppercase font-semibold">Currency</div>
          <div className="text-sm font-semibold">{account.currency}</div>
        </div>
        <AccCardBottomIcon cardType={account.type} />
      </div>
    </div>
  );
}
export default AccountCard;
