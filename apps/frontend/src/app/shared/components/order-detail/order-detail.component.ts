import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@dvfu-delivery/types';

@Component({
  selector: 'delivery-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() order: Order;

}
