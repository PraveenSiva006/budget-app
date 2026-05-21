// transaction.service.ts

import { mockTransactions } from "@/features/transactions/mock";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "@budget/contracts";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    await delay();

    return [...mockTransactions].sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    );
  },

  async getById(id: string): Promise<Transaction | null> {
    await delay();

    return mockTransactions.find((txn: Transaction) => txn.id === id) || null;
  },

  async create(payload: CreateTransactionInput): Promise<Transaction> {
    await delay();

    const newTransaction: Transaction = {
      ...payload,

      id: generateId(),

      createdAt: now(),

      occurredAt: payload.occurredAt ?? now(),
    };

    mockTransactions.unshift(newTransaction);

    return newTransaction;
  },

  async update(
    id: string,
    payload: UpdateTransactionInput,
  ): Promise<Transaction | null> {
    await delay();

    const index = mockTransactions.findIndex(
      (txn: Transaction) => txn.id === id,
    );

    if (index === -1) return null;

    mockTransactions[index] = {
      ...mockTransactions[index],
      ...payload,
    };

    return mockTransactions[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay();

    const index = mockTransactions.findIndex(
      (txn: Transaction) => txn.id === id,
    );

    if (index === -1) return false;

    mockTransactions.splice(index, 1);

    return true;
  },
};
