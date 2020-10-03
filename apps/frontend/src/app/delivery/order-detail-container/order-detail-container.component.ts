import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@dvfu-delivery/types';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from '../../core/api/order.service';

@Component({
  selector: 'dvfu-delivery-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.scss']
})
export class OrderDetailContainerComponent implements OnInit {

  order$: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.order$ = this.activatedRoute.params.pipe(
      switchMap( params => {
        console.log(params);
        return this.orderService.getOrderById(params.id);
      }),
    );
  }

}
