import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from '@budget/contracts';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  async getAccounts(@Headers('x-user-id') userId: string): Promise<Account[]> {
    return this.service.getAccounts(userId);
  }

  @Post()
  async createAccount(
    @Body() dto: CreateAccountInput,
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.createAccount(dto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAccountInput,
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.updateAccount(id, dto, userId);
  }

  @Delete(':id')
  async deleteAccount(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.deleteAccount(id, userId);
  }
}
