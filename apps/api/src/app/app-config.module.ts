import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';

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
