import { Expose, Type } from 'class-transformer';

import { CategoryRdo } from '@project/blog-category';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public content: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => CategoryRdo)
  public categories: CategoryRdo[];

  @Expose()
  public comments: Comment[]
}

export class PostWithPaginationRdo {
  @Expose()
  public entities: PostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
