import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';
import {UserModel,UserSchema} from './user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  providers: [UserFactory, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
