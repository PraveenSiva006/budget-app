// features/accounts/config/account-ui.ts

import type { LucideIcon } from "lucide-react";
import {
  HandCoins,
  PiggyBank,
  TrendingUp,
  Home,
  Landmark,
  WalletCards,
  Banknote,
  CreditCard,
  TrendingDown,
  //   CreditCard,
} from "lucide-react";

import type { AccountType } from "@budget/contracts"; // inferred from accountTypeEnum

/**
 * --------------------------------------------------------
 * Shared Semantic Color Tokens
 * --------------------------------------------------------
 */

export const accountSemanticColors = {
  slate: {
    text: "text-slate-600",
    bg: "bg-slate-100",
    chart: "#475569",
  },

  green: {
    text: "text-green-600",
    bg: "bg-green-50",
    chart: "#16a34a",
  },

  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    chart: "#2563eb",
  },

  teal: {
    text: "text-teal-600",
    bg: "bg-teal-50",
    chart: "#0d9488",
  },

  violet: {
    text: "text-violet-600",
    bg: "bg-violet-50",
    chart: "#7c3aed",
  },

  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    chart: "#059669",
  },

  orange: {
    text: "text-orange-600",
    bg: "bg-orange-50",
    chart: "#ea580c",
  },

  amber: {
    text: "text-amber-600",
    bg: "bg-amber-50",
    chart: "#d97706",
  },

  red: {
    text: "text-red-600",
    bg: "bg-red-50",
    chart: "#dc2626",
  },
} as const;

/**
 * --------------------------------------------------------
 * Account UI Config Type
 * --------------------------------------------------------
 */

export type AccountUIConfig = {
  label: string;
  shortLabel: string;
  description: string;

  icon: LucideIcon;
  colors: { text: string; bg: string; chart: string };
};

/**
 * --------------------------------------------------------
 * Account Type UI Registry
 * --------------------------------------------------------
 */

export const ACCOUNT_UI: Record<AccountType, AccountUIConfig> = {
  GENERAL: {
    label: "General",
    shortLabel: "General",
    description: "A catch-all account for anything else",
    icon: WalletCards,
    colors: accountSemanticColors.slate,
  },

  CASH: {
    label: "Cash",
    shortLabel: "Cash",
    description: "Physical cash on hand",
    icon: Banknote,
    colors: accountSemanticColors.green,
  },

  CHECKING: {
    label: "Checking",
    shortLabel: "Checking",
    description: "A day-to-day bank account",
    icon: Landmark,
    colors: accountSemanticColors.blue,
  },

  SAVINGS: {
    label: "Savings",
    shortLabel: "Savings",
    description: "Money set aside for later",
    icon: PiggyBank,
    colors: accountSemanticColors.teal,
  },

  CREDIT: {
    label: "Credit",
    shortLabel: "Credit",
    description: "A credit card account",
    icon: CreditCard,
    colors: accountSemanticColors.violet,
  },

  INVESTMENT: {
    label: "Investment",
    shortLabel: "Investment",
    description: "Stocks, funds, and other holdings",
    icon: TrendingUp,
    colors: accountSemanticColors.emerald,
  },

  LOAN: {
    label: "Loan",
    shortLabel: "Loan",
    description: "Money owed on a personal or auto loan",
    icon: HandCoins,
    colors: accountSemanticColors.orange,
  },

  MORTGAGE: {
    label: "Mortgage",
    shortLabel: "Mortgage",
    description: "Money owed on a home loan",
    icon: Home,
    colors: accountSemanticColors.amber,
  },

  OVERDRAFT: {
    label: "Overdraft",
    shortLabel: "Overdraft",
    description: "A negative balance facility on an account",
    icon: TrendingDown,
    colors: accountSemanticColors.red,
  },
} as const;

/**
 * --------------------------------------------------------
 * Helper Utilities
 * --------------------------------------------------------
 */

export const getAccountUI = (type: AccountType) => ACCOUNT_UI[type];
