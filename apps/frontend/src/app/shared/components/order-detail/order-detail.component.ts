import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '@dvfu-delivery/types';
import { of } from 'rxjs';

@Component({
  selector: 'delivery-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  @Input() order: Order;

  @Output() orderAdded = new EventEmitter<void>();
  @Output() orderCanceled = new EventEmitter<void>();

  productPlural = {
    zero: "",
    one: "# товар",
    few: "# товара",
    many: "# товаров",
    other: "# товаров",
  };
  currentUser$ = of(null);


  addOrder() {
    this.orderAdded.emit();
  }

  cancelOrder() {
    this.orderCanceled.emit();
  }
}
