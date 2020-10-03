import {
  Directive,
  Input, NgModule,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export class NgLetContext {
  // tslint:disable-next-line:no-any
  public $implicit: any = null;
  // tslint:disable-next-line:no-any
  public ngLet: any = null;
}

@Directive({
  selector: '[ngLet]',
})
export class NgLetDirective implements OnInit {

  @Input()
  // tslint:disable-next-line:no-any
  public set ngLet(value: any) {
    this._context.$implicit = this._context.ngLet = value;
  }

  constructor(
    private _vcr: ViewContainerRef,
    private _templateRef: TemplateRef<NgLetContext>
  ) {}
  private _context = new NgLetContext();

  public ngOnInit() {
    this._vcr.createEmbeddedView(this._templateRef, this._context);
  }
}

@NgModule({
  declarations: [NgLetDirective],
  exports: [NgLetDirective],
})
export class NgLetModule {}
