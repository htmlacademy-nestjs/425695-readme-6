import { Module } from '@nestjs/common';
import { UserModule } from '@project/user';
import { AuthenticationModule } from '@project/authentication'

@Module({
  imports: [
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
