import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { OrderState, OrderStateModel } from './order.state';
import { OrderAction } from './order.actions';

describe('Order store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([OrderState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: OrderStateModel = {
      items: ['item-1']
    };
    store.dispatch(new OrderAction('item-1'));
    const actual = store.selectSnapshot(OrderState.getState);
    expect(actual).toEqual(expected);
  });

});
