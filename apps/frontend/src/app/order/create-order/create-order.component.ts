import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrderPosition, Shop } from '@dvfu-delivery/types';
import { Store } from '@ngxs/store';
import { CreateOrder } from '../store/order.actions';

@Component({
  selector: 'dvfu-delivery-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit {

  constructor(private store: Store) { }

  orderPositionList: OrderPosition[] = [{
    title: null,
    maxCost: null,
  }];

  shop: Shop;

  shopList: Shop[] = [{
    id: 1,
    name: 'Три березки',
    address: 'Мегаполи Черниговка',
    description: 'Норм магаз'
  }, {
    id: 2,
    name: 'Три березки 12',
    address: 'Мегаполи Черниговка 12',
    description: 'Норм магаз 2'
  }];

  ngOnInit(): void {
  }

  handleCreateOrder() {
    this.store.dispatch(new CreateOrder(this.orderPositionList, this.shop));
  }
}
