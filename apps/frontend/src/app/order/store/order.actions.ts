import { Order, OrderPosition, Shop } from '@dvfu-delivery/types';

export class CreateOrder {
  public static readonly type = '[Order] Create item';
  constructor(public orderPositionList: OrderPosition[], public shop: Shop) { }
}
