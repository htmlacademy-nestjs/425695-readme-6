import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';

import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CategoryEntity } from '@project/blog-category';
import { Post } from '@project/shared/domain-types';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(entityPlainData: Post): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto, categories: CategoryEntity[]): PostEntity {
    const entity = new PostEntity();
    entity.categories = categories;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }
}
