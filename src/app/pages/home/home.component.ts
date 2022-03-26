import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {fromEvent, map, Observable, Subject, takeUntil, throttleTime} from 'rxjs';
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
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-home';
  constructor(
    private element: ElementRef,
    private contentService: ContentService,
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
      this.changeRef.detectChanges();
      this.siteContent = resp;
    });
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
