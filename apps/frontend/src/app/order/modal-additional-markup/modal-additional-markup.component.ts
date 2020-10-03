import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'modal-additional-markup',
  templateUrl: './modal-additional-markup.component.html',
  styleUrls: ['./modal-additional-markup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAdditionalMarkupComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data,
              private cdr: ChangeDetectorRef,
              private bottomSheetRef: MatBottomSheetRef<ModalAdditionalMarkupComponent>) {
    this.minCostOfDelivery = data.minCostOfDelivery;
  }

  /**
   * Сумма минимального вознаграждения.
   * Минимальное вознаграждение = свмма всех позиций + 3% + 100р, где 100р - минимальная прибыль
   */
  minCostOfDelivery: number;

  value: number;

  handleSave() {
    this.bottomSheetRef.dismiss(this.value);
  }

  handleClose() {
    this.bottomSheetRef.dismiss(false);
  }
}
