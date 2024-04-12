import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { MongoEnvConfiguration } from './mongodb/mongodb.env.config';

const DEFAULT_MONGO_PORT = 27017;

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

async function getDbConfig(): Promise<MongoEnvConfiguration> {
  const config = plainToClass(MongoEnvConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE
  });

  await config.validate();

  return config;
}

export default registerAs('db', async (): Promise<ConfigType<typeof getDbConfig>> => {
  return getDbConfig();
});
