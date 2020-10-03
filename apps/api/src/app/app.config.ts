import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as packageJson from '../../package.json';
@Injectable()
export class AppConfig {
  static runtimeEnv = process.env.NODE_ENV || 'development';
  static release = packageJson.version as string;
  static debug = AppConfig.runtimeEnv === 'development';
  constructor(
    private configService: ConfigService,
  ) {
  }
}
