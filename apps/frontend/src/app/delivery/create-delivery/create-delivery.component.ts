import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '@dvfu-delivery/types';

@Component({
  selector: 'dvfu-delivery-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public orders: Order[] = [
    {
      id: 1,
      user: null,
      positions: [],
      shop: null,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'До туалета за углом',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliveryMan: null,
    },
    {
      id: 2,
      user: null,
      positions: [],
      shop: null,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'В самую страшную подсобку',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliveryMan: null,
    },
    {
      id: 3,
      user: null,
      positions: [],
      shop: null,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'К бабушке на деревню',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliveryMan: null,
    },
    {
      id: 4,
      user: null,
      positions: [],
      shop: null,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'В деканат',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliveryMan: null,
    },
  ];
}
