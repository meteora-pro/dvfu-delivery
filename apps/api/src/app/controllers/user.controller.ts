import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('user')
@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: ['getOneBase', 'createOneBase'],
  },
})
@Controller("users")
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  @Post('/me')
  async postMe(@Body() body: { userId?: string }) {
    if (typeof body.userId === 'number' && !Number.isNaN(body.userId)) {
      const foundUser = await this.service.repo.findOne(body.userId);
      if (!foundUser) {

      }
    }

  }

  calculateRatings() {}


}
