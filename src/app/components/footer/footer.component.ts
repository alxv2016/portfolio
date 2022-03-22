import {
  AfterViewInit,
  Component,
  HostBinding,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection, Sitelink} from 'src/app/services/models/content.interface';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import * as moment from 'moment';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';
import {AboutContentComponent} from '../about-content/about-content.component';

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  timeNow: string = '00:00:00';
  @HostBinding('class') class = 'c-footer';
  constructor(
    private contentService: ContentService,
    private bottomPaneService: BottomPaneService,
    private inject: Injector,
    private render: Renderer2
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
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  private sendEmail(email: string, subject: string): void {
    const mailTo = `mailto:${email}?subject=${subject}`;
    window.open(mailTo);
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.hookOnHost(parent.bottomPaneHost.viewContainerRef);
  }

  openBottomPane(link: Sitelink): void {
    switch (true) {
      case link.link_id === 'about':
        console.log('about');
        this.bottomPaneService.createBottomPane(AboutContentComponent, link.link, this.siteContent?.about_content);
        break;
      case link.link_id === 'playground':
        console.log('playground');
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
