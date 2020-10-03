import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
}
