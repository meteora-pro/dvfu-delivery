import { OrderCardComponent } from './order-card/order-card.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  OrderCardComponent
]

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [...sharedComponents]
})
export class ComponentsModule {}
