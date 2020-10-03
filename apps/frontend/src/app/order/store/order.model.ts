import { OrderPosition } from '@dvfu-delivery/types';

export interface OrderStateModel {
  data: LocalOrderData,
  appraisal?: OrderAppraisal;
}

/**
 * Локальное хранилище заказа, который сейчас создаётся
 */
export interface LocalOrderData {
  deliveryTo: string,
  shopId: number,
  expiredTime: number,
  orderPositionList: OrderPosition[],
}

export interface OrderAppraisal {
  /**
   * Минимальная цена за доставку продуктов
   */
  minMarkup: number;
  percent: number;
  costOfDelivery?: number;
  additionalMarkup?: number;
  orderPositionsCost?: number;
  finalCost?: number;
}
