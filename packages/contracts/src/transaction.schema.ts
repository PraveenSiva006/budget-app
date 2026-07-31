import * as z from "zod";
import { moneySchema } from "./common/shared-schema.js";

/* -------------------------------------------------------------------------- */
/* ENUMS                                                                      */
/* -------------------------------------------------------------------------- */

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export const TransactionTypeValues = transactionTypeEnum.enum;

export type TransactionType = z.infer<typeof transactionTypeEnum>;

/* -------------------------------------------------------------------------- */
/* BASE SCHEMA                                                                */
/* -------------------------------------------------------------------------- */

const transactionBaseSchema = z.object({
  fromAccountId: z.string().min(1),

  toAccountId: z.string().min(1).nullable().optional(),

  categoryId: z.string().min(1).nullable().optional(),

  amount: z.string().regex(/^-?\d+(\.\d{1,2})?$/),

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

  updatedAt: z.string(),
});

const transactionWithRelationsSchema = transactionSchema.extend({
  fromAccount: z.object({
    id: z.string(),

    name: z.string(),
  }),

  toAccount: z
    .object({
      id: z.string(),

      name: z.string(),
    })
    .nullable()
    .optional(),

  category: z
    .object({
      id: z.string(),

      name: z.string(),
    })
    .nullable()
    .optional(),
});

export type TransactionWithRelations = z.infer<
  typeof transactionWithRelationsSchema
>;
export type Transaction = z.infer<typeof transactionSchema>;
