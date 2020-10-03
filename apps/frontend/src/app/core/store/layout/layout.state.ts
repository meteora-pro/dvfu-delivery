import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LayoutStateInterface } from './layout-state.interface';
import { ChangeScreen } from './layout.actions';

export const STATE_KEY = 'layout';

type Ctx = StateContext<LayoutStateInterface>;

export const defaultState: LayoutStateInterface = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isXLargeDesktop: false,
};

@State<LayoutStateInterface>({
    name: STATE_KEY,
    defaults: defaultState,
    children: [],
})
@Injectable()
export class LayoutState {
    @Action(ChangeScreen)
    public onChangeScreen(ctx: Ctx, action: ChangeScreen): void {
        ctx.patchState(action.screenState);
    }

}
