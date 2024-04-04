import { User } from "./user.interface";

export interface AuthorizedUser extends User {
  passwordHash: string;
}
