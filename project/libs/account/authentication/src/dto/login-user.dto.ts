import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constants';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
