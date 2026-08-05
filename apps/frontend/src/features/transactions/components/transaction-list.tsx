import { useTransactionUIStore } from "@/features/transactions/transaction.store";
import {
  formatTransactionAmount,
  TRANSACTION_UI,
} from "@/shared/domain/transaction-ui";
import type { TransactionWithRelations } from "@budget/contracts";
import clsx from "clsx";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";

export default function TransactionList({
  list,
}: {
  list: TransactionWithRelations[];
}) {
  const handleActions = useTransactionUIStore((state) => state.handleActions);
  return (
    <div className="flex flex-col gap-3 py-3">
      {list.map((transaction) => (
        <div
          className="border flex bg-neutral-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-neutral-900 items-center px-6 py-2 rounded-md cursor-pointer"
          onClick={() =>
            handleActions({ type: "update", payload: transaction })
          }
          key={transaction.id}
        >
          <div className="w-1/3">
            <div>
              {transaction.type === "TRANSFER"
                ? "Transfer"
                : transaction.category?.name}
            </div>
          </div>

          <div>
            {transaction.type === "EXPENSE" && transaction.fromAccount?.name}

            {transaction.type === "INCOME" && transaction.toAccount?.name}

            {transaction.type === "TRANSFER" &&
              `${transaction.fromAccount?.name} → ${transaction.toAccount?.name}`}
          </div>

          <div className="ml-48 text-gray-600 font-light">
            {transaction.note}
          </div>
          <div className="ml-auto mr-5 text-end">
            <div className={clsx(TRANSACTION_UI[transaction.type].colors.text)}>
              {formatTransactionAmount({
                amount: transaction.amount,
                type: transaction.type,
              })}
            </div>
            <div className="text-sm text-gray-500">
              {format(transaction.occurredAt, "dd/MM/yyyy hh:mm aa")}
            </div>
          </div>
          <ChevronRight strokeWidth={1.2} />
        </div>
      ))}
    </div>
  );
}
