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
import {Observable} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  host: {class: 'c-clock'},
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
  siteContent$?: Observable<AlxvCollection | null>;
  startClock: any;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  @ViewChildren('colon', {read: ElementRef}) colon!: QueryList<ElementRef>;
  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef, private contentService: ContentService) {
    this.initGSAP = this.initGSAP.bind(this);
    this.initClock = this.initClock.bind(this);
  }

  ngOnInit(): void {
    const humanDate = moment();
    this.todaysDate = humanDate.format('dddd, MMMM DD YYYY');
    this.siteContent$ = this.contentService.getSiteState();
  }

  private initClock(): void {
    this.startClock = null;
    const now = moment();
    this.seconds = now.format('ss');
    this.minutes = now.format('mm');
    this.hours = now.format('hh');
    this.meridian = now.format('A');
    const time = Math.floor(Number(this.seconds)) * 10;
    let sec = time % 30;
    this.initGSAP(sec);
    this.start();
    this.cd.detectChanges();
  }

  private start(): void {
    // Runs request animation frame
    if (!this.startClock) {
      this.startClock = requestAnimationFrame(this.initClock);
    }
  }

  private stop(): void {
    // Stops request animation frame
    if (this.startClock) {
      cancelAnimationFrame(this.startClock);
      this.startClock = null;
    }
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
    this.stop();
  }
}
