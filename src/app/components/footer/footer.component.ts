import {
  AfterViewInit,
  Component,
  HostBinding,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {TesterComponent} from '../tester/tester.component';
import * as moment from 'moment';
import {AestheticClockComponent} from '../aesthetic-clock/aesthetic-clock.component';

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
    private inject: Injector
  ) {
    this.initClock = this.initClock.bind(this);
  }

  private initClock() {
    const now = moment();
    const seconds = now.format('ss');
    const minutes = now.format('mm');
    const hours = now.format('h');
    const meridian = now.format('a');
    this.timeNow = `${hours}:${minutes}:${seconds} ${meridian}`;
    requestAnimationFrame(this.initClock);
  }

  ngOnInit(): void {
    this.initClock();
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.hookOnHost(parent.bottomPaneHost.viewContainerRef);
  }

  openBottomPane(): void {
    this.bottomPaneService.createBottomPane(TesterComponent);
  }

  openClock(): void {
    this.bottomPaneService.createBottomPane(AestheticClockComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
