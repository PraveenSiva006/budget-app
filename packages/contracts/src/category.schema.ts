import * as z from "zod";

import { transactionTypeEnum } from "./transaction.schema.js";

/* -------------------------------------------------------------------------- */
/* SCHEMAS                                                                    */
/* -------------------------------------------------------------------------- */

export const createCategorySchema = z.object({
  name: z.string().min(2),
  type: transactionTypeEnum,
});

export const updateCategorySchema = createCategorySchema;

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: transactionTypeEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export type Category = z.infer<typeof categorySchema>;
