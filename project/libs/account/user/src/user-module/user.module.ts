import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserFactory, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
