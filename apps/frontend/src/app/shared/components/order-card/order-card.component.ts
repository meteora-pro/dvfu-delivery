import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@dvfu-delivery/types';

@Component({
  selector: 'delivery-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  constructor() {}

  @Input() public order: Order;

  ngOnInit(): void {}
}
