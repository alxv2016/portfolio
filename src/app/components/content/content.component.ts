import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {fromEvent, map, Subject, takeUntil, throttleTime} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';

@Component({
  selector: 'c-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  app: any;
  time = 0;
  @HostBinding('class') class = 'c-content';
  @ViewChild('orb') orb!: ElementRef;
  // @ViewChild('svgTest') svgTest!: ElementRef;
  @ViewChildren('orbLineBG', {read: ElementRef}) orbLineBG!: QueryList<ElementRef>;
  @ViewChildren('orbLine', {read: ElementRef}) orbLine!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {
    const orbLines = this.orbLine.map((l) => l.nativeElement);
    const orbTL = gsap.timeline({
      repeat: -1,
    });

    const bounds = this.orb.nativeElement.getBoundingClientRect();
    const hypo = Math.sqrt(bounds.width * bounds.width + bounds.height * bounds.height);
    const angle = Math.atan2(bounds.width, bounds.height);
    const x = Math.sin(angle) * hypo;
    const y = Math.cos(angle) * hypo;

    const mouseMovement$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(60),
      map((ev: MouseEvent) => {
        return {
          x: ev.clientX,
          y: ev.clientY,
        };
      })
    );

    gsap.set(orbLines, {
      strokeDasharray: (i, target) => target.getTotalLength(),
      strokeDashoffset: (i, target) => target.getTotalLength(),
      strokeWidth: (i, target) => i / 2,
    });

    mouseMovement$.subscribe((cursorPos) => {
      const hypo = Math.sqrt(cursorPos.x * cursorPos.x + cursorPos.y * cursorPos.y);
      const angle = Math.atan2(cursorPos.x, cursorPos.y);
      const x = Math.sin(angle) * hypo;
      const y = Math.cos(angle) * hypo;

      gsap.to(orbLines, {
        strokeDashoffset: (i, target) => {
          return x - y;
        },
        stagger: 0.145,
        ease: 'back',
      });

      console.log(x, y);
    });

    // orbTL.to(
    //   orbLines,
    //   {
    //     strokeDashoffset: (i, target) => {
    //       return x;
    //     },
    //     stagger: 0.145,
    //     ease: 'sine.out',
    //   }
    // )
    // .to(orbLines, {
    //   strokeDashoffset: (i, target) => {
    //     return y;
    //   },
    //   stagger: 0.145,
    //   ease: 'sine.in',
    // })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
