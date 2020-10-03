import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OrderPosition } from '../../../../../../libs/types/src';

@Component({
  selector: 'modal-order-position-form',
  templateUrl: './modal-order-position-form.component.html',
  styleUrls: ['./modal-order-position-form.component.scss']
})
export class ModalOrderPositionFormComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data,
              private cdr: ChangeDetectorRef,
              private bottomSheetRef: MatBottomSheetRef<ModalOrderPositionFormComponent>) {
    this.isNew = this.data.isNew;
    this.orderPosition = this.data.orderPosition;

  }

  isNew = false;
  orderPosition: OrderPosition;

  handleSave() {
    this.bottomSheetRef.dismiss(this.orderPosition);
  }

  handleClose() {
    this.bottomSheetRef.dismiss();
  }
}
