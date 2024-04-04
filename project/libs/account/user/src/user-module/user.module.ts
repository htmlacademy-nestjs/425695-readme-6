import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';

@Module({
  providers: [UserFactory],
})
export class UserModule {}
