type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface CategoryDTO {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

type MutableCategory = Omit<CategoryDTO, "id" | "createdAt">;
export type CreateCategoryDTO = MutableCategory;
export type UpdateCategoryDTO = Partial<MutableCategory>;
