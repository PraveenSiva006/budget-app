import type { TransactionType } from "@budget/contracts";

export const transactionTypeUI: Record<
  TransactionType,
  {
    label: string;
    tone: "success" | "danger" | "info";
  }
> = {
  INCOME: {
    label: "Income",
    tone: "success",
  },

  EXPENSE: {
    label: "Expense",
    tone: "danger",
  },

  TRANSFER: {
    label: "Transfer",
    tone: "info",
  },
};
