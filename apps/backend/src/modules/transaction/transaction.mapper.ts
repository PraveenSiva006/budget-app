import { PrismaTransactionList } from '@/modules/transaction/transaction.queries';
import { PrismaTransaction } from '@/prisma/prsima.types';
import { Transaction, TransactionWithRelations } from '@budget/contracts';

export class TransactionMapper {
  static toDTO(txn: PrismaTransaction): Transaction {
    return {
      id: txn.id,
      fromAccountId: txn.fromAccountId,
      toAccountId: txn.toAccountId,
      type: txn.type,
      categoryId: txn.categoryId || '',
      amount: String(txn.amount),
      note: txn.note,
      occurredAt: txn.occurredAt.toISOString(),
      createdAt: txn.createdAt.toISOString(),
      updatedAt: txn.updatedAt.toISOString(),
    };
  }
}

export class TransactionListMapper {
  static toDTO(txn: PrismaTransactionList): TransactionWithRelations {
    return {
      id: txn.id,
      fromAccountId: txn.fromAccountId,
      toAccountId: txn.toAccountId,
      type: txn.type,
      categoryId: txn.categoryId,
      amount: String(txn.amount),
      note: txn.note,
      toAccount: txn.toAccount
        ? { id: txn.toAccount.id, name: txn.toAccount.name }
        : null,
      fromAccount: { id: txn.fromAccount.id, name: txn.fromAccount.name },
      category: txn.category
        ? { id: txn.category.id, name: txn.category.name }
        : null,
      occurredAt: txn.occurredAt.toISOString(),
      createdAt: txn.createdAt.toISOString(),
      updatedAt: txn.updatedAt.toISOString(),
    };
  }
}
