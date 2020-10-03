import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@dvfu-delivery/types';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeliveryService } from '../../core/api/delivery.service';
import { OrderService } from '../../core/api/order.service';
import { UserService } from '../../core/api/user.service';

@Component({
  selector: 'dvfu-delivery-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.scss']
})
export class OrderDetailContainerComponent implements OnInit {

  order$: Observable<Order>;
  private orderId: number;
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private deliveryService: DeliveryService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.order$ = this.activatedRoute.params.pipe(
      switchMap( params => {
        console.log(params);
        this.orderId = params.id;
        return this.orderService.getOrderById(params.id);
      }),
    );
  }

  linkOrder() {}

  unlinkOrder() {}
}
