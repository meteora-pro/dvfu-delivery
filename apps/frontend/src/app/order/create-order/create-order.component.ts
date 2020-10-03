import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Shop } from '@dvfu-delivery/types';
import { Select, Store } from '@ngxs/store';
import { ChangeMinCostOfDelivery, CreateOrder, RecalculateOrderAppraisal } from '../store/order.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { shopListMock } from '../mock/order-data.mock';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderState } from '../store/order.state';
import { Observable, Subject } from 'rxjs';
import { OrderAppraisal } from '../store/order.model';
import { delay, takeUntil } from 'rxjs/operators';
import { ModalAdditionalMarkupComponent } from '../components/modal-additional-markup/modal-additional-markup.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'dvfu-delivery-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  constructor(private store: Store,
              private snackBar: MatSnackBar,
              private bottomSheet: MatBottomSheet) {
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

  @Select(OrderState.appraisal)
  orderAppraisal$: Observable<OrderAppraisal>;

  private destroy$ = new Subject<void>();

  handleCreateOrder() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Не все поля заполнены корректно', 'OK', {
        duration: 3000,
      });
      return;
    }
    this.store.dispatch(new CreateOrder());
  }

  editAdditionalMarkup({ costOfDelivery, additionalMarkup}: OrderAppraisal) {
    this.bottomSheet.open(ModalAdditionalMarkupComponent, {
      data: {
        minCostOfDelivery: costOfDelivery - (additionalMarkup || 0)
      }
    }).afterDismissed().subscribe((result) => {
      if (result > costOfDelivery) {
        this.store.dispatch(new ChangeMinCostOfDelivery(result));
      }
    });
  }

  ngOnInit(): void {
    this.initAppraisalObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initAppraisalObserver() {
    this.store.select(OrderState.orderPositionList).pipe(
      delay(0),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.store.dispatch(new RecalculateOrderAppraisal());
    });
  }

}
