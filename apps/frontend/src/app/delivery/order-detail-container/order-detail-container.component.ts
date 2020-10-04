import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Order } from '@dvfu-delivery/types';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeliveryService } from '../../core/api/delivery.service';
import { OrderService } from '../../core/api/order.service';
import { UserService } from '../../core/api/user.service';
import {MatSnackBar} from "@angular/material/snack-bar";


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
    private snackBar: MatSnackBar,
    private router: Router,
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

  async linkOrder() {
    if (!this.deliveryService.$deliveries.value?.length) {
      await this.deliveryService.createDelivery(this.userService.currentUser$.value?.id).toPromise();
    }
    try {
      const delivery = this.deliveryService.$deliveries.value[0];
      if (!delivery) {
        console.error( new Error('Empty delivery'));
        return;
      }
      const deliveryId = delivery.id;
      const userId = this.userService.currentUser$.value?.id || 1;
      const result = await this.orderService.linkOrderToDelivery({
        userId,
        deliveryId,
        orderId: this.orderId,
      }).toPromise();
      this.snackBar.open('Заказ добавлен к доставке', null, {
        duration: 1500,
      });
    } catch (e) {
      if (e?.error?.statusCode === 409) {
        this.snackBar.open('Упс, кажется, ты не успел, кто то забрал заявку быстрее тебя', 'Понятно', {
          duration: 3000,
        });
      }
      console.error(e);
    }
    this.router.navigate(['delivery', 'create']);
  }

  async unlinkOrder() {}
}
