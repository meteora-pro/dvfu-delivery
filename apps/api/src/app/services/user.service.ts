import { User } from '@dvfu-delivery/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) public repo: Repository<UserEntity>) {
    super(repo);
  }

  public createMockUser(): Omit<User, 'id'> {
     return {
       customerRating: 4 + Math.random(),
       avatar: 'https://cdn.dev.meteora.pro/meteora-dev/Brl7bqld05E.png',
       deliveryManRating: 4 + Math.random(),
       email: 'anyakirova@dvfu.ru',
       telegram: '@anya_kirova',
       description: 'студент 2-го курса ШЕН',
       name: 'Анна Кирова'
     };
  }
}
