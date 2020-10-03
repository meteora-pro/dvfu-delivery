import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { RouterModule } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { SharedModule } from '../shared/shared.module';
import { OrderCheckListComponent } from './order-check-list/order-check-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [DeliveryComponent, CreateDeliveryComponent, OrderDetailComponent, OrderCheckListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DeliveryComponent,
        children: [
          {
            path: 'create',
            component: CreateDeliveryComponent
          },
          {
            path: 'detail/:id',
            component: OrderDetailComponent
          },
          {
            path: 'order-check-list/:id',
            component: OrderCheckListComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: '/create'
      }
    ]),
    SharedModule
  ]
})
export class DeliveryModule {}
