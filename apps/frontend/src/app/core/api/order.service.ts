import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LinkDeliveryBody, Order, OrderStatus} from '@dvfu-delivery/types';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import {shopListMock} from "../../order/mock/order-data.mock";

export interface OrderCreateDto extends Pick<Order, 'shop' | 'positions' | 'expiredAt' | 'deliveryTo'> {}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) { }

  orderCache = new Map<number, Order>();
  hasOwnOrders = false;
  createOrder(order: OrderCreateDto) {
    const foundedShop = [...shopListMock].find( shop => shop.id === order?.shop?.id );

    if (foundedShop) {
      order.shop = {...foundedShop};
    }
    return this.httpClient.post<Order>(`${environment.serverBaseUrl}/order`, {
      ...order,
      user: {id: this.userService.currentUser$.value?.id},
      staus: OrderStatus.WAITING_DELIVERYMAN
    } as unknown as Order).pipe(
      tap( () => this.hasOwnOrders = true )
    );
  }

  getMyOrders() {
    const userId = this.userService.currentUser$.value?.id || 1;
    return this.httpClient.get<Order[]>(`${environment.serverBaseUrl}/order?filter=user.id||$eq||${userId}&sort=id,DESC`).pipe(
      tap( orders => {
        if (orders.length) {
          this.hasOwnOrders = true;
        }
      })
    );
  }

  getOrderById(id: number) {
    if (this.orderCache.has(id)) {
      return of(this.orderCache.get(id));
    }
    return this.httpClient.get<Order>(`${environment.serverBaseUrl}/order/${id}`).pipe(
      map(calculateOrderFields),
    );
  }

  getAvailableOrders() {
    return this.httpClient.get<Order[]>(`${environment.serverBaseUrl}/order?sort=id,DESC&&filter=delivery.id||$isnull&&join=delivery`).pipe(
      map( orders => orders
        .filter( order => order.positions.length > 0)
        .map( calculateOrderFields ).map( order => {
          this.orderCache.set(order.id, order);
          return order;
        }))
    );
  }

  linkOrderToDelivery(body: LinkDeliveryBody) {
    return this.httpClient.post(`${environment.serverBaseUrl}/order/delivery`, body).pipe(tap( order => {
      console.log(order);
    }));
  }
}

function calculateOrderFields(order: Order): Order {
  order.totalMaxCost = order.positions.reduce((sum, position) => sum + position.maxCost, 0);
  order.deliverymanBenefit = 100 + Math.round(order.totalMaxCost * 0.03);
  return order;
}
