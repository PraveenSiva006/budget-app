import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from '@budget/contracts';
import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getAccounts(userId: string): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: { userId },
    });

    return accounts.map(AccountMapper.toDTO);
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
