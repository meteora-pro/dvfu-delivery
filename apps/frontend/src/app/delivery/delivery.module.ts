import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { RouterModule } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';

@NgModule({
  declarations: [DeliveryComponent, CreateDeliveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DeliveryComponent,
        children: [
          {
            path: 'create',
            component: CreateDeliveryComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: '/create'
      }
    ]),
  ],
})
export class DeliveryModule {}
