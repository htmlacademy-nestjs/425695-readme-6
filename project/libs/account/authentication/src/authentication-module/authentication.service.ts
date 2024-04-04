import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constants';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstName, lastName, password} = dto;

    const user = {
      email, firstName, lastName,
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .save(userEntity);
  }
}
