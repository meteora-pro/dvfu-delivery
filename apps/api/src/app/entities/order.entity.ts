import {Delivery, Order, OrderPosition, OrderStatus, Shop, User} from '@dvfu-delivery/types';
import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsDateString, IsObject, IsString} from 'class-validator';
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

  @IsString({ always: true })
  @ApiProperty({ required: true })
  @Column()
  deliveryTo: string;

  @IsDateString({ always: true })
  @ApiProperty({ required: true })
  @Column()
  expiredAt: Date;

  @IsArray({ always: true })
  @ApiProperty({ required: true })
  @Column('jsonb')
  positions: OrderPosition[];

  @IsObject()
  @ApiProperty({ required: true })
  @Column('jsonb', { nullable: true })
  shop: Shop;

  @ApiProperty()
  @Column('enum', {enum: OrderStatus, default: OrderStatus.DRAFT})
  status: OrderStatus;

  @ApiProperty({ required: true })
  @ManyToOne(type => UserEntity)
  user: User;

  @ApiProperty()
  @ManyToOne(type => DeliveryEntity, {nullable: true})
  delivery?: Delivery;
}
