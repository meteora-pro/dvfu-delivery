import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: ['getOneBase'],
  },
})
@Controller("users")
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
