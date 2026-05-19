import type { TransactionType } from "@budget/contracts";

export const transactionTypeUI: Record<
  TransactionType,
  {
    label: string;
    color: string;
    bg: string;
    icon: string;
  }
> = {
  INCOME: {
    label: "Income",
    color: "text-green-600",
    bg: "bg-green-100",
    icon: "arrow-down",
  },

  EXPENSE: {
    label: "Expense",
    color: "text-red-600",
    bg: "bg-red-100",
    icon: "arrow-up",
  },

  TRANSFER: {
    label: "Transfer",
    color: "text-blue-600",
    bg: "bg-blue-100",
    icon: "refresh-cw",
  },
};
