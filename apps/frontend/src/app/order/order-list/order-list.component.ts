import { Component, OnInit } from '@angular/core';
import { LoadMyOrders } from '../store/order.actions';
import { Select, Store } from '@ngxs/store';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';
import { Order } from '@dvfu-delivery/types';
import {UserService} from "../../core/api/user.service";
import {OrderService} from "../../core/api/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dvfu-delivery-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(
    private store: Store,
    private orderService: OrderService,
    private router: Router,
  ) { }

  @Select(OrderState.orders)
  orders$: Observable<Order[]>;

  trackByFn(index, order: Order) {
    return order.id;
  }

  ngOnInit(): void {
    if (!this.orderService.hasOwnOrders) {
      this.router.navigate(['order','create']);
    }
    this.store.dispatch(new LoadMyOrders());
  }

}
