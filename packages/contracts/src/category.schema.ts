import * as z from "zod";

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);
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

type _TransactionType = z.infer<typeof transactionTypeEnum>;
export type TransactionType = _TransactionType;

export interface CategoryDTO {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

type MutableCategory = Omit<CategoryDTO, "id" | "createdAt" | "updatedAt">;
export type CreateCategoryDTO = MutableCategory;
export type UpdateCategoryDTO = Partial<MutableCategory>;
