import * as z from "zod";

export const accountTypeEnum = z.enum([
  "CASH",
  "BANK",
  "CREDIT_CARD",
  "WALLET",
]);

export const createAccountSchema = z.object({
  name: z.string().min(4),
  type: accountTypeEnum,
  accNumber: z.string().optional(),
  currency: z.string().min(1),
});

export const updateAccountSchema = createAccountSchema.partial();

export const accountSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: accountTypeEnum,
  accNumber: z.string().optional(),
  currency: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/* ---------- TYPES ---------- */

type _AccountType = z.infer<typeof accountTypeEnum>;
export type AccountType = _AccountType;

export interface CreateAccountDTO {
  name: string;
  type: AccountType;
  accNumber?: string;
  currency: string;
}

export interface UpdateAccountDTO {
  name?: string;
  type?: AccountType;
  accNumber?: string;
  currency?: string;
}

export interface AccountDTO {
  id: string;
  name: string;
  type: AccountType;
  accNumber?: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
