import { PrismaAccount } from '@/prisma/prsima.types';
import { Account } from '@budget/contracts';

export class AccountMapper {
  static toDTO(a: PrismaAccount): Account {
    return {
      id: a.id,
      name: a.name,
      type: a.type,
      currency: a.currency,
      accNumber: a.accNumber,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }
}
