import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { inspect } from 'util';
import * as packageJson from '../../package.json';
import * as ormConfig from '../../../../ormconfig.js';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppConfig {
  static runtimeEnv = process.env.NODE_ENV || 'development';
  static release = packageJson.version as string;
  static debug = AppConfig.runtimeEnv === 'development';
  constructor(
    private configService: ConfigService,
  ) {}

  get dbConnection(): TypeOrmModuleOptions {
    const connection = (ormConfig as unknown as ConnectionOptions[]).find(({ name }) => name === "default") as PostgresConnectionOptions;

    if (!connection) {
      throw new Error(`Connection not found in ormconfig.js: default`);
    }
    const overrideConfig = {
      host: this.configService.get('POSTGRES_HOST') || connection.host,
      port: this.configService.get('POSTGRES_PORT') || connection.port,
      username: this.configService.get('POSTGRES_USERNAME') || connection.username,
      password: this.configService.get('POSTGRES_PASSWORD')  || connection.password,
      database: this.configService.get('DB_NAME')|| connection.database,
    };
    const dbConnection = {
      ...connection,
      ...overrideConfig,
      // оверайдим entities из ormconfig.js для более быстрого запуска проекта
      entities: [
        UserEntity,
      ],
    };

    Logger.verbose(`CONNECT TO ${connection.name} db: ${connection.database} ${inspect(dbConnection)}`);
    return dbConnection;
  }
}
