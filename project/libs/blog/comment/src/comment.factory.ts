import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/domain-types';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }
}
