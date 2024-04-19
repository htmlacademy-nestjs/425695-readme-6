import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Category } from '@project/shared/domain-types';
import { BasePostgresRepository } from '@project/shared/data-access';

import { CategoryEntity } from './category.entity';
import { CategoryFactory } from './category.factory';
import { CategoryFilter, categoryFilterToPrismaFilter } from './category.filter';
import { MAX_CATEGORY_LIMIT } from './category.constants';

@Injectable()
export class CategoryRepository extends BasePostgresRepository<CategoryEntity, Category> {
  constructor(
    entityFactory: CategoryFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CategoryEntity): Promise<void> {
    const record = await this.client.category.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<CategoryEntity> {
    const document = await this.client.category.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: CategoryFilter): Promise<CategoryEntity[]> {
    const where = filter ?? categoryFilterToPrismaFilter(filter);

    const documents = await this.client.category.findMany({
      where,
      take: MAX_CATEGORY_LIMIT
    });


    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id,
      }
    });
  }

  public async update(entity: CategoryEntity): Promise<void> {
    await this.client.category.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
      }
    });
  }

  public async findByIds(ids: string[]): Promise<CategoryEntity[]> {
    const records = await this.client.category.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
