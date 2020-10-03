import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';

@ApiTags('order')
@Crud({
  model: {
    type: OrderEntity,
  },
  routes: {
    only: ['getManyBase', 'createOneBase'],
  },
})
@Controller("order")
export class OrderController implements CrudController<OrderEntity> {
  constructor(public service: OrderService) {}
}
