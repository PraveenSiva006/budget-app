import { apiClient } from "@/lib/api.client";
import type {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from "@budget/contracts";

export const accountService = {
  async getAll(): Promise<Account[]> {
    const res = await apiClient.get("/accounts");
    console.log(res);
    return res.data;
  },

  async getById(id: string): Promise<Account | null> {
    const res = await apiClient.get("/accounts/" + id);
    return res.data;
  },

  async create(payload: CreateAccountInput): Promise<Account> {
    const res = await apiClient.post("/accounts", {
      ...payload,
    });

    return res.data;
  },

  async update(body: {
    id: string;
    payload: UpdateAccountInput;
  }): Promise<Account | null> {
    const res = await apiClient.patch("/accounts/" + body.id, {
      ...body.payload,
    });

    return res.data;
  },

  async delete(id: string): Promise<boolean> {
    const res = await apiClient.delete("/accounts/" + id);

    return res.data;
  },
};
