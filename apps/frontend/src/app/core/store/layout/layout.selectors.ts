import { Selector } from '@ngxs/store';
import { LayoutStateInterface } from './layout-state.interface';
import { LayoutState } from './layout.state';

export class LayoutSelectors {
    @Selector([LayoutState])
    public static isMobile(state: LayoutStateInterface): boolean {
        return state.isMobile;
    }

    @Selector([LayoutState])
    public static isTablet(state: LayoutStateInterface): boolean {
        return state.isTablet;
    }

    @Selector([LayoutState])
    public static isDesktop(state: LayoutStateInterface): boolean {
        return state.isDesktop;
    }

    @Selector([LayoutState])
    public static isLargeDesktop(state: LayoutStateInterface): boolean {
        return state.isLargeDesktop;
    }

    @Selector([LayoutState])
    public static isXLargeDesktop(state: LayoutStateInterface): boolean {
        return state.isXLargeDesktop;
    }
}
