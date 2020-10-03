import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [AuthComponent, SignInComponent],
  imports: [
    CommonModule,
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
