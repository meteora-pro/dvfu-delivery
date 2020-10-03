import { Delivery, DeliveryStatus, Order, User } from '@dvfu-delivery/types';
import { OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

export class DeliveryEntity implements Delivery {
  deliveryman: User;
  id: number;
  @OneToMany(type => OrderEntity, order => order.delivery )
  orders: Order[];
  readonly status: DeliveryStatus;
}
