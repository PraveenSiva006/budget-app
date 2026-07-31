import { PrismaService } from '@/prisma/prisma.service';
import {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from '@budget/contracts';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionListMapper, TransactionMapper } from './transaction.mapper';
import { transactionListInclude } from '@/modules/transaction/transaction.queries';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      include: transactionListInclude,
    });

    return transactions.map(TransactionListMapper.toDTO);
  }

  async getTransactionById(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
      include: transactionListInclude,
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return TransactionListMapper.toDTO(transaction);
  }

  async createTransaction(
    data: CreateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: { ...data, userId },
    });

    return TransactionMapper.toDTO(transaction);
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
    // await this.getTransactionById(id, userId);

    const updated = await this.prisma.transaction.update({
      where: {
        id,
        userId,
      },
      data,
    });

    return TransactionMapper.toDTO(updated);
  }

  async deleteTransaction(id: string, userId: string): Promise<Transaction> {
    // const transaction = await this.getTransactionById(id, userId);

    const transaction = await this.prisma.transaction.delete({
      where: {
        id,
        userId,
      },
    });

    return TransactionMapper.toDTO(transaction);
  }
}
