// apps/backend/src/accounts/account.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Account, CreateAccountInput } from '@budget/contracts';
import { AccountMapper } from './account.mapper';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAccounts(): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany();

    return accounts.map(AccountMapper.toDTO);
  }

  async createAccount({ data }): Promise<Account> {
    const account = await this.prisma.account.create({
      data,
    });

    return AccountMapper.toDTO(account);
  }
}
