import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import * as moment from 'moment';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  selector: 'c-clock',
  templateUrl: './aesthetic-clock.component.html',
  styleUrls: ['./aesthetic-clock.component.scss'],
})
export class AestheticClockComponent implements OnInit, AfterViewInit, OnDestroy {
  seconds?: string | null;
  minutes?: string | null;
  hours?: string | null;
  todaysDate?: string | null;
  meridian?: string | null;
  initial = -10;
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  @ViewChildren('colon', {read: ElementRef}) colon!: QueryList<ElementRef>;
  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private ngZone: NgZone,
    private contentService: ContentService
  ) {
    this.initGSAP = this.initGSAP.bind(this);
    this.initClock = this.initClock.bind(this);
  }

  ngOnInit(): void {
    this.render.addClass(this.element.nativeElement, 'c-clock');
    const humanDate = moment();
    this.todaysDate = humanDate.format('dddd, MMMM DD YYYY');
  }

  private initClock(): void {
    const now = moment();
    this.seconds = now.format('ss');
    this.minutes = now.format('mm');
    this.hours = now.format('hh');
    this.meridian = now.format('A');
    requestAnimationFrame(this.initClock);
    const time = Math.floor(Number(this.seconds)) * 10;
    let sec = time % 30;
    this.initGSAP(sec);
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  private initGSAP(time: number): void {
    const colons = this.colon.map((c) => c.nativeElement);
    // const digits = this.digit.map((d) => d.nativeElement);
    gsap.to(colons, {
      xPercent: Math.floor(Math.cos(time) * 100),
      yPercent: Math.floor(Math.sin(time) * 100) * -1,
      ease: 'back',
      stagger: 0.125,
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.initClock);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
