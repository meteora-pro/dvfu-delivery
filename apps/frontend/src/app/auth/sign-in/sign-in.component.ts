import { Component, OnInit } from '@angular/core';
import { LayoutSelectors } from '../../core/store/layout/layout.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'dvfu-delivery-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor() {}

  @Select(LayoutSelectors.isMobile)
  public isMobile$: Observable<boolean>;

  ngOnInit(): void {}
}
