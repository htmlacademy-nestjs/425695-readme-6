import { EntityFactory } from '@project/shared/core';
import { AuthorizedUser } from '@project/shared/domain-types';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: AuthorizedUser): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
