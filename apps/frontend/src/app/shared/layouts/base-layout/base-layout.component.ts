import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { LayoutSelectors } from '../../../core/store/layout/layout.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent implements AfterViewInit, OnDestroy {
  constructor(
    private store: Store,
    @Inject(DOCUMENT) private document: Document,
    private bottomSheet: MatBottomSheet
  ) {}

  @ViewChild(MatSidenavContent) public matSidenavContent: MatSidenavContent;
  @ViewChild('navigationSideNav') public matSidenav: MatSidenav;

  @Select(LayoutSelectors.isMobile)
  public isMobile$: Observable<boolean>;

  @Select(LayoutSelectors.isLargeDesktop)
  public isLargeDesktop$: Observable<boolean>;

  public isScrollDownDirection$: Observable<boolean>;

  private destroy$: Subject<void> = new Subject<void>();

  public ngAfterViewInit(): void {
    this.isScrollDownDirection$ = this.getScrollObservable().pipe(
      pairwise(),
      map(([prev, curr]) => curr > prev && curr > 300),
      startWith(false),
      distinctUntilChanged()
    );
    this.isMobile$
      .pipe(
        filter((v) => !!v),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => this.matSidenav.close());
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
      shareReplay(1)
    );
    const sidenavContentScroll$ = this.matSidenavContent
      .elementScrolled()
      .pipe(map(() => this.matSidenavContent.measureScrollOffset('top')));

    return merge(windowScroll$, sidenavContentScroll$).pipe(
      map((offset) => Math.round(offset))
    );
  }

  public openNotifications() {
    this.bottomSheet.open(NotificationsComponent)
  }
}
