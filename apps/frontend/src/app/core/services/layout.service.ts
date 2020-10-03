import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { isEqual } from 'lodash-es';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import { ChangeScreen } from '../store/layout/layout.actions';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    constructor(private breakpointObserver: BreakpointObserver, private store: Store) {}

    public init(): void {

        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .pipe(map(this.breakpointsMatcher), distinctUntilChanged(isEqual))
            .subscribe((screenState) => this.store.dispatch(new ChangeScreen(screenState)));
    }

    private breakpointsMatcher(state: BreakpointState): { [key: string]: boolean } {
        const xSmall = state.breakpoints[Breakpoints.XSmall];
        const small = state.breakpoints[Breakpoints.Small];
        const medium = state.breakpoints[Breakpoints.Medium];
        const large = state.breakpoints[Breakpoints.Large];
        const xLarge = state.breakpoints[Breakpoints.XLarge];
        const isMobile = xSmall && !small;
        const isTablet = small && !xSmall;
        const isDesktop = medium && !small;
        const isLargeDesktop = large && !medium;
        const isXLargeDesktop = xLarge && !large;
        return { isMobile, isTablet, isDesktop, isLargeDesktop, isXLargeDesktop };
    }
}
