import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@dvfu-delivery/types';
import { environment } from '../../../environments/environment';

export interface OrderCreateDto extends Pick<Order, 'shop' | 'positions' | 'expiredAt'> {}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(order: OrderCreateDto) {
    return this.httpClient.post<Order>(`${environment.serverBaseUrl}/order`, {
      ...order,
      user: { id: 1 },
    });
  }

  getMyOrders() {
    return this.httpClient.get<Order[]>(`${environment.serverBaseUrl}/order`);
  }
}
