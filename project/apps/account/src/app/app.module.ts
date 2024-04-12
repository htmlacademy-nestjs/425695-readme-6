import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@project/user';
import { AuthenticationModule } from '@project/authentication'
import { AccountConfigModule, getMongooseOptions } from '@project/account-config'

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
