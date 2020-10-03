import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderPositionListFormComponent } from './order-position-list-form/order-position-list-form.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxsModule } from '@ngxs/store';
import { OrderState } from './store/order.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: OrderComponent,
    }, {
      path: 'create',
      component: CreateOrderComponent,
    }]),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    NgxsModule.forFeature([OrderState])
  ],
  declarations: [OrderComponent, CreateOrderComponent, OrderPositionListFormComponent],
})
export class OrderModule {
}
