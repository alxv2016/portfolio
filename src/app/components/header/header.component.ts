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
import {Router} from '@angular/router';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {RevealService} from '../reveal/reveal.service';
import * as moment from 'moment';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {AppComponent} from 'src/app/app.component';

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
  htmlBody = this.element.nativeElement.parentElement.parentElement;
  @Input() siteContent?: AlxvCollection;
  @ViewChild('darkModeToggle') darkModeToggle!: ElementRef;
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
    private cd: ChangeDetectorRef
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
    this.bottomPaneService.createBottomPane(AestheticClockComponent, null, this.siteContent?.time_quote);
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

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);

    // Run requestAnimationFrame outside angular change detection
    this.zone.runOutsideAngular(() => this.initClock());
    this.darkModeService.darkModeState$.subscribe((darkState) => {
      if (darkState.prefersDark) {
        this.render.addClass(this.htmlBody, 'dark');
        this.render.addClass(this.darkModeToggle.nativeElement, 'toggled');
        this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'true');
      } else {
        this.render.removeClass(this.htmlBody, 'dark');
        this.render.removeClass(this.darkModeToggle.nativeElement, 'toggled');
        this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'false');
      }
      this.cd.markForCheck();
    });
  }
}
