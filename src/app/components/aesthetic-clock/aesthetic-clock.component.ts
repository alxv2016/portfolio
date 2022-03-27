import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import * as moment from 'moment';

@Component({
  selector: 'c-clock',
  templateUrl: './aesthetic-clock.component.html',
  styleUrls: ['./aesthetic-clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AestheticClockComponent implements OnInit, AfterViewInit, OnDestroy {
  seconds?: string | null;
  minutes?: string | null;
  hours?: string | null;
  todaysDate?: string | null;
  meridian?: string | null;
  test: any;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  @ViewChildren('colon', {read: ElementRef}) colon!: QueryList<ElementRef>;
  @Input() data: any;
  @HostBinding('class') class = 'c-clock';
  constructor(private ngZone: NgZone, private changeRef: ChangeDetectorRef) {
    this.initGSAP = this.initGSAP.bind(this);
    this.initClock = this.initClock.bind(this);
  }

  ngOnInit(): void {
    const humanDate = moment();
    this.todaysDate = humanDate.format('dddd, MMMM DD YYYY');
  }

  private initClock(): void {
    const now = moment();
    this.seconds = now.format('ss');
    this.minutes = now.format('mm');
    this.hours = now.format('hh');
    this.meridian = now.format('A');
    const time = Math.floor(Number(this.seconds)) * 10;
    let sec = time % 30;
    this.initGSAP(sec);
    requestAnimationFrame(this.initClock);
    this.changeRef.detectChanges();
  }

  private initGSAP(time: number): void {
    const colons = this.colon.map((c) => c.nativeElement);
    gsap.to(colons, {
      xPercent: Math.floor(Math.cos(time) * 100),
      yPercent: Math.floor(Math.sin(time) * 100) * -1,
      ease: 'back',
      stagger: 0.125,
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.initClock());
  }

  ngOnDestroy(): void {
    // cancelAnimationFrame(this.test);
  }
}
