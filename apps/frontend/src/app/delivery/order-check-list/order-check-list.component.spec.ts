import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckListComponent } from './order-check-list.component';

describe('OrderCheckListComponent', () => {
  let component: OrderCheckListComponent;
  let fixture: ComponentFixture<OrderCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
