import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgLetModule } from './directives/ng-let.directive';
import { LayoutsModule } from './layouts/layouts.module';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { OrderStatusTextPipe } from './pipes/order-status-text.pipe';
import { OrderStatusColorPipe } from './pipes/order-status-color.pipe';

const sharedModules = [MaterialModule, LayoutsModule, NgLetModule, ComponentsModule];

@NgModule({
  imports: [CommonModule],
  exports: [...sharedModules, OrderStatusTextPipe, OrderStatusColorPipe],
  declarations: [OrderStatusTextPipe, OrderStatusColorPipe]
})
export class SharedModule {
}
