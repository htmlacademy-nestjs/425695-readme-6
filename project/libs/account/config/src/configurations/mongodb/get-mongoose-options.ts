import { getMongoConnectionString } from '@project/shared/helpers';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          user: config.get<string>('db.user'),
          password: config.get<string>('db.password'),
          host: config.get<string>('db.host'),
          port: config.get<number>('db.port'),
          authBase: config.get<string>('db.authBase'),
          name: config.get<string>('db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
