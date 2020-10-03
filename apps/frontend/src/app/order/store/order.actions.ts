import { OrderPosition } from '@dvfu-delivery/types';

export class CreateOrder {
  public static readonly type = '[Order] Create item';
  constructor(
    public orderPositionList: OrderPosition[],
    public shopId: number,
    public expiredTimeInMinutes: number,
    public deliveryTo: string
  ) { }
}
