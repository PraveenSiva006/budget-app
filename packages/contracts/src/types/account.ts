export type AccountType = "CASH" | "BANK" | "CREDIT_CARD" | "WALLET";

export interface AccountDTO {
  id: string;
  accNumber?: string;
  name: string;
  type: AccountType;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountDTO {
  name: string;
  type: AccountType;
  currency?: string;
}

export interface UpdateAccountDTO {
  name?: string;
  type?: AccountType;
  currency?: string;
}
