import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { BaseLayoutComponent } from './shared/layouts/base-layout/base-layout.component';
import { EmptyLayoutComponent } from './shared/layouts/empty-layout/empty-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./landing/landing.module').then((m) => m.LandingModule),
      },
    ],
  },
  {
    path: 'auth',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'delivery',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./delivery/delivery.module').then((m) => m.DeliveryModule),
      },
    ],
  },
  {
    path: 'order',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  {
    path: 'profile',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),

      },
    ],

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
