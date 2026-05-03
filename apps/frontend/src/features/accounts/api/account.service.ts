import { accounts } from "@/features/accounts/mock/accounts.db";
import type { Account, UpdateAccountInput } from "@budget/contracts";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const generateId = () => Date.now().toString();
const now = () => new Date().toISOString();

export const accountService = {
  async getAll(): Promise<Account[]> {
    await delay();
    return [...accounts];
  },

  async getById(id: string): Promise<Account | null> {
    await delay();
    return accounts.find((acc) => acc.id === id) || null;
  },

  async create(
    payload: Omit<Account, "id" | "createdAt" | "updatedAt">,
  ): Promise<Account> {
    await delay();

    const newAccount: Account = {
      ...payload,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
    };

    accounts.push(newAccount);
    return newAccount;
  },

  async update(body: {
    id: string;
    payload: UpdateAccountInput;
  }): Promise<Account | null> {
    await delay();

    const index = accounts.findIndex((acc) => acc.id === body.id);
    if (index === -1) return null;

    accounts[index] = {
      ...accounts[index],
      ...body.payload,
      updatedAt: now(),
    };

    return accounts[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay();

    const index = accounts.findIndex((acc) => acc.id === id);
    if (index === -1) return false;

    accounts.splice(index, 1);
    return true;
  },
};
