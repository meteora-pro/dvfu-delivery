import { OrderState, OrderStateModel } from './order.state';
import { Selector } from '@ngxs/store';

export class OrderSelectors {

  @Selector([OrderState])
  static getState(state: OrderStateModel): OrderState {
    return state;
  }
}
