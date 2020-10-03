import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgLetModule } from '../directives/ng-let.directive';
import { MaterialModule } from '../material/material.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    declarations: [EmptyLayoutComponent, BaseLayoutComponent, BottomNavbarComponent, NotificationsComponent],
    imports: [CommonModule, MaterialModule, RouterModule, NgLetModule],
    exports: [EmptyLayoutComponent, BaseLayoutComponent],
})
export class LayoutsModule {}
