export class ChangeScreen {
    constructor(public screenState: { [p: string]: boolean }) {}
    public static type: string = '[Layout] Change Screen';
}
