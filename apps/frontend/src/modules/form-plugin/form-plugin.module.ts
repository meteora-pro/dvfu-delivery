import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NGXS_PLUGINS } from '@ngxs/store';
import { FormStateDirective } from './directives/form-state.directive';
import { FormPlugin } from './form-plugin';

@NgModule({
    imports: [
        ReactiveFormsModule,
    ],
    declarations: [
        FormStateDirective,
    ],
    exports: [
        FormStateDirective,
    ],
})
export class FormPluginModule {
    public static forRoot() {
        return {
            ngModule: FormPluginModule,
            providers: [
                {
                    provide: NGXS_PLUGINS,
                    useClass: FormPlugin,
                    multi: true
                }
            ]
        };
    }
}
