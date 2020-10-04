import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerVersionInfo } from '@dvfu-delivery/types';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { DeliveryService } from './core/api/delivery.service';
import { UserService } from './core/api/user.service';
import { ServerInfoService } from './server-info.service';
import {OrderService} from "./core/api/order.service";

@Component({
  selector: 'dvfu-delivery-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private serverInfoService: ServerInfoService,
    private userService: UserService,
    private deliveryService: DeliveryService,
    private orderService: OrderService,
  ) {}

  title = 'frontend';

  version$: Observable<ServerVersionInfo>;
  ngOnInit(): void {
    this.version$ = this.serverInfoService.getServerInfo();
    this.userService.getMe().pipe(
      tap(currentUser => console.log('currentUser', currentUser)),
      filter( user => !!user ),
      map( user => user.id ),
      distinctUntilChanged(),
      switchMap( userId => {
        this.orderService.getMyOrders().subscribe();
        return this.deliveryService.getMyDeliveries(userId);
      }),
    ).subscribe();

  }
}
