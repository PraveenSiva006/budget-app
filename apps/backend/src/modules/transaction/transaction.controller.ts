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
import { TransactionService } from './transaction.service';
import {
  ApiResponse,
  CreateTransactionInput,
  createTransactionSchema,
  Transaction,
  UpdateTransactionInput,
  updateTransactionSchema,
} from '@budget/contracts';
import { ZodValidationPipe } from '@/common/errors/zod-validation.pipe';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Get()
  async getTransactions(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Transaction[]>> {
    return {
      data: await this.service.getTransactions(userId),
    };
  }

  @Post()
  async createTransaction(
    @Body(new ZodValidationPipe(createTransactionSchema))
    dto: CreateTransactionInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Transaction>> {
    return {
      data: await this.service.createTransaction(dto, userId),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTransactionSchema))
    dto: UpdateTransactionInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Transaction>> {
    return {
      data: await this.service.updateTransaction(id, dto, userId),
    };
  }

  @Delete(':id')
  async deleteTransaction(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Transaction>> {
    return {
      data: await this.service.deleteTransaction(id, userId),
    };
  }
}
