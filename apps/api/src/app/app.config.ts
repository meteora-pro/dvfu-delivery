import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ConnectionOptions } from 'typeorm';
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
  ) {
  }

  get dbConnection(): TypeOrmModuleOptions {
    const connection = (ormConfig as unknown as ConnectionOptions[]).find(({ name }) => name === "default");
    Logger.verbose(`CONNECT TO ${connection.name} db: ${connection.database}`);
    if (!connection) {
      throw new Error(`Connection not found in ormconfig.js: default`);
    }
    return {
      ...connection,
      // оверайдим entities из ormconfig.js для более быстрого запуска проекта
      entities: [
        UserEntity,
      ],
    };
  }
}
