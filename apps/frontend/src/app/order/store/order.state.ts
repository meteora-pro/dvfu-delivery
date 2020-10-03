import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateOrder, RecalculateOrderAppraisal } from './order.actions';
import { Injectable } from '@angular/core';
import { OrderService } from '../../core/api/order.service';
import { OrderPosition, Shop } from '@dvfu-delivery/types';
import { OrderAppraisal, OrderStateModel } from './order.model';
import { defaultOrderPositionsData } from '../mock/order-data.mock';

type Ctx = StateContext<OrderStateModel>;

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    data: defaultOrderPositionsData,
    appraisal: {
      minMarkup: 100,
      percent: 3,
      additionalMarkup: 0,
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
    return !!list.length;
  }

  @Selector()
  static orderPositionList(state: OrderStateModel): OrderPosition[] {
    return state.data.orderPositionList || [];
  }

  @Selector()
  static appraisal(state: OrderStateModel): OrderAppraisal {
    return state.appraisal;
  }

  @Action(CreateOrder)
  public createOrder(ctx: Ctx) {
    const { data } = ctx.getState();
    this.orderService.createOrder({
      shop: { id: data.shopId } as Shop,
      positions: data.orderPositionList,
      expiredAt: new Date(Date.now() + minutesToMilliseconds(data.expiredTime)),
      deliveryTo: data.deliveryTo
    }).subscribe(() => {
    });
  }

  @Action(RecalculateOrderAppraisal)
  public recalculateOrderAppraisal(ctx: Ctx) {
    const { data, appraisal } = ctx.getState();
    const totalOrderCost = data.orderPositionList.reduce((a, b) => a + b.maxCost, 0);
    const costOfDelivery = Math.round(totalOrderCost * 0.03) + appraisal.minMarkup;
    ctx.patchState({
      appraisal: {
        ...appraisal,
        orderPositionsCost: totalOrderCost,
        costOfDelivery,
        finalCost: totalOrderCost + costOfDelivery
      }
    });
  }
}

function minutesToMilliseconds(minutes: number) {
  return minutes * 60 * 1000;
}
