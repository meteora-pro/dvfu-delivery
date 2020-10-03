import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
  constructor(@InjectRepository(OrderEntity) repo) {
    super(repo);
  }
}
