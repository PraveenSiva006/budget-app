// features/transactions/config/transaction-ui.ts

import type { LucideIcon } from "lucide-react";
import { ArrowDownCircle, ArrowUpCircle, ArrowLeftRight } from "lucide-react";

import type { TransactionType } from "@budget/contracts";

/**
 * --------------------------------------------------------
 * Shared Semantic Color Tokens
 * --------------------------------------------------------
 */

export const transactionSemanticColors = {
  success: {
    text: "text-emerald-600",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    soft: "bg-emerald-100",
    chart: "#10b981",
  },

  danger: {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    soft: "bg-red-100",
    chart: "#ef4444",
  },

  info: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    soft: "bg-blue-100",
    chart: "#3b82f6",
  },
} as const;

/**
 * --------------------------------------------------------
 * Transaction UI Config Type
 * --------------------------------------------------------
 */

export type TransactionUIConfig = {
  label: string;

  shortLabel: string;

  description: string;

  icon: LucideIcon;

  colors: {
    text: string;
    bg: string;
    border: string;
    soft: string;
    chart: string;
  };

  amountPrefix: "+" | "-" | "";

  /**
   * Used for:
   * income positive
   * expense negative
   */
  isPositive: boolean;

  /**
   * Used for sorting / analytics / future rules
   */
  analyticsKey: "income" | "expense" | "transfer";
};

/**
 * --------------------------------------------------------
 * Transaction Type UI Registry
 * --------------------------------------------------------
 */

export const TRANSACTION_UI: Record<TransactionType, TransactionUIConfig> = {
  INCOME: {
    label: "Income",

    shortLabel: "Income",

    description: "Money received into an account",

    icon: ArrowDownCircle,

    colors: transactionSemanticColors.success,

    amountPrefix: "+",

    isPositive: true,

    analyticsKey: "income",
  },

  EXPENSE: {
    label: "Expense",

    shortLabel: "Expense",

    description: "Money spent from an account",

    icon: ArrowUpCircle,

    colors: transactionSemanticColors.danger,

    amountPrefix: "-",

    isPositive: false,

    analyticsKey: "expense",
  },

  TRANSFER: {
    label: "Transfer",

    shortLabel: "Transfer",

    description: "Money moved between accounts",

    icon: ArrowLeftRight,

    colors: transactionSemanticColors.info,

    amountPrefix: "",

    isPositive: false,

    analyticsKey: "transfer",
  },
} as const;

/**
 * --------------------------------------------------------
 * Helper Utilities
 * --------------------------------------------------------
 */

export const getTransactionUI = (type: TransactionType) => {
  return TRANSACTION_UI[type];
};

export const getTransactionIcon = (type: TransactionType) => {
  return TRANSACTION_UI[type].icon;
};

export const getTransactionColor = (type: TransactionType) => {
  return TRANSACTION_UI[type].colors;
};

export const formatTransactionAmount = ({
  amount,
  type,
}: {
  amount: string;
  type: TransactionType;
}) => {
  const config = TRANSACTION_UI[type];

  return `${config.amountPrefix}₹${amount}`;
};
