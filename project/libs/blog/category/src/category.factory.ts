import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { Category } from '@project/shared/domain-types';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryFactory implements EntityFactory<CategoryEntity> {
  public create(entityPlainData: Category): CategoryEntity {
    return new CategoryEntity(entityPlainData);
  }
}
