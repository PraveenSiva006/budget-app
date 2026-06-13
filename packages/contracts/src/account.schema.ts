import * as z from "zod";

export const accountTypeEnum = z.enum([
  "CASH",
  "BANK",
  "CREDIT_CARD",
  "WALLET",
]);

export type AccountType = z.infer<typeof accountTypeEnum>;

export const createAccountSchema = z.object({
  name: z.string().min(2),
  type: accountTypeEnum,
  accNumber: z.string().optional(),
  currency: z.string().min(1),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export const updateAccountSchema = createAccountSchema;

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;

export const accountSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: accountTypeEnum,
  accNumber: z.string().nullable(),
  currency: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Account = z.infer<typeof accountSchema>;
