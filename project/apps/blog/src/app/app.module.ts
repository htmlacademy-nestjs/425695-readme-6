import { Module } from '@nestjs/common';

import { CategoryModule } from '@project/blog-category';
import { CommentModule } from '@project/blog-comment';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CategoryModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
