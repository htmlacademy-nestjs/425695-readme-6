import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRdo } from './rdo/category.rdo';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const categoryEntity = await this.categoryService.getCategory(id);
    return fillDto(CategoryRdo, categoryEntity.toPOJO());
  }

  @Get('/')
  public async index() {
    const categoryEntities = await this.categoryService.getAllCategories();
    const categories = categoryEntities.map((category) => category.toPOJO());
    return fillDto(CategoryRdo, categories);
  }

  @Post('/')
  public async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);
    return fillDto(CategoryRdo, newCategory.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, dto);
    return fillDto(CategoryRdo, updatedCategory.toPOJO());
  }
}
