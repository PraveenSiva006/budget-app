import { apiClient } from "@/lib/api.client";
import type {
  Transaction,
  ApiResponse,
  CreateTransactionInput,
  UpdateTransactionInput,
} from "@budget/contracts";

export const transactionApi = {
  async getAll(): Promise<Transaction[]> {
    const res =
      await apiClient.get<ApiResponse<Transaction[]>>("/transactions");

    return res.data.data;
  },

  async getById(id: string): Promise<Transaction> {
    const res = await apiClient.get<ApiResponse<Transaction>>(
      "/transactions/" + id,
    );

    return res.data.data;
  },

  async create(payload: CreateTransactionInput): Promise<Transaction> {
    const res = await apiClient.post<ApiResponse<Transaction>>(
      "/transactions",
      payload,
    );

    return res.data.data;
  },

  async update(body: {
    id: string;
    payload: UpdateTransactionInput;
  }): Promise<Transaction> {
    const res = await apiClient.patch<ApiResponse<Transaction>>(
      "/transactions/" + body.id,
      body.payload,
    );

    return res.data.data;
  },

  async delete(id: string): Promise<Transaction> {
    const res = await apiClient.delete<ApiResponse<Transaction>>(
      "/transactions/" + id,
    );

    return res.data.data;
  },
};
