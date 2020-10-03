import { Delivery, DeliveryStatus, Order, User } from '@dvfu-delivery/types';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'deliveries'
})
export class DeliveryEntity implements Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity )
  deliveryman: User;

  @OneToMany(type => OrderEntity, order => order.delivery )
  orders: Order[];

  @Column('enum',{enum: DeliveryStatus, default: DeliveryStatus.OPENED })
  status: DeliveryStatus;
}
