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
  Category,
  ApiResponse,
  CreateCategoryInput,
  UpdateCategoryInput,
  DropdownOption,
} from '@budget/contracts';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async getCategories(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Category[]>> {
    return {
      data: await this.service.getCategories(userId),
    };
  }

  @Get('dropdown-options')
  async getCategoryOptions(
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<DropdownOption[]>> {
    return {
      data: await this.service.getCategoryOptions(userId),
    };
  }

  @Post()
  async createCategory(
    @Body() dto: CreateCategoryInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Category>> {
    return {
      data: await this.service.createCategory(dto, userId),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryInput,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Category>> {
    return {
      data: await this.service.updateCategory(id, dto, userId),
    };
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiResponse<Category>> {
    return {
      data: await this.service.deleteCategory(id, userId),
    };
  }
}
