import {AfterViewInit, Component, ElementRef, HostBinding, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

@Component({
  selector: 'c-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
})
export class ApproachComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-approach';
  @ViewChild('scrollingHeadline') scrollHeadline!: ElementRef;
  @ViewChild('hero') hero!: ElementRef;
  constructor(private contentService: ContentService, private zone: NgZone, private element: ElementRef) {
    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
    });
  }

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
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
      '--a-start': '0%',
      '--a-end': '0%',
      duration: 6,
      scrollTrigger: {
        markers: false,
        trigger: this.hero.nativeElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.45,
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
