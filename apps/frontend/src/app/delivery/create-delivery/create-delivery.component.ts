import { Component, OnInit } from '@angular/core';
import { Order, OrderPosition, OrderPositionStatus, OrderStatus, Shop, User } from '@dvfu-delivery/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderService } from '../../core/api/order.service';

@Component({
  selector: 'dvfu-delivery-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.scss'],
})
export class CreateDeliveryComponent implements OnInit {

  public orders$: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAvailableOrders();
  }

  mockUser: User = {
    avatar: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    customerRating: 4.5,
    deliveryManRating: 3.8,
    id: 1,
    name: 'Вася пупкин',
    email: 'vasya@pupkin.pro',
    telegram: '@vasya_pupkin',
  };

  mockPositions: OrderPosition[] = [
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
    name: 'Самбери',
    description: 'Лучший в мире магазин с дошираком и майонезом на розлив',
    address: 'ул. Пушкина, д. Колотушкина'
  }

  public orders: Order[] = [
    {
      id: 1,
      user: this.mockUser,
      positions: this.mockPositions.slice(-2),
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'Центральный вход',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 100,
      deliveryMan: null,
    },
    {
      id: 2,
      user: this.mockUser,
      positions: this.mockPositions.slice(-1),
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'Корпус А',
      status: OrderStatus.WAITING_DELIVERYMAN,
      totalMaxCost: 1000,
      deliverymanBenefit: 123,
      deliveryMan: null,
    },
    {
      id: 3,
      user: this.mockUser,
      positions: [...this.mockPositions, ...this.mockPositions, ...this.mockPositions, ...this.mockPositions],
      shop: this.mockShop,
      createAt: new Date(Date.now()),
      expiredAt: new Date(Date.now()),
      deliveryTo: 'Южные ворота',
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
      deliveryTo: 'Корпус В',
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
