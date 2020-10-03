import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutSelectors } from '../core/store/layout/layout.selectors';

@Component({
  selector: 'dvfu-delivery-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  @Select(LayoutSelectors.isMobile)
  public isMobile$: Observable<boolean>;

  ngOnInit(): void {
  }

  public fakeArray  = [...Array(100).keys()];

}
