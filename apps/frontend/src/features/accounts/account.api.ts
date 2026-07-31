import { apiClient } from "@/lib/api.client";
import type {
  Account,
  ApiResponse,
  CreateAccountInput,
  DropdownOption,
  UpdateAccountInput,
} from "@budget/contracts";

export const accountApi = {
  async getAll(): Promise<Account[]> {
    const res = await apiClient.get<ApiResponse<Account[]>>("/accounts");

    return res.data.data;
  },

  async getDropdownOptions(): Promise<DropdownOption[]> {
    const res = await apiClient.get<ApiResponse<DropdownOption[]>>(
      "/accounts/dropdown-options",
    );

    return res.data.data;
  },

  async getById(id: string): Promise<Account> {
    const res = await apiClient.get<ApiResponse<Account>>("/accounts/" + id);

    return res.data.data;
  },

  async create(payload: CreateAccountInput): Promise<Account> {
    const res = await apiClient.post<ApiResponse<Account>>(
      "/accounts",
      payload,
    );

    return res.data.data;
  },

  async update(body: {
    id: string;
    payload: UpdateAccountInput;
  }): Promise<Account> {
    const res = await apiClient.patch<ApiResponse<Account>>(
      "/accounts/" + body.id,
      body.payload,
    );

    return res.data.data;
  },

  async delete(id: string): Promise<Account> {
    const res = await apiClient.delete<ApiResponse<Account>>("/accounts/" + id);

    return res.data.data;
  },
};
