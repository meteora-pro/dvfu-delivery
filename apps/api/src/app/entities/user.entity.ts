import { User } from '@dvfu-delivery/types';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity implements User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({nullable: true})
  avatar: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  telegram: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  customerRating?: number;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  deliveryManRating?: number;
}
