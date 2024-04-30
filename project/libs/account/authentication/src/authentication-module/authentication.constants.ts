export const AuthUser = {
  EXISTS: 'User with this email exists',
  NOT_FOUND: 'User not found',
  PASSWORD_WRONG: 'User password is wrong'
} as const;

export const AuthenticationResponseMessage = {
  LOGGED_SUCCESS: 'User has been successfully logged.',
  LOGGED_ERROR: 'Password or Login is wrong.',
  USER_FOUND: 'User found',
  USER_NOT_FOUND: 'User not found',
  USER_EXISTS: 'User with the email already exists',
  USER_CREATED: 'The new user has been successfully created.',
} as const;

export const AuthenticationValidateMessage = {
  EMAIL_NOT_VALID: 'The email is not valid',
} as const;
