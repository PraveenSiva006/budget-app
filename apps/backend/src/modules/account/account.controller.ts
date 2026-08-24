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
  AccountWithBalance,
  ApiResponse,
  CreateAccountInput,
  createAccountSchema,
  DropdownOption,
  UpdateAccountInput,
  updateAccountSchema,
} from '@budget/contracts';
import { AccountService } from './account.service';
import { ZodValidationPipe } from '@/common/errors/zod-validation.pipe';

@Controller('accounts')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get()
  async getAccounts(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<AccountWithBalance[]>> {
    return {
      data: await this.service.getAccountsWithBalance(userId),
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
    @Body(new ZodValidationPipe(createAccountSchema)) dto: CreateAccountInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Account>> {
    return {
      data: await this.service.createAccount(dto, userId),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAccountSchema)) dto: UpdateAccountInput,
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
