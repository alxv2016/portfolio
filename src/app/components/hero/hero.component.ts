import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {gsap} from 'gsap';
import {Observable} from 'rxjs';
import {ApproachCollection} from 'src/app/services/models/approach.interface';

@Component({
  selector: 'c-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  host: {
    class: 'c-hero',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  gsapAnimation!: GSAPAnimation;
  @ViewChild('scrollingHeadline') scrollHeadline!: ElementRef;
  @Input() approachContent$?: Observable<ApproachCollection | null>;
  @Input() reversing?: Observable<boolean>;
  constructor(private cd: ChangeDetectorRef, private zone: NgZone) {}

  private initGSAP() {
    const scrollingHeadline = this.scrollHeadline.nativeElement;
    this.gsapAnimation = gsap.to(scrollingHeadline, {
      x: '-50%',
      duration: 28,
      ease: 'linear',
      repeat: -1,
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.gsapAnimation.kill();
  }
}
