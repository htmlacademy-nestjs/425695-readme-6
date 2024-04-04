import { Entity, StorableEntity } from '@project/shared/core';
import { AuthorizedUser } from '@project/shared/domain-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity extends Entity implements AuthorizedUser, StorableEntity<AuthorizedUser> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public passwordHash: string;

  constructor(user?: AuthorizedUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthorizedUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthorizedUser {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
