import {
  formatTransactionAmount,
  TRANSACTION_UI,
} from "@/shared/domain/transaction-ui";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export default function TransactionList() {
  const date = new Date();
  return (
    <div className="border bg-accent flex items-center px-6 py-4 rounded-lg">
      <div>
        <div>Category</div>
        <div>Bank</div>
      </div>
      <div className="ml-auto mr-5 text-end">
        <div className={clsx(TRANSACTION_UI.INCOME.colors.text)}>
          {formatTransactionAmount({ amount: 50, type: "INCOME" })}
        </div>
        <div className="text-sm">{date.toLocaleTimeString()}</div>
      </div>
      <ChevronRight strokeWidth={1.2} />
    </div>
  );
}
