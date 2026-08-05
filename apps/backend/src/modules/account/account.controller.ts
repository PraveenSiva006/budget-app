import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  Account,
  ApiResponse,
  CreateAccountInput,
  DropdownOption,
  UpdateAccountInput,
} from '@budget/contracts';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  async getAccounts(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Account[]>> {
    this.service.getBalances(userId);
    return {
      data: await this.service.getAccounts(userId),
    };
  }

  @Get('dropdown-options')
  async getAccountOptions(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<DropdownOption[]>> {
    return {
      data: await this.service.getAccountOptions(userId),
    };
  }

  @Post()
  async createAccount(
    @Body() dto: CreateAccountInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Account>> {
    return {
      data: await this.service.createAccount(dto, userId),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAccountInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Account>> {
    return {
      data: await this.service.updateAccount(id, dto, userId),
    };
  }

  @Delete(':id')
  async deleteAccount(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Account>> {
    return {
      data: await this.service.deleteAccount(id, userId),
    };
  }
}
