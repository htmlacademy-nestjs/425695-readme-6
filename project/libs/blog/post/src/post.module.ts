import { Module } from '@nestjs/common';

import { CategoryModule } from '@project/blog-category';
import { PrismaClientModule } from '@project/blog-models';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';

@Module({
  imports: [CategoryModule, PrismaClientModule],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
