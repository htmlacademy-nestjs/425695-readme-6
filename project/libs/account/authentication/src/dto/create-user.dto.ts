import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'firstName',
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'lastName'
  })
  public lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  public password: string;
}
