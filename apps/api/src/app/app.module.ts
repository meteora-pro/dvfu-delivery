import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config.module';
import { AppConfig } from './app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { UserController } from './controllers/user.controller';
import { DeliveryEntity } from './entities/delivery.entity';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from './entities/user.entity';
import { DeliveryService } from './services/delivery.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfig) => appConfig.dbConnection,
      inject: [AppConfig],
    }),
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      DeliveryEntity,
    ]),
  ],
  controllers: [
    AppController,
    OrderController,
    UserController,
  ],
  providers: [
    AppService,
    OrderService,
    UserService,
    DeliveryService,
  ],
})
export class AppModule {}
