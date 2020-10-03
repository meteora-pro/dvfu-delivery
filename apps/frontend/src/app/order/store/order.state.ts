import { State, Action, StateContext } from '@ngxs/store';
import { CreateOrder } from './order.actions';
import { Injectable } from '@angular/core';

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

  constructor() {

  }

  @Action(CreateOrder)
  public createOrder(ctx: Ctx, { orderPositionList, shop }: CreateOrder) {
    console.log('[createOrder] TODO')
  }
}
