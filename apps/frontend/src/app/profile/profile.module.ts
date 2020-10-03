import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ProfileComponent,
    } ]),
  ]
})
export class ProfileModule { }
