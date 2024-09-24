import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
  destroyed = new Subject<void>();
  // currentScreenSize!: Observable<string>;

  private screenSize = new BehaviorSubject<string>('Unknown');

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.getScreenSize();
  }

  getScreenSize(): Observable<string> {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            // this.currentScreenSize = of(
            //   this.displayNameMap.get(query) ?? 'Unknown'
            // );
            this.screenSize.next(this.displayNameMap.get(query) ?? 'Unknown');
          }
        }
      });
    return this.currentScreenSize;
  }

  get currentScreenSize(): Observable<string> {
    return this.screenSize.asObservable();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
