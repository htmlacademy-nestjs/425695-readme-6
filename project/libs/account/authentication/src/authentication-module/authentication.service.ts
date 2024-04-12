import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUser } from './authentication.constants';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';

import {dbConfig} from '@project/account-config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
  ) { }

  public async register(dto: CreateUserDto): Promise<UserEntity> {
    const {email, firstName, lastName, password} = dto;

    const user = {
      email, firstName, lastName,
      passwordHash: ''
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUser.EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUser.NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthUser.PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AuthUser.NOT_FOUND);
    }

    return user;
  }
}
