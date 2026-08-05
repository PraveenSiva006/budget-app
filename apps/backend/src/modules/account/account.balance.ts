import { Prisma } from '@/generated/prisma/client';

export interface AccountBalanceSummary {
  accountId: string;

  openingBalance: Prisma.Decimal;

  income: Prisma.Decimal;

  expenses: Prisma.Decimal;

  transferIn: Prisma.Decimal;

  transferOut: Prisma.Decimal;

  currentBalance: Prisma.Decimal;
}
