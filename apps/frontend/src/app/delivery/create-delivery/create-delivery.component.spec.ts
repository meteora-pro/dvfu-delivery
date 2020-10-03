import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryComponent } from './create-delivery.component';

describe('CreateDeliveryComponent', () => {
  let component: CreateDeliveryComponent;
  let fixture: ComponentFixture<CreateDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
