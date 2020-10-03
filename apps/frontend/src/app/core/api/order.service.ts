import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@dvfu-delivery/types';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface OrderCreateDto extends Pick<Order, 'shop' | 'positions' | 'expiredAt' | 'deliveryTo'> {}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  orderCache = new Map<number, Order>();

  createOrder(order: OrderCreateDto) {
    return this.httpClient.post<Order>(`${environment.serverBaseUrl}/order`, {
      ...order,
      user: { id: 1 },
    });
  }

  getMyOrders() {
    return this.httpClient.get<Order[]>(`${environment.serverBaseUrl}/order?filter=user.id||$eq||1`);
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
    return this.httpClient.get<Order[]>(`${environment.serverBaseUrl}/order`).pipe(
      map( orders => orders
        .filter( order => order.positions.length > 0)
        .map( calculateOrderFields ).map( order => {
          this.orderCache.set(order.id, order);
          return order;
        }))
    );
  }
}

function calculateOrderFields(order: Order): Order {
  order.totalMaxCost = order.positions.reduce((sum, position) => sum + position.maxCost, 0);
  order.deliverymanBenefit = 100 + Math.floor(order.totalMaxCost * 0.03);
  return order;
}
