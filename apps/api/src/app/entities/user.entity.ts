import { User } from '@dvfu-delivery/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: true})
  avatar: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  telegram: string;
}
