import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Shop } from '@dvfu-delivery/types';
import { Select, Store } from '@ngxs/store';
import { CreateOrder } from '../store/order.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { shopListMock } from '../mock/order-data.mock';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'dvfu-delivery-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent {

  constructor(private store: Store,
              private snackBar: MatSnackBar) {
  }

  formGroup = new FormGroup({
    deliveryTo: new FormControl(),
    shopId: new FormControl(),
    expiredTime: new FormControl(),
    orderPositionList: new FormControl()
  });

  shopList: Shop[] = shopListMock;

  @Select(OrderState.isEmptyOrderPosition)
  isEmptyOrderPosition$: Observable<boolean>;

  handleCreateOrder() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Не все поля заполнены корректно', 'OK', {
        duration: 3000,
      });
      return;
    }
    this.store.dispatch(new CreateOrder());
  }
}
