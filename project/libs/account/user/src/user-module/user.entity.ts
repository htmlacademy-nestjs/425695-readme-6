import { Entity, StorableEntity } from '@project/shared/core';
import { AuthorizedUser } from '@project/shared/domain-types';

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
}
