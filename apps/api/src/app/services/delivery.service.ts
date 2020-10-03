import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';

@Injectable()
export class DeliveryService extends TypeOrmCrudService<DeliveryEntity> {
  constructor(@InjectRepository(DeliveryEntity) public repo: Repository<DeliveryEntity>) {
    super(repo);
  }
}
