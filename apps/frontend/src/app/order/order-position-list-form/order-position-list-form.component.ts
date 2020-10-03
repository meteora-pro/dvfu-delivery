import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { OrderPosition } from '@dvfu-delivery/types';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalOrderPositionFormComponent } from '../modal-order-position-form/modal-order-position-form.component';

@Component({
  selector: 'order-position-list-form',
  templateUrl: './order-position-list-form.component.html',
  styleUrls: ['./order-position-list-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderPositionListFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrderPositionListFormComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPositionListFormComponent implements ControlValueAccessor, Validator {

  constructor(private cdr: ChangeDetectorRef,
              private bottomSheet: MatBottomSheet) {}

  items: OrderPosition[] = [];

  private onChange: Function;
  private onTouched: Function;

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(values: OrderPosition[]): void {
    this.items = values;
    this.cdr.markForCheck();
  }

  emitEvent() {
    this.onChange(this.items);
  }

  add() {
    this.bottomSheet.open(ModalOrderPositionFormComponent, {
      data: { orderPosition: {
          title: null,
          maxCost: null,
        }, isNew: true },
    }).afterDismissed().subscribe((result) => {
      if (result) {
        this.items = [result, ...this.items];
        this.emitEvent();
        this.cdr.detectChanges();
      }
    });
  }

  removeByIndex(index) {
    this.items = this.items.filter((item, i) => i !== index);
    this.emitEvent();
  }

  validate(control): ValidationErrors | null {
    const invalid = this.items.some((item) => isEmpty(item.title) || isEmpty(item.maxCost));
    if (invalid) {
      return {
        required: 'Наименование товара и цены обязательны для заполнения'
      }
    }
    return null;
  }

  edit(item: OrderPosition, index: number) {
    this.bottomSheet.open(ModalOrderPositionFormComponent, {
      data: { orderPosition: item, isNew: false },
    }).afterDismissed().subscribe((result) => {
      if (result) {
        this.items = this.items.map((el, i) => {
          if (i === index) {
            return result;
          }
          return el;
        });
        this.emitEvent();
        this.cdr.detectChanges();
      }
    });
  }
}

const isEmpty = (value) => value === null || value === '' || (Array.isArray(value) && !!value.length)
