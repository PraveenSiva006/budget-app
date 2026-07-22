import * as z from "zod";

/* -------------------------------------------------------------------------- */
/* ENUMS                                                                      */
/* -------------------------------------------------------------------------- */

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export type TransactionType = z.infer<typeof transactionTypeEnum>;

/* -------------------------------------------------------------------------- */
/* BASE SCHEMA                                                                */
/* -------------------------------------------------------------------------- */

const transactionBaseSchema = z.object({
  accountId: z.string().min(1),

  categoryId: z.string().min(1).nullable().optional(),

  amount: z.number(),

  type: transactionTypeEnum,

  note: z.string().trim().max(1000).nullable().optional(),

  occurredAt: z.string(),
});

/* -------------------------------------------------------------------------- */
/* CREATE                                                                     */
/* -------------------------------------------------------------------------- */

export const createTransactionSchema = transactionBaseSchema;

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

/* -------------------------------------------------------------------------- */
/* UPDATE                                                                     */
/* -------------------------------------------------------------------------- */

export const updateTransactionSchema = transactionBaseSchema;

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

/* -------------------------------------------------------------------------- */
/* RESPONSE DTO                                                               */
/* -------------------------------------------------------------------------- */

export const transactionSchema = transactionBaseSchema.extend({
  id: z.string(),

  createdAt: z.string(),

  // updatedAt: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
