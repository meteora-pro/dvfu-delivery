import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { FormStateDirective } from './form-state.directive';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { UpdateFormValue } from '../form-plugin.actions';

describe('FormStateDirective', () => {
    let formStateDirective: FormStateDirective;
    let store: SpyObj<Store>;
    let cdr: SpyObj<ChangeDetectorRef>;
    let formGroup: SpyObj<FormGroup>;
    let valueChanges: SpyObj<Observable<unknown>>;

    beforeEach(() => {
        store = createSpyObj<Store>(['selectOnce', 'select', 'dispatch']);

        formGroup = createSpyObj(['getRawValue', 'patchValue']);
        valueChanges = createSpyObj(['pipe']);

        const formGroupDirective = ({
            control: formGroup,
            valueChanges,
        } as unknown) as FormGroupDirective;

        cdr = createSpyObj<ChangeDetectorRef>(['markForCheck']);

        formStateDirective = new FormStateDirective(store, formGroupDirective, cdr);

        formStateDirective.contextMapping = { 'common.brand': 'stockCar.brand' };
    });

    it('should create', () => {
        expect(formStateDirective).toBeTruthy();
    });

    it('ngOnInit should exit if forms group is empty', () => {
        formStateDirective = new FormStateDirective(store, undefined, cdr);
        formStateDirective.ngOnInit();
        expect(store.selectOnce).not.toHaveBeenCalled();
    });

    it('ngOnInit should patch form and watch store if group is not empty', () => {
        // formStateDirective
        const mockSelectOnceValue = { stockCar: { brand: 'Some brand' } };
        const expectedMappedObj = { common: { brand: 'Some brand' } };

        const mockAfterChangeGroup = { common: { brand: 'Some brand 2' } };
        const mockSubject = new BehaviorSubject<unknown>(mockSelectOnceValue);

        formGroup.getRawValue.and.returnValue(expectedMappedObj);
        store.selectOnce.and.returnValue(of(mockSelectOnceValue));
        store.select.and.returnValue(mockSubject);

        store.dispatch.and.returnValue(of());

        const mockPipeObs = createSpyObj<Observable<unknown>>(['subscribe']);
        valueChanges.pipe.and.returnValue(mockPipeObs);

        formStateDirective.ngOnInit();

        formStateDirective.path = 'stockCar.brand';
        const selector = (store.select.calls.first().args[0] as unknown) as Function;
        expect(selector(mockSelectOnceValue)).toBe('Some brand');

        formStateDirective.path = 'common.brand';
        const selectOnceSelector = (store.selectOnce.calls.first().args[0] as unknown) as Function;
        expect(selectOnceSelector(mockAfterChangeGroup)).toBe('Some brand 2');

        expect(formGroup.patchValue).toHaveBeenCalledWith(expectedMappedObj, {emitEvent: true});
        expect(cdr.markForCheck).not.toHaveBeenCalled();

        expect(valueChanges.pipe).toHaveBeenCalled();
        expect(mockPipeObs.subscribe).toHaveBeenCalled();
        mockPipeObs.subscribe.calls.first().args[0](undefined);

        expect(store.dispatch).toHaveBeenCalledWith([new UpdateFormValue({
            value: mockSelectOnceValue,
            path: 'common.brand'
        })]);

        mockSubject.next(mockAfterChangeGroup);
        expect(cdr.markForCheck).toHaveBeenCalled();

        const mockError = new Error('mock');
        store.dispatch.and.returnValue(throwError(mockError));
        spyOn(console, 'error');
        mockPipeObs.subscribe.calls.first().args[0](undefined);
        expect(console.error).toHaveBeenCalledWith(mockError);
    });

    it('ngOnDestroy should dispatch SyncStoreToOldFrom and call destroy', () => {
        const mockData = { stockCar: { brand: 'Some brand' } };
        const expectedMappedObj = { common: { brand: 'Some brand' } };
        formGroup.getRawValue.and.returnValue(expectedMappedObj);

        formStateDirective.ngOnDestroy();

    });
});
