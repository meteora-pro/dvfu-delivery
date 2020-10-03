import { Component, OnInit } from '@angular/core';
import { OrderPosition } from '@dvfu-delivery/types';

@Component({
  selector: 'order-check-list',
  templateUrl: './order-check-list.component.html',
  styleUrls: ['./order-check-list.component.scss']
})
export class OrderCheckListComponent implements OnInit {

  constructor() { }

  orderPositionList: OrderPosition[] = [{
    title: 'тест1',
    maxCost: 1234
  }, {
    title: 'тест2',
    maxCost: 234
  }, {
    title: 'тест3',
    maxCost: 2550
  }];

  ngOnInit(): void {
  }

}
