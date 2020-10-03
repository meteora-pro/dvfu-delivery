import { OrderCardComponent } from './order-card/order-card.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {MatListModule} from '@angular/material/list';
import { RatingComponent } from './rating/rating.component';
const sharedComponents = [
  OrderCardComponent,
  OrderDetailComponent
];

@NgModule({
  declarations: [...sharedComponents, RatingComponent],
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
    exports: [ ...sharedComponents, RatingComponent ],
})
export class ComponentsModule {}
