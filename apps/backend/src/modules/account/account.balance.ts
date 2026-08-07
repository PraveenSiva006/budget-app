import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/client';

export interface AccountBalanceSummary {
  accountId: string;

  openingBalance: Prisma.Decimal;

  income: Prisma.Decimal;

  expenses: Prisma.Decimal;

  transferIn: Prisma.Decimal;

  transferOut: Prisma.Decimal;

  currentBalance: Prisma.Decimal;
}

interface AccountBalanceInput {
  accountId: string;
  openingBalance: Decimal;
  income: Decimal;
  expenses: Decimal;
  transferIn: Decimal;
  transferOut: Decimal;
}

export class AccountBalanceCalculator {
  static calculate(input: AccountBalanceInput): AccountBalanceSummary {
    const currentBalance = input.openingBalance
      .add(input.income)
      .sub(input.expenses)
      .add(input.transferIn)
      .sub(input.transferOut);

    return {
      ...input,
      currentBalance,
    };
  }
}

@Injectable()
export class AccountBalanceService {
  constructor(private readonly prisma: PrismaService) {}

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

    const incomeMap = new Map(
      incomeByAccount.map((item) => [
        item.toAccountId,
        item._sum.amount ?? new Decimal(0),
      ]),
    );

    const expenseMap = new Map(
      expensesByAccount.map((item) => [
        item.fromAccountId,
        item._sum.amount ?? new Decimal(0),
      ]),
    );

    const transferInMap = new Map(
      transferInByAccount.map((item) => [
        item.toAccountId,
        item._sum.amount ?? new Decimal(0),
      ]),
    );

    const transferOutMap = new Map(
      transferOutByAccount.map((item) => [
        item.fromAccountId,
        item._sum.amount ?? new Decimal(0),
      ]),
    );

    const balances = accounts.map((account) => {
      const income = incomeMap.get(account.id) ?? new Decimal(0);
      const expenses = expenseMap.get(account.id) ?? new Decimal(0);
      const transferIn = transferInMap.get(account.id) ?? new Decimal(0);
      const transferOut = transferOutMap.get(account.id) ?? new Decimal(0);

      return AccountBalanceCalculator.calculate({
        accountId: account.id,
        openingBalance: account.openingBalance,
        income,
        expenses,
        transferIn,
        transferOut,
      });
    });

    return balances;
  }
}
