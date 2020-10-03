import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@dvfu-delivery/types';
import { of } from 'rxjs';

@Component({
  selector: 'delivery-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: Order;

  productPlural = {
    zero: "",
    one: "# товар",
    few: "# товара",
    many: "# товаров",
    other: "# товаров",
  };
  currentUser$ = of(null);

  constructor() { }

  ngOnInit(): void {
  }

}
