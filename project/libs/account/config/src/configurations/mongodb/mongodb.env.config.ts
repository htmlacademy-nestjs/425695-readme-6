import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';
import { MongoDBEnvValidationMessage, MongoDBPort } from './mongodb.constants';


export class MongoEnvConfiguration {
  @IsString({ message: MongoDBEnvValidationMessage.DB_NAME_REQUIRED })
  public name: string;

  @IsString({ message: MongoDBEnvValidationMessage.DB_HOST_REQUIRED })
  public host: string;

  @IsNumber({}, { message: MongoDBEnvValidationMessage.DB_PORT_REQUIRED })
  @Min(MongoDBPort.MIN)
  @Max(MongoDBPort.MAX)
  @IsOptional()
  public port: number = MongoDBPort.DEFAULT;

  @IsString({ message: MongoDBEnvValidationMessage.DB_USER_REQUIRED })
  public user: string;

  @IsString({ message: MongoDBEnvValidationMessage.DB_PASSWORD_REQUIRED })
  public password: string;

  @IsString({ message: MongoDBEnvValidationMessage.DB_BASE_AUTH_REQUIRED })
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
