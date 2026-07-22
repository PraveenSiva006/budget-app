import { PrismaTransaction } from '@/prisma/prsima.types';
import { Transaction } from '@budget/contracts';

export class TransactionMapper {
  static toDTO(a: PrismaTransaction): Transaction {
    return {
      id: a.id,
      accountId: a.accountId,
      type: a.type,
      categoryId: a.categoryId,
      amount: Number(a.amount),
      note: a.note,
      occurredAt: a.occurredAt.toISOString(),
      createdAt: a.createdAt.toISOString(),
      //   updatedAt: a.updatedAt.toISOString(),
    };
  }
}
