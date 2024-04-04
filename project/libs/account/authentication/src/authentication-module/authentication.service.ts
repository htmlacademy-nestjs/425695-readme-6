import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUser } from './authentication.constants';
import { LoginUserDto } from '../dto/login-user.dto';

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
      throw new ConflictException(AuthUser.EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(password)

    return this.userRepository
      .save(userEntity);
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
