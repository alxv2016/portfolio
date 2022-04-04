import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  RouterEvent,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {RevealService} from '../reveal/reveal.service';
import * as moment from 'moment';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {AppComponent} from 'src/app/app.component';
import {distinctUntilChanged, filter, fromEvent, map, Observable, pairwise, share, throttleTime} from 'rxjs';

@Component({
  host: {
    class: 'header',
  },
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  timeNow: string = '00:00:00';
  onBlog = false;
  @ViewChild('cursor') cursor!: ElementRef;
  constructor(
    private zone: NgZone,
    private revealService: RevealService,
    private bottomPaneService: BottomPaneService,
    private inject: Injector,
    private element: ElementRef,
    private render: Renderer2,
    private darkModeService: DarkModeService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.initClock = this.initClock.bind(this);
  }

  private initClock() {
    const now = moment();
    const seconds = now.format('ss');
    const minutes = now.format('mm');
    const hours = now.format('h');
    const meridian = now.format('A');
    this.timeNow = `${hours}:${minutes} ${meridian}`;
    // Only trigger angular change detection here
    requestAnimationFrame(this.initClock);
    this.cd.detectChanges();
  }

  openClock(): void {
    this.bottomPaneService.createBottomPane(AestheticClockComponent);
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  goHome(): void {
    this.revealService.createReveal(true);
    this.revealService.getAnimationState().subscribe((state) => {
      if (state) {
        this.zone.run(() => {
          this.router.navigate(['home']);
        });
      }
    });
  }

  private scrollEvent(): Observable<any> {
    return fromEvent<any>(window, 'scroll').pipe(
      throttleTime(60),
      map(() => window.scrollY),
      pairwise(),
      map(([y1, y2]) => {
        return {
          scrollPos: y1,
          direction: y2 < y1 ? false : true,
        };
      }),
      distinctUntilChanged(),
      share()
    );
  }

  private watchHeader(): void {
    const headerNav = this.element.nativeElement;
    this.scrollEvent()
      .pipe()
      .subscribe((scroll) => {
        if (headerNav) {
          const headerHeight = headerNav.getBoundingClientRect().height;
          if (scroll.scrollPos >= headerHeight) {
            scroll.direction
              ? this.render.setAttribute(headerNav, 'data-state', 'hidden')
              : this.render.removeAttribute(headerNav, 'data-state');
          }
        }
      });
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);
    // Run requestAnimationFrame outside angular change detection
    this.zone.runOutsideAngular(() => {
      this.watchHeader();
      this.initClock();
    });
    this.darkModeService.darkModeState$.subscribe();

    // this.router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     const tree: UrlTree = this.router.parseUrl(e.url);
    //     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    //     const s: UrlSegment[] = g.segments;
    //     if (s[0].path === 'blog') {
    //       console.log('Im in blog');
    //       this.onBlog = true;
    //     } else {
    //       this.onBlog = false;
    //     }
    //   }
    // });
  }
}
