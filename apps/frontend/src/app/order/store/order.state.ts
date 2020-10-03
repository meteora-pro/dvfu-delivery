import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateOrder } from './order.actions';
import { Injectable } from '@angular/core';
import { OrderService } from '../../core/api/order.service';
import { OrderPosition, Shop } from '@dvfu-delivery/types';

export interface OrderStateModel {
  items: string[];
  data: {
    deliveryTo: string,
    shopId: number,
    expiredTime: number,
    orderPositionList: OrderPosition[],
  },
}

type Ctx = StateContext<OrderStateModel>;

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    items: [],
    data: {
      deliveryTo: 'Кампус ДВФУ',
      shopId: 1,
      expiredTime: 15,
      orderPositionList: [],
    }
  }
})
@Injectable()
export class OrderState {

  constructor(private orderService: OrderService) {
  }

  @Selector()
  static isEmptyOrderPosition(state: OrderStateModel): boolean {
    const list = state.data.orderPositionList;
    if (!Array.isArray(list)) {
      return false;
    }
    console.log('[list]', list)
    return !!list.length;
  }

  @Action(CreateOrder)
  public createOrder(ctx: Ctx ) {
    const { data } = ctx.getState();

    this.orderService.createOrder({
      shop: { id: data.shopId } as Shop,
      positions: data.orderPositionList,
      expiredAt: new Date(Date.now() + minutesToMilliseconds(data.expiredTime)),
      deliveryTo: data.deliveryTo
    }).subscribe(() => {
    });
  }
}

function minutesToMilliseconds(minutes: number) {
  return minutes * 60 * 1000;
}
