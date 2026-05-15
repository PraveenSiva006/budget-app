import * as z from "zod";
import { TransactionType, transactionTypeEnum } from "./transaction.schema.js";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  type: transactionTypeEnum,
});

export const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  type: transactionTypeEnum,
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: transactionTypeEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});

/* ---------- TYPES ---------- */

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

type MutableCategory = Omit<Category, "id" | "createdAt" | "updatedAt">;
export type CreateCategoryInput = MutableCategory;
export type UpdateCategoryInput = Partial<MutableCategory>;
