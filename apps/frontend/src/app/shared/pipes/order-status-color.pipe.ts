import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '@dvfu-delivery/types';

@Pipe({
  name: 'orderStatusColor'
})
export class OrderStatusColorPipe implements PipeTransform {

  transform(status: OrderStatus): string {
    return orderObj[status] || '';
  }

}

const orderObj = {
  DRAFT: 'gray',
  WAITING_DELIVERYMAN: 'warning',
  ACCEPTED_BY_DELIVERYMAN: 'ACCEPTED_BY_DELIVERYMAN',
  IN_PROGRESS: 'IN_PROGRESS',
  COLLECTED: 'COLLECTED',
  READY_TO_TRANSFER: 'READY_TO_TRANSFER',
  CANCELED: 'CANCELED',
  DISPUTE: 'DISPUTE',
  CLOSED: 'CLOSED',
};
