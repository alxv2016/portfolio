import {
  AfterViewInit,
  Component,
  HostBinding,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {filter, Subject, takeUntil} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {AlxvCollection, Sitelink} from 'src/app/services/models/content.interface';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import * as moment from 'moment';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {AboutContentComponent} from '../about-content/about-content.component';
import {RevealService} from '../reveal/reveal.service';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  timeNow: string = '00:00:00';
  @Input() siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-footer';
  constructor(
    private bottomPaneService: BottomPaneService,
    private revealService: RevealService,
    private inject: Injector,
    private render: Renderer2,
    private router: Router,
    private zone: NgZone
  ) {
    this.initClock = this.initClock.bind(this);
  }

  private initClock() {
    const now = moment();
    // const seconds = now.format('ss');
    const minutes = now.format('mm');
    const hours = now.format('h');
    const meridian = now.format('A');
    this.timeNow = `${hours}:${minutes} ${meridian}`;
    requestAnimationFrame(this.initClock);
  }

  ngOnInit(): void {
    this.initClock();
  }

  private sendEmail(email: string, subject: string): void {
    const mailTo = `mailto:${email}?subject=${subject}`;
    window.open(mailTo);
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.getBottomPaneHost(parent.bottomPaneHost.viewContainerRef);
    this.revealService.getRevealHost(parent.revealHost.viewContainerRef);
    // console.log(this.router.isActiveMatchOptions());
    this.router.events.pipe(filter((e) => e instanceof RouterEvent)).subscribe((e) => console.log(e));
  }

  openBottomPane(link: Sitelink): void {
    switch (true) {
      case link.link_id === 'approach':
        // this.bottomPaneService.createBottomPane(AboutContentComponent, link.link, this.siteContent?.about_content);
        this.revealService.createReveal(false);
        this.revealService
          .getAnimationState()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((state) => {
            this.zone.run(() => {
              if (state) {
                this.router.navigate(['approach']);
              }
            });
          });
        break;
      case link.link_id === 'playground':
        // console.log('playground');
        break;
      case link.link_id === 'contact':
        console.log('contact');
        this.sendEmail('avong2011@gmail.com', 'Hello');
        break;
      default:
        break;
    }
  }

  openClock(): void {
    this.bottomPaneService.createBottomPane(AestheticClockComponent, null, this.siteContent?.time_quote);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
