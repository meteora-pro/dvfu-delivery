import { Component, OnInit } from '@angular/core';
import { Order, OrderPosition, OrderPositionStatus, OrderStatus, Shop, User } from '@dvfu-delivery/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderService } from '../../core/api/order.service';

@Component({
  selector: 'dvfu-delivery-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {

  public orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAvailableOrders();
  }

  public trackOrders(order: Order) {
    return order.id;
  }
}
