import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgLetModule } from './directives/ng-let.directive';
import { LayoutsModule } from './layouts/layouts.module';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';

const sharedModules = [MaterialModule, LayoutsModule, NgLetModule, ComponentsModule];

@NgModule({
    imports: [CommonModule],
  exports: [...sharedModules]
})
export class SharedModule {}
