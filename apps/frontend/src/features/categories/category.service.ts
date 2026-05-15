import { categories } from "@/features/categories/mock/categories.db";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@budget/contracts";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const categoryService = {
  async getAll(): Promise<Category[]> {
    await delay();
    return [...categories];
  },

  async getById(id: string): Promise<Category | null> {
    await delay();
    return categories.find((cat) => cat.id === id) || null;
  },

  async create(payload: CreateCategoryInput): Promise<Category> {
    await delay();

    const newCategory: Category = {
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
    payload: UpdateCategoryInput,
  ): Promise<Category | null> {
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
