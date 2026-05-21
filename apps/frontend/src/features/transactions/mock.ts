import type { Transaction } from "@budget/contracts";

export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    userId: "1",
    accountId: "acc-001",
    categoryId: "cat-food",

    amount: "250.75",
    type: "EXPENSE",

    note: "Lunch at restaurant",

    occurredAt: "2026-05-18T12:30:00Z",
    createdAt: "2026-05-18T12:35:00Z",
  },

  {
    id: "txn-002",
    userId: "1",
    accountId: "acc-001",
    categoryId: "cat-salary",

    amount: "50000",
    type: "INCOME",

    note: "Monthly salary",

    occurredAt: "2026-05-01T09:00:00Z",
    createdAt: "2026-05-01T09:05:00Z",
  },

  {
    id: "txn-003",
    userId: "1",
    accountId: "acc-002",
    categoryId: "cat-transport",

    amount: "120.5",
    type: "EXPENSE",

    note: "Uber ride",

    occurredAt: "2026-05-17T18:45:00Z",
    createdAt: "2026-05-17T18:50:00Z",
  },

  {
    id: "txn-004",
    userId: "1",
    accountId: "acc-003",
    categoryId: "cat-shopping",

    amount: "3499.99",
    type: "EXPENSE",

    note: "Bought headphones",

    occurredAt: "2026-05-15T14:20:00Z",
    createdAt: "2026-05-15T14:25:00Z",
  },

  {
    id: "txn-005",
    userId: "1",
    accountId: "acc-003",
    categoryId: null,

    amount: "1000",
    type: "TRANSFER",

    note: "Transferred to savings",

    occurredAt: "2026-05-10T08:00:00Z",
    createdAt: "2026-05-10T08:05:00Z",
  },
];
