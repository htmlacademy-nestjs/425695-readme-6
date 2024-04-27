import { Module } from '@nestjs/common';

import { CategoryModule } from '@project/blog-category';
import { CommentModule } from '@project/blog-comment';
import { PostModule } from '@project/blog-post';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostModule, CategoryModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
