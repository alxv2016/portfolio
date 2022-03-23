import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {fromEvent, map, Observable, Subject, switchMap, takeUntil, throttleTime} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  mouseMove$!: Observable<any>;
  siteContent?: AlxvCollection;
  eventHandlers: any[] = [];
  @HostBinding('class') class = 'c-home';
  @ViewChild('cursor') cursor!: ElementRef;
  @ViewChild('headline') headline!: ElementRef;
  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private contentService: ContentService,
    private zone: NgZone
  ) {}

  private headlinerHover(cursor: HTMLElement, headliner: HTMLElement): void {
    const mouseEnterEv = this.render.listen(headliner, 'mouseenter', (e) => {
      gsap.to(cursor, {
        scale: 1,
        ease: 'back',
        opacity: 1,
      });
    });

    const mouseLeaveEv = this.render.listen(headliner, 'mouseleave', (e) => {
      gsap.to(cursor, {
        scale: 0.025,
        ease: 'back',
        opacity: 0,
      });
    });

    this.eventHandlers.push(mouseEnterEv, mouseLeaveEv);
  }

  private mouseMove() {
    this.mouseMove$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(60),
      switchMap((ev) => {
        // switchmap to siteContent$ for to capture elements not yet loaded in DOM
        return this.contentService.siteContent$.pipe(
          map((_) => {
            return {x: ev.clientX, y: ev.clientY};
          })
        );
      })
    );
  }

  private animateAbstract(lines: any, linesAccent: any, pos: any) {
    const hypo = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    const angle = Math.atan2(pos.x, pos.y);
    const x = Math.sin(angle) * hypo;
    const y = Math.cos(angle) * hypo;

    gsap.to(lines, {
      strokeDashoffset: x / 2 - y / 2,
      stagger: {
        from: 'end',
        each: 0.025,
      },
      ease: 'power4.out',
    });

    gsap.to(linesAccent, {
      strokeDashoffset: x / 2 - y / 2,
      stagger: {
        from: 'end',
        each: 0.03,
      },
      ease: 'power2.out',
    });
  }

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
    this.zone.runOutsideAngular(() => {
      this.mouseMove();
    });
  }

  ngAfterViewInit(): void {
    console.log('home');
    const cursor = this.cursor.nativeElement;
    const headline = this.headline.nativeElement;
    const lines = this.element.nativeElement.querySelectorAll('.orb-lines > path');
    const linesAccent = this.element.nativeElement.querySelectorAll('.orb-lines-accent > path');
    const boudings = cursor.getBoundingClientRect();
    if (cursor) {
      gsap.set(cursor, {
        scale: 0.025,
      });
    }

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

    this.mouseMove$.pipe(takeUntil(this.unsubscribe$)).subscribe((m) => {
      gsap.to(cursor, {
        x: m.x - boudings.width / 2,
        y: m.y - boudings.height / 2,
        ease: 'ease',
      });

      if (lines && linesAccent) {
        this.animateAbstract(lines, linesAccent, m);
      }
    });
    this.headlinerHover(cursor, headline);
  }

  ngOnDestroy(): void {
    this.eventHandlers.forEach((fn) => fn());
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
