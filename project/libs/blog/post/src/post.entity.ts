import { CategoryEntity, CategoryFactory } from '@project/blog-category';
import { Entity, StorableEntity } from '@project/shared/core';
import { CommentEntity, CommentFactory } from '@project/blog-comment';
import { Post } from '@project/shared/domain-types';

export class PostEntity extends Entity implements StorableEntity<Post> {
  public title: string;
  public categories: CategoryEntity[]
  public description: string;
  public content: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public comments: CommentEntity[];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (! post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.description = post.description;
    this.categories = [];
    this.comments = [];

    const commentFactory = new CommentFactory();
    for (const comment of post.comments) {
      const commentEntity = commentFactory.create(comment);
      this.comments.push(commentEntity);
    }

    const categoryFactory = new CategoryFactory();
    for (const category of post.categories) {
      const categoryEntity = categoryFactory.create(category);
      this.categories.push(categoryEntity);
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      title: this.title,
      content: this.content,
      userId: this.userId,
      categories: this.categories.map((categoryEntity) => categoryEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }
}
