import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryService } from '../services/delivery.service';

@ApiTags('delivery')
@Crud({
  model: {
    type: DeliveryEntity,
  },
  routes: {
    only: ['getManyBase', 'createOneBase'],
  },
  query: {
    join: {
      deliveryman: {
        eager: true,
        allow: [ 'id' ],
      }
    }
  }
})
@Controller("delivery")
export class DeliveryController implements CrudController<DeliveryEntity> {
  constructor(public service: DeliveryService) {}
}
