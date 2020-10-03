import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutService } from './services/layout.service';
import { StoreModule } from './store/store.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, StoreModule],
    providers: [LayoutService],
})
export class CoreModule {
    constructor(private layoutService: LayoutService) {
        this.layoutService.init();
    }
}
