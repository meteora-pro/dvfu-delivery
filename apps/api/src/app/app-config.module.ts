import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppConfig } from './app.config';
Logger.log(`.${AppConfig.runtimeEnv}.env`);
const envFile = readFileSync(join('.', 'config', 'api', `.${AppConfig.runtimeEnv}.env`));
Logger.log(`${envFile}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/api/.${AppConfig.runtimeEnv}.env`,
      isGlobal: true,
    }),
  ],
  providers: [AppConfig],
  exports: [AppConfig],
})
export class AppConfigModule {}
