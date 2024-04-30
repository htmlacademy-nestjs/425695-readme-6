import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult } from '@project/shared/core';
import { BasePostgresRepository } from '@project/shared/data-access';
import { PrismaClientService } from '@project/blog-models';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';
import { Post } from '@project/shared/domain-types';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        categories: {
          connect: pojoEntity.categories.map(({ id }) => ({ id }))
        },
        comments: {
          connect: [],
        }
      }
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        categories: true,
        comments: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        content: pojoEntity.content,
        description: pojoEntity.description,
        categories: {
          set: pojoEntity.categories.map((category) => ({ id: category.id })),
        }
      },
      include: {
        categories: true,
        comments: true,
      }
    });
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.categories) {
      where.categories = {
        some: {
          id: {
            in: query.categories
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          categories: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
