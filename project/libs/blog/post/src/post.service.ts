import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/core';
import { CategoryService } from '@project/blog-category';

import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFactory } from './post.factory';
import { CommentEntity, CommentFactory, CommentRepository, CreateCommentDto } from '@project/blog-comment';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryService: CategoryService,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
  ) {}

  public async getAllPosts(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const categories = await this.categoryService.getCategoriesByIds(dto.categories);
    const newPost = PostFactory.createFromCreatePostDto(dto, categories);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let isSameCategories = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'categories' && value) {
        const currentCategoryIds = existsPost.categories.map((category) => category.id);
        isSameCategories = currentCategoryIds.length === value.length &&
          currentCategoryIds.some((categoryId) => value.includes(categoryId));

        if (! isSameCategories) {
          existsPost.categories = await this.categoryService.getCategoriesByIds(dto.categories);
        }
      }
    }

    if (isSameCategories && ! hasChanges) {
      return existsPost;
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.commentFactory.createFromDto(dto, existsPost.id);
    await this.commentRepository.save(newComment);

    return newComment;
  }
}
