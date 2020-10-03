import { OrderCardComponent } from './order-card/order-card.component';
import { NgModule } from '@angular/core';

const sharedComponents = [
  OrderCardComponent
]

@NgModule({
  declarations: [...sharedComponents],
  exports: [...sharedComponents]
})
export class ComponentsModule {}
