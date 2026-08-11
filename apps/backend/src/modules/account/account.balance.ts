import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaAccount } from '@/prisma/prsima.types';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface AccountBalanceInput {
  accountId: string;
  openingBalance: Prisma.Decimal;
  income: Prisma.Decimal;
  expenses: Prisma.Decimal;
  transferIn: Prisma.Decimal;
  transferOut: Prisma.Decimal;
}
export interface AccountBalanceSummary extends AccountBalanceInput {
  currentBalance: Prisma.Decimal;
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

  async getBalance(
    accountId: string,
    userId: string,
  ): Promise<AccountBalanceInput> {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const [incoming, outgoing] = await Promise.all([
      this.prisma.transaction.groupBy({
        by: ['type'],
        _sum: {
          amount: true,
        },
        where: {
          userId,
          toAccountId: accountId,
          type: {
            in: ['INCOME', 'TRANSFER'],
          },
        },
      }),

      this.prisma.transaction.groupBy({
        by: ['type'],
        _sum: {
          amount: true,
        },
        where: {
          userId,
          fromAccountId: accountId,
          type: {
            in: ['EXPENSE', 'TRANSFER'],
          },
        },
      }),
    ]);

    const income =
      incoming.find((item) => item.type === 'INCOME')?._sum.amount ??
      new Prisma.Decimal(0);

    const transferIn =
      incoming.find((item) => item.type === 'TRANSFER')?._sum.amount ??
      new Prisma.Decimal(0);

    const expenses =
      outgoing.find((item) => item.type === 'EXPENSE')?._sum.amount ??
      new Prisma.Decimal(0);

    const transferOut =
      outgoing.find((item) => item.type === 'TRANSFER')?._sum.amount ??
      new Prisma.Decimal(0);

    return AccountBalanceCalculator.calculate({
      accountId: account.id,
      openingBalance: account.openingBalance,
      income,
      expenses,
      transferIn,
      transferOut,
    });
  }

  async getBalances(
    accounts: PrismaAccount[],
    userId: string,
  ): Promise<AccountBalanceSummary[]> {
    const [incomingByAccount, outgoingByAccount] = await Promise.all([
      this.prisma.transaction.groupBy({
        by: ['toAccountId', 'type'],
        _sum: {
          amount: true,
        },
        where: {
          userId,
          toAccountId: {
            not: null,
          },
          type: {
            in: ['INCOME', 'TRANSFER'],
          },
        },
      }),

      this.prisma.transaction.groupBy({
        by: ['fromAccountId', 'type'],
        _sum: {
          amount: true,
        },
        where: {
          userId,
          fromAccountId: {
            not: null,
          },
          type: {
            in: ['EXPENSE', 'TRANSFER'],
          },
        },
      }),
    ]);

    const zero = new Prisma.Decimal(0);

    const balanceAmounts = new Map<
      string,
      {
        income: Prisma.Decimal;
        expenses: Prisma.Decimal;
        transferIn: Prisma.Decimal;
        transferOut: Prisma.Decimal;
      }
    >();

    for (const item of incomingByAccount) {
      if (!item.toAccountId) {
        continue;
      }

      const current = balanceAmounts.get(item.toAccountId) ?? {
        income: zero,
        expenses: zero,
        transferIn: zero,
        transferOut: zero,
      };

      if (item.type === 'INCOME') {
        current.income = item._sum.amount ?? zero;
      } else if (item.type === 'TRANSFER') {
        current.transferIn = item._sum.amount ?? zero;
      }

      balanceAmounts.set(item.toAccountId, current);
    }

    for (const item of outgoingByAccount) {
      if (!item.fromAccountId) {
        continue;
      }

      const current = balanceAmounts.get(item.fromAccountId) ?? {
        income: zero,
        expenses: zero,
        transferIn: zero,
        transferOut: zero,
      };

      if (item.type === 'EXPENSE') {
        current.expenses = item._sum.amount ?? zero;
      } else if (item.type === 'TRANSFER') {
        current.transferOut = item._sum.amount ?? zero;
      }

      balanceAmounts.set(item.fromAccountId, current);
    }

    return accounts.map((account) => {
      const amounts = balanceAmounts.get(account.id);

      return AccountBalanceCalculator.calculate({
        accountId: account.id,
        openingBalance: account.openingBalance,
        income: amounts?.income ?? zero,
        expenses: amounts?.expenses ?? zero,
        transferIn: amounts?.transferIn ?? zero,
        transferOut: amounts?.transferOut ?? zero,
      });
    });
  }
}
