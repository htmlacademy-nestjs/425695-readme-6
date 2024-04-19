import { Module } from '@nestjs/common';

import { CategoryModule } from '@project/blog-category';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
