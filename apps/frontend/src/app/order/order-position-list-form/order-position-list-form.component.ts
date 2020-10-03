import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { OrderPosition } from '@dvfu-delivery/types';

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

  constructor(private cdr: ChangeDetectorRef) {}

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
    this.items = [...this.items, {
      title: null,
      maxCost: null,
    }];
    this.emitEvent();
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

  handleChange() {
    this.emitEvent();
  }
}

const isEmpty = (value) => value === null || value === '' || (Array.isArray(value) && !!value.length)
