import { categories } from "@/features/categories/mock/categories.db";
import type {
  CategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@budget/contracts";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const categoryService = {
  async getAll(): Promise<CategoryDTO[]> {
    await delay();
    return [...categories];
  },

  async getById(id: string): Promise<CategoryDTO | null> {
    await delay();
    return categories.find((cat) => cat.id === id) || null;
  },

  async create(payload: CreateCategoryDTO): Promise<CategoryDTO> {
    await delay();

    const newCategory: CategoryDTO = {
      ...payload,
      id: generateId(),
      createdAt: now(),
      updatedAt: now(),
    };

    categories.push(newCategory);
    return newCategory;
  },

  async update(
    id: string,
    payload: UpdateCategoryDTO,
  ): Promise<CategoryDTO | null> {
    await delay();

    const index = categories.findIndex((cat) => cat.id === id);
    if (index === -1) return null;

    categories[index] = {
      ...categories[index],
      ...payload,
      updatedAt: now(),
    };

    return categories[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay();

    const index = categories.findIndex((cat) => cat.id === id);
    if (index === -1) return false;

    categories.splice(index, 1);
    return true;
  },
};
