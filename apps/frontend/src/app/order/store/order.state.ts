import { State, Action, StateContext } from '@ngxs/store';
import { CreateOrder } from './order.actions';
import { Injectable } from '@angular/core';
import { OrderService } from '../../core/api/order.service';
import { Shop } from '@dvfu-delivery/types';

export interface OrderStateModel {
  items: string[];
}

type Ctx = StateContext<OrderStateModel>;

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    items: []
  }
})
@Injectable()
export class OrderState {

  constructor(private orderService: OrderService) {

  }

  @Action(CreateOrder)
  public createOrder(ctx: Ctx, { orderPositionList, shopId, expiredTimeInMinutes, deliveryTo }: CreateOrder) {
    this.orderService.createOrder({
      shop: { id: shopId } as Shop,
      positions: orderPositionList,
      expiredAt: new Date(Date.now() + minutesToMilliseconds(expiredTimeInMinutes)),
      deliveryTo
    }).subscribe(() => {
    });
  }
}

function minutesToMilliseconds(minutes: number) {
  return minutes * 60 * 1000;
}
