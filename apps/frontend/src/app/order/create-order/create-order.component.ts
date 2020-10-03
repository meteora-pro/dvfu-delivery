import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Shop } from '@dvfu-delivery/types';
import { Store } from '@ngxs/store';
import { CreateOrder } from '../store/order.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { expiredTimeList, shopListMock } from '../mock/order-data.mock';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dvfu-delivery-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit {

  constructor(private store: Store,
              private snackBar: MatSnackBar) { }

  formGroup = new FormGroup({
    deliveryTo: new FormControl('Кампус ДВФУ'),
    shopId: new FormControl(1),
    expiredTime: new FormControl(15),
    orderPositionList: new FormControl([{
      title: null,
      maxCost: null,
    }])
  });

  shopList: Shop[] = shopListMock;

  expiredTimeList = expiredTimeList;

  ngOnInit(): void {
  }

  handleCreateOrder() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Не все поля заполнены корректно', 'OK', {
        duration: 3000,
      });
      return;
    }
    const { orderPositionList, expiredTime, shopId, deliveryTo } = this.formGroup.value;
    this.store.dispatch([
      new CreateOrder(orderPositionList, shopId, expiredTime, deliveryTo)
    ]);
  }
}
