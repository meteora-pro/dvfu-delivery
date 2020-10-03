import { FormStatus } from './types/form-status';

export class UpdateFormValue<T> {
    constructor(public payload: { value: T; path: string }) {}
    public static readonly type = '[Forms] Update Form Value';
}

export class UpdateFormStatuses {
    constructor(public payload: { formStatus: FormStatus; path: string }) {}
    public static readonly type = '[Forms] Update Form statuses';
}
