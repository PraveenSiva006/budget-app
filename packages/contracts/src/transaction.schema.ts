import * as z from "zod";

/* -------------------------------------------------------------------------- */
/* ENUMS                                                                      */
/* -------------------------------------------------------------------------- */

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);

export const TransactionTypeValues = transactionTypeEnum.enum;

export type TransactionType = z.infer<typeof transactionTypeEnum>;

/* -------------------------------------------------------------------------- */
/* COMMON SCHEMA                                                              */
/* -------------------------------------------------------------------------- */

const amountSchema = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, "Amount must have at most 2 decimal places")
  .refine((value) => Number(value) > 0, {
    message: "Amount must be greater than 0",
  })
  .refine(
    (value) => {
      const [integerPart] = value.split(".");

      // Decimal(14, 2) = maximum 12 integer digits + 2 decimal digits.
      return integerPart.length <= 12;
    },
    {
      message: "Amount is too large",
    },
  );

const transactionCommonSchema = {
  amount: amountSchema,

  note: z
    .string()
    .trim()
    .max(1000, "Note cannot exceed 1000 characters")
    .nullable()
    .optional(),

  occurredAt: z.iso.datetime({
    offset: true,
    message: "Invalid transaction date",
  }),
};

/* -------------------------------------------------------------------------- */
/* TRANSACTION VARIANTS                                                       */
/* -------------------------------------------------------------------------- */

const incomeTransactionSchema = z.object({
  type: z.literal("INCOME"),

  fromAccountId: z.null(),
  toAccountId: z.string().min(1),

  categoryId: z.string().min(1),

  ...transactionCommonSchema,
});

const expenseTransactionSchema = z.object({
  type: z.literal("EXPENSE"),

  fromAccountId: z.string().min(1),
  toAccountId: z.null(),

  categoryId: z.string().min(1),

  ...transactionCommonSchema,
});

const transferTransactionSchema = z
  .object({
    type: z.literal("TRANSFER"),

    fromAccountId: z.string().min(1),
    toAccountId: z.string().min(1),

    categoryId: z.null(),

    ...transactionCommonSchema,
  })
  .refine((data) => data.fromAccountId !== data.toAccountId, {
    message: "Source and destination accounts must be different",
    path: ["toAccountId"],
  });

/* -------------------------------------------------------------------------- */
/* CREATE                                                                     */
/* -------------------------------------------------------------------------- */

export const createTransactionSchema = z.discriminatedUnion("type", [
  incomeTransactionSchema,
  expenseTransactionSchema,
  transferTransactionSchema,
]);

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

/* -------------------------------------------------------------------------- */
/* UPDATE                                                                     */
/* -------------------------------------------------------------------------- */

export const updateTransactionSchema = z.discriminatedUnion("type", [
  incomeTransactionSchema,
  expenseTransactionSchema,
  transferTransactionSchema,
]);

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

/* -------------------------------------------------------------------------- */
/* RESPONSE DTO                                                               */
/* -------------------------------------------------------------------------- */

export const transactionSchema = z.object({
  id: z.string(),

  fromAccountId: z.string().nullable(),
  toAccountId: z.string().nullable(),
  type: transactionTypeEnum,
  categoryId: z.string().nullable(),

  amount: amountSchema,

  note: z
    .string()
    .trim()
    .max(1000, "Note cannot exceed 1000 characters")
    .nullable()
    .optional(),

  occurredAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

/* -------------------------------------------------------------------------- */
/* RESPONSE RELATIONS                                                         */
/* -------------------------------------------------------------------------- */

const accountRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const categoryRelationSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const transactionWithRelationsSchema = transactionSchema.extend({
  fromAccount: accountRelationSchema.nullable(),

  toAccount: accountRelationSchema.nullable(),

  category: categoryRelationSchema.nullable(),
});

export type TransactionWithRelations = z.infer<
  typeof transactionWithRelationsSchema
>;
