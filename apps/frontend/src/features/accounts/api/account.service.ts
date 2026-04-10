import { accounts } from "@/features/accounts/mock/accounts.db";
import type { AccountDTO } from "@budget/contracts";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const generateId = () => Date.now().toString();
const now = () => new Date().toISOString();

export const accountService = {
  async getAll(): Promise<AccountDTO[]> {
    await delay();
    return [...accounts];
  },

  async getById(id: string): Promise<AccountDTO | null> {
    await delay();
    return accounts.find((acc) => acc.id === id) || null;
  },

  async create(
    payload: Omit<AccountDTO, "id" | "createdAt" | "updatedAt">,
  ): Promise<AccountDTO> {
    await delay();

    const newAccount: AccountDTO = {
      ...payload,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
    };

    accounts.push(newAccount);
    return newAccount;
  },

  async update(
    id: string,
    payload: Partial<AccountDTO>,
  ): Promise<AccountDTO | null> {
    await delay();

    const index = accounts.findIndex((acc) => acc.id === id);
    if (index === -1) return null;

    accounts[index] = {
      ...accounts[index],
      ...payload,
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
