import * as z from "zod";

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export const createTransactionSchema = z.object({
  name: z.string().min(2),
  type: transactionTypeEnum,
});

export const updateTransactionSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  type: transactionTypeEnum,
});

export const transactionSchema = z.object({
  id: z.uuid().optional(),
  userId: z.string().min(1),
  accountId: z.string().min(1),
  categoryId: z.string().min(1).nullable().optional(),
  amount: z.string().regex(/^\d{1,12}(\.\d{1,2})?$/),
  type: transactionTypeEnum,
  note: z.string().trim().max(1000).nullable().optional(),
  occurredAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
});

/* ---------- TYPES ---------- */

export interface Transaction {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

type MutableTransaction = Omit<Transaction, "id" | "createdAt" | "updatedAt">;
export type CreateTransactionInput = MutableTransaction;
export type UpdateTransactionInput = Partial<MutableTransaction>;

type _TransactionType = z.infer<typeof transactionTypeEnum>;
export type TransactionType = _TransactionType;
