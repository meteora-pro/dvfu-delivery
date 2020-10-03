import { Delivery, Order, OrderPosition, OrderStatus, User } from '@dvfu-delivery/types';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryEntity } from './delivery.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity implements Omit<Order, 'totalMaxCost' | 'deliveryMan'> {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty()
  @Column()
  deliveryTo: string;

  @ApiProperty()
  @Column()
  expiredAt: Date;

  @ApiProperty()
  @Column('jsonb')
  positions: OrderPosition[];

  @ApiProperty()
  @Column('enum', {enum: OrderStatus, default: OrderStatus.DRAFT})
  status: OrderStatus;

  @ApiProperty()
  @ManyToOne(type => UserEntity)
  user: User;

  @ApiProperty()
  @ManyToOne(type => DeliveryEntity, {nullable: true})
  delivery?: Delivery;
}
