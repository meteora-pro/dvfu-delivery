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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ModalOrderPositionFormComponent } from './modal-order-position-form/modal-order-position-form.component';
import { FormPluginModule } from '../../modules/form-plugin/form-plugin.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: OrderComponent,
      children: [
        {
          path: 'create',
          component: CreateOrderComponent,
        },
      ]
    },
      {
        path: '**',
        redirectTo: '/create'
      }
    ]),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxsModule.forFeature([OrderState]),
    MatExpansionModule,
    MatCardModule,
    FormPluginModule,
    MatDividerModule,
  ],
  declarations: [
    OrderComponent, CreateOrderComponent, OrderPositionListFormComponent, ModalOrderPositionFormComponent],
})
export class OrderModule {
}
