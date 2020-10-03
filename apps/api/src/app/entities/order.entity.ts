import { Order, OrderPosition, OrderStatus, User } from '@dvfu-delivery/types';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryEntity } from './delivery.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity implements Omit<Order, 'totalMaxCost' | 'deliveryMan'> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  deliveryTo: string;

  @Column()
  expiredAt: Date;

  @Column('jsonb')
  positions: OrderPosition[];

  @Column({enum: OrderStatus, default: OrderStatus.DRAFT})
  status: OrderStatus;

  @ManyToOne(type => UserEntity)
  user: User;

  @ManyToOne(type => DeliveryEntity, {nullable: true})
  delivery?: DeliveryEntity;
}
