import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Account,
  AccountWithBalance,
  CreateAccountInput,
  DropdownOption,
  UpdateAccountInput,
} from '@budget/contracts';
import { AccountMapper, AccountWithBalanceMapper } from './account.mapper';

import { AccountBalanceService } from '@/modules/account/account.balance';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly balance: AccountBalanceService,
  ) {}

  async getAccounts(userId: string): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    return accounts.map(AccountMapper.toDTO);
  }

  async getAccountsWithBalance(userId: string): Promise<AccountWithBalance[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    const balances = await this.balance.getBalances(userId);

    const balanceMap = new Map(
      balances.map((balance) => [balance.accountId, balance]),
    );

    return accounts.map((account) => {
      const balance = balanceMap.get(account.id);

      if (!balance) {
        throw new Error(`Balance not found for account ${account.id}`);
      }

      return AccountWithBalanceMapper.toDTO(account, balance);
    });
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
}
