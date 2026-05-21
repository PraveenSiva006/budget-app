import {
  formatTransactionAmount,
  TRANSACTION_UI,
} from "@/shared/domain/transaction-ui";
import type { Transaction } from "@budget/contracts";
import clsx from "clsx";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";

export default function TransactionList({ list }: { list: Transaction[] }) {
  return (
    <div className="flex flex-col gap-3">
      {list.map((transaction) => (
        <div className="border flex bg-accent items-center px-6 py-4 rounded-lg">
          <div className="w-1/3">
            <div>{transaction.categoryId}</div>
            <div>{transaction.type}</div>
          </div>
          <div>{transaction.accountId}</div>
          <div className="ml-auto mr-5 text-end">
            <div className={clsx(TRANSACTION_UI[transaction.type].colors.text)}>
              {formatTransactionAmount({
                amount: transaction.amount,
                type: transaction.type,
              })}
            </div>
            <div className="text-sm">
              {format(
                transaction.occurredAt?.toString(),
                "dd/mm/yyyy hh:MM aa",
              )}
            </div>
          </div>
          <ChevronRight strokeWidth={1.2} />
        </div>
      ))}
    </div>
  );
}
