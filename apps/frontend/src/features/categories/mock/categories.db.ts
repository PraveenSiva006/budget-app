import type { CategoryDTO } from "@budget/contracts";

const now = () => new Date().toISOString();

export const categories: CategoryDTO[] = [
  // INCOME
  {
    id: "1",
    name: "Salary",
    type: "INCOME",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "2",
    name: "Freelance",
    type: "INCOME",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "3",
    name: "Business Income",
    type: "INCOME",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "4",
    name: "Investments",
    type: "INCOME",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "5",
    name: "Gifts Received",
    type: "INCOME",
    createdAt: now(),
    updatedAt: now(),
  },

  // EXPENSE
  {
    id: "6",
    name: "Food & Dining",
    type: "EXPENSE",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "7",
    name: "Groceries",
    type: "EXPENSE",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "8",
    name: "Rent",
    type: "EXPENSE",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "9",
    name: "Utilities",
    type: "EXPENSE",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "10",
    name: "Transportation",
    type: "EXPENSE",
    createdAt: now(),
    updatedAt: now(),
  },

  // TRANSFER
  {
    id: "19",
    name: "Savings Transfer",
    type: "TRANSFER",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "20",
    name: "Investment Transfer",
    type: "TRANSFER",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "21",
    name: "Wallet to Bank",
    type: "TRANSFER",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "22",
    name: "Bank to Wallet",
    type: "TRANSFER",
    createdAt: now(),
    updatedAt: now(),
  },
];
