import { AccountBalanceSummary } from '@/modules/account/account.balance';
import { PrismaAccount } from '@/prisma/prsima.types';
import { Account, AccountWithBalance } from '@budget/contracts';

export class AccountMapper {
  static toDTO(a: PrismaAccount): Account {
    return {
      id: a.id,
      name: a.name,
      type: a.type,
      currency: a.currency,
      openingBalance: String(a.openingBalance),
      accountNumber: a.accountNumber,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }
}

export class AccountWithBalanceMapper {
  static toDTO(
    a: PrismaAccount,
    balance: AccountBalanceSummary,
  ): AccountWithBalance {
    return {
      id: a.id,
      name: a.name,
      type: a.type,
      currency: a.currency,
      openingBalance: String(a.openingBalance),
      balance: String(balance.currentBalance),
      accountNumber: a.accountNumber,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    };
  }
}
