import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DeliveryComponent,
    }]),
  ]
})
export class DeliveryModule { }
