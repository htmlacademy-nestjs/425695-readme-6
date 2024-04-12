import { Module } from '@nestjs/common';
import { UserModule } from '@project/user';
import { AuthenticationModule } from '@project/authentication'
import { AccountConfigModule } from '@project/account-config'

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
    AccountConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
