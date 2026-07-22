import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@budget/contracts';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(userId: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories.map(CategoryMapper.toDTO);
  }

  async getCategoryById(id: string, userId: string): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return CategoryMapper.toDTO(category);
  }

  async createCategory(
    data: CreateCategoryInput,
    userId: string,
  ): Promise<Category> {
    const category = await this.prisma.category.create({
      data: { ...data, userId },
    });

    return CategoryMapper.toDTO(category);
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
    userId: string,
  ): Promise<Category> {
    // await this.getCategoryById(id, userId);

    const updated = await this.prisma.category.update({
      where: {
        id,
        userId,
      },
      data,
    });

    return CategoryMapper.toDTO(updated);
  }

  async deleteCategory(id: string, userId: string): Promise<Category> {
    // const category = await this.getCategoryById(id, userId);

    const category = await this.prisma.category.delete({
      where: {
        id,
        userId,
      },
    });

    return CategoryMapper.toDTO(category);
  }
}
