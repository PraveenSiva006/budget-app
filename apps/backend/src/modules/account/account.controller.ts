// src/modules/account/account.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Account, CreateAccountInput } from '@budget/contracts';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  async getAccounts(): Promise<Account[]> {
    return this.service.getAccounts();
  }

  @Post()
  async createAccount(@Body() dto: CreateAccountInput) {
    return this.service.createAccount({
      data: dto,
    });
  }
}
