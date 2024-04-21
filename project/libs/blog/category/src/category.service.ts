import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getCategory(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.findById(id);
  }

  public async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  public async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existsCategory = (await this.categoryRepository.find({ title: dto.title })).at(0);
    if (existsCategory) {
      throw new ConflictException('A category with the title already exists');
    }

    const newCategory = new CategoryEntity(dto);
    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.categoryRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const categoryEntity = new CategoryEntity(dto);

    try {
      await this.categoryRepository.update(categoryEntity);
      return categoryEntity;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async getCategoriesByIds(categoryIds: string[]): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findByIds(categoryIds);

    if (categories.length !== categoryIds.length) {
      const foundCategoryIds = categories.map((category) => category.id);
      const notFoundCategoryIds = categoryIds.filter((categoryId) => !foundCategoryIds.includes(categoryId));

      if (notFoundCategoryIds.length > 0) {
        throw new NotFoundException(`Categories with ids ${notFoundCategoryIds.join(', ')} not found.`);
      }
    }

    return categories;
  }
}
