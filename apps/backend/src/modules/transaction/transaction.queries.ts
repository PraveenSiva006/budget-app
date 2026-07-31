import type { Prisma } from '@/generated/prisma/client';

export const transactionListInclude = {
  fromAccount: {
    select: {
      id: true,
      name: true,
    },
  },
  toAccount: {
    select: {
      id: true,
      name: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.TransactionInclude;

export type PrismaTransactionList = Prisma.TransactionGetPayload<{
  include: typeof transactionListInclude;
}>;
