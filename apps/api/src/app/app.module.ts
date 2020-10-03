import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { AppConfig } from './app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfig) => appConfig.dbConnection,
      inject: [AppConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
