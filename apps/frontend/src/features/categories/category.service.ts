import { apiClient } from "@/lib/api.client";
import type {
  Category,
  ApiResponse,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@budget/contracts";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await apiClient.get<ApiResponse<Category[]>>("/categories");

    return res.data.data;
  },

  async getById(id: string): Promise<Category> {
    const res = await apiClient.get<ApiResponse<Category>>("/categories/" + id);

    return res.data.data;
  },

  async create(payload: CreateCategoryInput): Promise<Category> {
    const res = await apiClient.post<ApiResponse<Category>>(
      "/categories",
      payload,
    );

    return res.data.data;
  },

  async update(body: {
    id: string;
    payload: UpdateCategoryInput;
  }): Promise<Category> {
    const res = await apiClient.patch<ApiResponse<Category>>(
      "/categories/" + body.id,
      body.payload,
    );

    return res.data.data;
  },

  async delete(id: string): Promise<Category> {
    const res = await apiClient.delete<ApiResponse<Category>>(
      "/categories/" + id,
    );

    return res.data.data;
  },
};
