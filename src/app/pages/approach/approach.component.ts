import {AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {gsap} from 'gsap';

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
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {
    const scrollingHeadline = this.scrollHeadline.nativeElement;
    gsap.to(scrollingHeadline, {
      x: '-50%',
      duration: 20,
      ease: 'linear',
      repeat: -1,
      // onComplete: () => {
      //   gsap.set(scrollingHeadline, {
      //     x: '100%'
      //   })
      // }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
