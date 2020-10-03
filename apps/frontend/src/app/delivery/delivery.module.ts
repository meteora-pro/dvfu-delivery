import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { RouterModule } from '@angular/router';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { SharedModule } from '../shared/shared.module';

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
            component: CreateDeliveryComponent
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
