import { Component, OnInit } from '@angular/core';
import { LoadMyOrders } from '../store/order.actions';
import { Select, Store } from '@ngxs/store';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';
import { Order } from '@dvfu-delivery/types';

@Component({
  selector: 'dvfu-delivery-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(OrderState.orders)
  orders$: Observable<Order[]>;

  trackByFn(index, order: Order) {
    return order.id;
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadMyOrders());
  }

}
