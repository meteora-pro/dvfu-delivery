import { Component, Input } from '@angular/core';
import { Order } from '@dvfu-delivery/types';
import { of } from 'rxjs';

@Component({
  selector: 'delivery-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  @Input() order: Order;

  productPlural = {
    zero: "",
    one: "# товар",
    few: "# товара",
    many: "# товаров",
    other: "# товаров",
  };
  currentUser$ = of(null);



}
