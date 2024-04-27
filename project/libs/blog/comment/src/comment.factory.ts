import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/domain-types';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(entityPlainData: Comment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }

  public createFromDto(dto: CreateCommentDto, postId: string): CommentEntity {
    const currentDate = new Date();
    return new CommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
