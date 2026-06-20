import { PrismaCategory } from '@/prisma/prsima.types';
import { Category } from '@budget/contracts';

export class CategoryMapper {
  static toDTO(a: PrismaCategory): Category {
    return {
      id: a.id,
      name: a.name,
      type: a.type,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }
}
