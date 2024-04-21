import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constants';
export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'firstName',
  })
  @IsString()
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'lastName'
  })
  @IsString()
  public lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsString()
  public password: string;
}
