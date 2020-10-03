import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
