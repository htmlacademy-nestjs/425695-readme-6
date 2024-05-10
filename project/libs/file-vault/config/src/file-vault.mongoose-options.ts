import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          user: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          port: config.get<number>('application.db.port'),
          authBase: config.get<string>('application.db.authBase'),
          name: config.get<string>('application.db.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
