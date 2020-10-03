import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent, SignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'sign-in',
            component: SignInComponent,
          },
          {
            path: '**',
            redirectTo: 'sign-in'
          }
        ],
      },
    ]),
  ],
})
export class AuthModule {}
