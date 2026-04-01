import * as z from "zod";

export const accountTypeEnum = z.enum([
  "CASH",
  "BANK",
  "CREDIT_CARD",
  "WALLET",
]);

export const accountSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: accountTypeEnum,
  accNumber: z.string().optional(),
  currency: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createAccountSchema = z.object({
  name: z.string().min(4),
  type: accountTypeEnum,
  accNumber: z.string().optional(),
  currency: z.string().min(1),
});

export const updateAccountSchema = createAccountSchema.partial();

export type AccountDTO = z.infer<typeof accountSchema>;
export type CreateAccountDTO = z.infer<typeof createAccountSchema>;
export type UpdateAccountDTO = z.infer<typeof updateAccountSchema>;
export type AccountType = z.infer<typeof accountTypeEnum>;
