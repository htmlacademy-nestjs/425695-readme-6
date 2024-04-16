export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export function getMongoConnectionString({user, password, host, port, name, authBase}: MongoConfig): string {
  return `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
}
