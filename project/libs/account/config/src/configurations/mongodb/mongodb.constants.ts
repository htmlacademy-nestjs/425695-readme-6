export const MongoDBPort = {
  MIN: 0,
  MAX: 65535,
  DEFAULT: 27017,
} as const;

export enum MongoDBEnvValidationMessage {
  DB_HOST_REQUIRED = 'MongoDB host is required',
  DB_NAME_REQUIRED = 'Database name is required',
  DB_PORT_REQUIRED = 'MongoDB port is required',
  DB_USER_REQUIRED = 'MongoDB user is required',
  DB_PASSWORD_REQUIRED = 'MongoDB password is required',
  DB_BASE_AUTH_REQUIRED = 'MongoDB authentication base is required',
}
