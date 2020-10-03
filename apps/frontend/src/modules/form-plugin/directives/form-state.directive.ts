import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { getValue, Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { UpdateFormValue } from '../form-plugin.actions';

/**
 * TODO Полная копипаста директивы из SPA-2. Удалить директиву когда будем объеденять проекты
 * Директива для синхронизации формы с ngxs
 */
@Directive({
    selector: '[formState]',
})
export class FormStateDirective implements OnInit, OnDestroy {
    constructor(private store: Store, private formGroupDirective: FormGroupDirective, private cdr: ChangeDetectorRef) {}

    @Input('formState')
    public path: string;

    @Input()
    public formStatusPath: string;

    private readonly _destroy$ = new Subject<void>();

    /**
     * Флаг для разруливания бесконечной рекурсии,
     * когда стейт менят форму, а форма меняет стейт
     */
    private _isSuspended = true;

    public ngOnInit(): void {
        if (!this.formGroupDirective) {
            return;
        }
        this.store
            .selectOnce((state) => getValue(state, this.path))
            .subscribe((value) => {
                this.form.patchValue(value, { emitEvent: true });
            });

        // [store] => [form]
        this.store
            .select((state) => getValue(state, this.path))
            .pipe(
                takeUntil(this._destroy$),
                filter(() => !this._isSuspended),
            )
            .subscribe((value) => {
                this.form.patchValue(value);
                this.cdr.markForCheck();
            });

        // [form] => [store]
        this.formGroupDirective.valueChanges.pipe(takeUntil(this._destroy$), debounceTime(10)).subscribe(() => {
            const data = this.formGroupDirective.control.getRawValue();
            this._isSuspended = true;
            const actions: unknown[] = [new UpdateFormValue({ value: data, path: this.path })];
            this.store.dispatch(actions).subscribe({
                error: (err) => {
                    this._isSuspended = false;
                    console.error(err);
                },
                complete: () => {
                    this._isSuspended = false;
                },
            });
        });
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    private get form(): FormGroup {
        return this.formGroupDirective.control;
    }
}
