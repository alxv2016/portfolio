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
import {Subject} from 'rxjs';

@Component({
  selector: 'c-clock',
  templateUrl: './aesthetic-clock.component.html',
  styleUrls: ['./aesthetic-clock.component.scss'],
})
export class AestheticClockComponent implements OnInit, AfterViewInit {
  seconds?: string | null;
  minutes?: string | null;
  hours?: string | null;
  todaysDate?: string | null;
  meridian?: string | null;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  @ViewChildren('colon', {read: ElementRef}) colon!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {
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
  }

  private initGSAP(): void {
    const colons = this.colon.map((c) => c.nativeElement);
    const digits = this.digit.map((d) => d.nativeElement);
    const clockTL = gsap.timeline({
      repeat: -1,
    });

    clockTL
      .fromTo(
        digits,
        {
          yPercent: -20,
        },
        {
          yPercent: 20,
          stagger: {
            each: 0.25,
            from: 'end',
          },
          duration: 2,
        }
      )
      .to(
        digits,
        {
          yPercent: -20,
          stagger: {
            each: 0.25,
            from: 'end',
          },
          duration: 2,
        },
        1.55
      );
    // .to(colons, {
    //   xPercent: Math.floor(Math.cos(count) * 80),
    //   yPercent: Math.floor(Math.sin(count) * 80) * -1,
    //   ease: 'back',
    //   stagger: 0.125,
    // });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGSAP();
      requestAnimationFrame(this.initClock);
    });
  }
}
