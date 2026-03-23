type AccountType = "CASH" | "BANK" | "CREDIT_CARD" | "WALLET";

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
