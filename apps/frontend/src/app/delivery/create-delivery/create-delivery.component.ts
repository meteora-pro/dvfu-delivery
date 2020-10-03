import { Component, OnInit } from '@angular/core';
import { Order, OrderPosition, OrderPositionStatus, OrderStatus, Shop, User } from '@dvfu-delivery/types';

@Component({
  selector: 'dvfu-delivery-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public mockUser: User = {
    avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    customerRating: 4.5,
    deliveryManRating: 3.8,
    id: 1,
    name: 'Вася пупкин',
    email: 'vasya@pupkin.pro',
    telegram: '@vasya_pupkin',
  };

  public mockPositions: OrderPosition[] = [
    {
      title: 'Вкусный чебурек - 1шт',
      maxCost: 500,
      status: OrderPositionStatus.PENDING,
    },
    {
      title: 'Цистерна майонеза - 300л',
      maxCost: 3000,
      status: OrderPositionStatus.PENDING
    },
    {
      title: 'Говяжий дошик',
      maxCost: 50,
      status: OrderPositionStatus.PENDING
    }
  ];

  public mockShop: Shop = {
    id: 1,
    name: 'Магазин у тети Зои',
    description: 'Лучший в мире магазин с дошираком и майонезом на розлив',
    address: 'ул. Пушкина, д. Колотушкина'
  }

  public orders: Order[] = [
    {
      id: 1,
      user: this.mockUser,
      positions: this.mockPositions,
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'До туалета за углом',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 100,
      deliveryMan: null,
    },
    {
      id: 2,
      user: this.mockUser,
      positions: this.mockPositions,
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'В самую страшную подсобку',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 123,
      deliveryMan: null,
    },
    {
      id: 3,
      user: this.mockUser,
      positions: this.mockPositions,
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'К бабушке на деревню',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 200,
      deliveryMan: null,
    },
    {
      id: 4,
      user: this.mockUser,
      positions: this.mockPositions,
      shop: null,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'В деканат',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 500,
      deliveryMan: null,
    },
  ];

  public trackOrders(order: Order) {
    return order.id;
  }
}
