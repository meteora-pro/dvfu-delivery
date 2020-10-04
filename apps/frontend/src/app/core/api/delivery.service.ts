import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery, Order } from '@dvfu-delivery/types';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {

  $deliveries = new BehaviorSubject<Delivery[]>([]);

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getMyDeliveries(userId) {
    return this.httpClient.get<Delivery[]>(`${environment.serverBaseUrl}/delivery?filter=deliveryman.id||$eq||${userId}`).pipe(
      tap( deliveries => {
        if (deliveries.length > 0) {
          this.$deliveries.next(deliveries);
        }
      }),
    );
  }

  createDelivery(userId) {
    return this.httpClient.post<Delivery>(`${environment.serverBaseUrl}/delivery`, {
      deliveryman: { id: userId },
    }).pipe(
      tap( delivery => this.$deliveries.next([...this.$deliveries.value, delivery])),
    );
  }
}
