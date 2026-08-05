import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Account,
  CreateAccountInput,
  DropdownOption,
  UpdateAccountInput,
} from '@budget/contracts';
import { AccountMapper } from './account.mapper';
import { Decimal } from '@prisma/client/runtime/client';
import { Prisma } from '@/generated/prisma/client';
import { AccountBalanceSummary } from '@/modules/account/account.balance';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getAccounts(userId: string): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    return accounts.map(AccountMapper.toDTO);
  }

  async getAccountOptions(userId: string): Promise<DropdownOption[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    return accounts.map((account) => ({
      value: account.id,
      label: account.name,
    }));
  }

  async getAccountById(id: string, userId: string): Promise<Account> {
    const account = await this.prisma.account.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return AccountMapper.toDTO(account);
  }

  async createAccount(
    data: CreateAccountInput,
    userId: string,
  ): Promise<Account> {
    const account = await this.prisma.account.create({
      data: { ...data, userId },
    });

    return AccountMapper.toDTO(account);
  }

  async updateAccount(
    id: string,
    data: UpdateAccountInput,
    userId: string,
  ): Promise<Account> {
    await this.getAccountById(id, userId);

    const updated = await this.prisma.account.update({
      where: {
        id,
      },
      data,
    });

    return AccountMapper.toDTO(updated);
  }

  async deleteAccount(id: string, userId: string): Promise<Account> {
    const account = await this.getAccountById(id, userId);

    await this.prisma.account.delete({
      where: {
        id,
      },
    });

    return account;
  }

  private async getTransactionAmount(where: Prisma.TransactionWhereInput) {
    const result = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where,
    });

    return result._sum.amount ?? new Decimal(0);
  }

  async getBalance(accountId: string): Promise<AccountBalanceSummary> {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const incomeAmount = await this.getTransactionAmount({
      type: 'INCOME',
      toAccountId: account.id,
    });

    const expenseAmount = await this.getTransactionAmount({
      type: 'EXPENSE',
      fromAccountId: account.id,
    });

    const transferInAmount = await this.getTransactionAmount({
      type: 'TRANSFER',
      toAccountId: account.id,
    });

    const transferOutAmount = await this.getTransactionAmount({
      type: 'TRANSFER',
      fromAccountId: account.id,
    });

    const currentBalance = account.openingBalance
      .add(incomeAmount)
      .sub(expenseAmount)
      .add(transferInAmount)
      .sub(transferOutAmount);

    return {
      accountId: account.id,
      openingBalance: account.openingBalance,
      income: incomeAmount,
      expenses: expenseAmount,
      transferIn: transferInAmount,
      transferOut: transferOutAmount,
      currentBalance,
    };
  }

  async getBalances(userId: string): Promise<AccountBalanceSummary[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
      },
    });

    const incomeByAccount = await this.prisma.transaction.groupBy({
      by: ['toAccountId'],
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: 'INCOME',
        toAccountId: {
          not: null,
        },
      },
    });

    const expensesByAccount = await this.prisma.transaction.groupBy({
      by: ['fromAccountId'],
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: 'EXPENSE',
        fromAccountId: {
          not: null,
        },
      },
    });
    const transferInByAccount = await this.prisma.transaction.groupBy({
      by: ['toAccountId'],
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: 'TRANSFER',
        toAccountId: {
          not: null,
        },
      },
    });
    const transferOutByAccount = await this.prisma.transaction.groupBy({
      by: ['fromAccountId'],
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: 'TRANSFER',
        fromAccountId: {
          not: null,
        },
      },
    });

    console.log({
      incomeByAccount,
      expensesByAccount,
      transferInByAccount,
      transferOutByAccount,
    });

    return [];
  }
}
