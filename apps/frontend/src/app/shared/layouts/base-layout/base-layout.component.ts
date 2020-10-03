import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, shareReplay, startWith, tap } from 'rxjs/operators';
import { LayoutSelectors } from '../../../core/store/layout/layout.selectors';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent implements AfterViewInit, OnDestroy {
    constructor(private store: Store, @Inject(DOCUMENT) private document: Document) {}

    @ViewChild(MatSidenavContent) public matSidenavContent: MatSidenavContent;

    @Select(LayoutSelectors.isMobile)
    public isMobile$: Observable<boolean>;

    @Select(LayoutSelectors.isLargeDesktop)
    public isLargeDesktop$: Observable<boolean>;

    public isScrollDownDirection$: Observable<boolean>;

    public fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

    public fillerContent = Array.from(
        { length: 50 },
        () =>
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    );

    private destroy$: Subject<void> = new Subject<void>();

    public ngAfterViewInit(): void {
        this.isScrollDownDirection$ = this.getScrollObservable().pipe(
            pairwise(),
            map(([prev, curr]) => curr > prev && curr > 300),
            startWith(false),
            distinctUntilChanged(),
        );
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getScrollObservable(): Observable<number> {
        const windowScroll$ = fromEvent(window, 'scroll').pipe(
            map((x) => window.scrollY),
            startWith(0),
            distinctUntilChanged(),
            shareReplay(1),
        );
        const sidenavContentScroll$ = this.matSidenavContent
            .elementScrolled()
            .pipe(map(() => this.matSidenavContent.measureScrollOffset('top')));

        return merge(windowScroll$, sidenavContentScroll$).pipe(map((offset) => Math.round(offset)));
    }
}
