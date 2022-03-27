import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'c-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  reversing$ = new BehaviorSubject<boolean>(false);
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-approach';
  @ViewChild('scrollingHeadline') scrollHeadline!: ElementRef;
  @ViewChild('hero') hero!: ElementRef;
  constructor(
    private contentService: ContentService,
    private zone: NgZone,
    private element: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
    });
  }

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
      this.cd.markForCheck();
    });
  }

  reverseUpdate(): Observable<boolean> {
    return this.reversing$.asObservable();
  }

  private initGSAP() {
    const scrollingHeadline = this.scrollHeadline.nativeElement;
    gsap.to(scrollingHeadline, {
      x: '-50%',
      duration: 20,
      ease: 'linear',
      repeat: -1,
    });

    gsap.to(this.element.nativeElement, {
      '--a-start': '100%',
      '--a-end': '100%',
      duration: 6,
      ease: 'linear',
      scrollTrigger: {
        markers: false,
        trigger: this.hero.nativeElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.45,
      },
    });

    gsap.to(this.element.nativeElement, {
      scrollTrigger: {
        markers: false,
        trigger: this.hero.nativeElement,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.45,
        onLeave: () => {
          this.reversing$.next(true);
        },
        onEnterBack: () => {
          this.reversing$.next(false);
        },
      },
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
