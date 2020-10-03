import { LinkDeliveryBody } from '@dvfu-delivery/types';
import { Body, ConflictException, Controller, ForbiddenException, Get, NotFoundException, Post } from '@nestjs/common';
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
    only: ['getManyBase', 'createOneBase', 'getOneBase'],
  },
  query: {
    join: {
      user: {
        eager: true,
        allow: [ 'id', 'customerRating' ],
      }
    }
  }
})
@Controller("order")
export class OrderController implements CrudController<OrderEntity> {
  constructor(public service: OrderService) {}

  @Post('/delivery')
  async getAvailableOrders(@Body() body: LinkDeliveryBody) {
    const userId = body.userId;
    const foundOrder = await this.service.repo.findOne(body.orderId, { relations: ['delivery', 'delivery.deliveryman']});
    if (!foundOrder) {
      throw new NotFoundException();
    }
    if (foundOrder.delivery && body.deliveryId !== null) {
      throw new ConflictException();
    }
    if (body.deliveryId === null && foundOrder?.delivery?.deliveryman?.id !== userId) {
      throw new ForbiddenException();
    }
    return await this.service.repo.save({...foundOrder, delivery: { id: body.deliveryId}});
  }
}
