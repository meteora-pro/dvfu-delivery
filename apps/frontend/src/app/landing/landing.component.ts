import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dvfu-delivery-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public fakeArray  = [...Array(100).keys()];

}
