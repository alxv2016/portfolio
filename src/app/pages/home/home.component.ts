import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {fromEvent, map, Observable, Subject, take, takeUntil, throttleTime} from 'rxjs';
import {HomeCollection} from 'src/app/services/models/home.interface';
import {PrismicService} from 'src/app/services/prismic.service';
import {gsap} from 'gsap';

@Component({
  host: {class: 'c-home'},
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  homeContent$?: Observable<HomeCollection | null>;
  @ViewChild('abstract', {static: true}) abstract!: ElementRef;
  constructor(
    private element: ElementRef,
    private prismic: PrismicService,
    private zone: NgZone,
    private changeRef: ChangeDetectorRef
  ) {}

  private mouseEvent(): Observable<any> {
    return fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(60),
      map((ev) => {
        return {x: ev.clientX, y: ev.clientY};
      })
    );
  }

  private animateAbstract(lines: any, linesAccent: any, pos: any) {
    const bounds = this.abstract.nativeElement.getBoundingClientRect();
    const elPos = {
      x: Math.floor(pos.x - bounds.x),
      y: Math.floor(pos.y - bounds.y),
    };
    const elCenter = {
      x: elPos.x - bounds.width / 2,
      y: elPos.y - bounds.height / 2,
    };
    const hypot = Math.floor(Math.hypot(elCenter.x, elCenter.y)) * 1.25;

    gsap.to(lines, {
      strokeDashoffset: hypot,
      stagger: {
        from: 'end',
        each: 0.025,
      },
      ease: 'power4.out',
    });

    gsap.to(linesAccent, {
      strokeDashoffset: hypot,
      stagger: {
        from: 'end',
        each: 0.03,
      },
      ease: 'power2.out',
    });
  }

  ngOnInit(): void {
    this.homeContent$ = this.prismic.getHomeState();
  }

  private applyLineStrokes() {
    const lines = this.element.nativeElement.querySelectorAll('.orb-lines > path');
    const linesAccent = this.element.nativeElement.querySelectorAll('.orb-lines-accent > path');
    if (lines) {
      gsap.set(lines, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeWidth: (i) => i / 2,
      });
      gsap.set(linesAccent, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeWidth: (i) => i / 2,
      });
    }
    return {
      lines,
      linesAccent,
    };
  }

  ngAfterViewInit(): void {
    const abstract = this.applyLineStrokes();
    // run outside of angular's change detection
    this.zone.runOutsideAngular(() => {
      this.mouseEvent()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((m) => {
          this.animateAbstract(abstract.lines, abstract.linesAccent, m);
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
