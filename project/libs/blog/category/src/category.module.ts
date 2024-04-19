import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryFactory } from './category.factory';

@Module({
  imports: [PrismaClientModule],
  providers: [CategoryRepository, CategoryService, CategoryFactory],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
