import { Delivery, DeliveryStatus, Order, User } from '@dvfu-delivery/types';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'deliveries'
})
export class DeliveryEntity implements Delivery {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(type => UserEntity )
  deliveryman: User;

  @ApiProperty()
  @OneToMany(type => OrderEntity, order => order.delivery )
  orders: Order[];

  @ApiProperty()
  @Column('enum',{enum: DeliveryStatus, default: DeliveryStatus.OPENED })
  status: DeliveryStatus;
}
