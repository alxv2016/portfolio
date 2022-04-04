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
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ApproachCollection} from 'src/app/services/models/approach.interface';
import {PrismicService} from 'src/app/services/prismic.service';

@Component({
  host: {class: 'c-approach'},
  selector: 'c-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachComponent implements OnInit, AfterViewInit {
  reversing$ = new BehaviorSubject<boolean>(false);
  approachContent$?: Observable<ApproachCollection | null>;
  @ViewChild('hero') hero!: ElementRef;
  constructor(
    private prismic: PrismicService,
    private zone: NgZone,
    private element: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.zone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
    });
  }

  ngOnInit(): void {
    this.approachContent$ = this.prismic.getApproachState();
  }

  reverseUpdate(): Observable<boolean> {
    return this.reversing$;
  }

  private initGSAP() {
    gsap.to(this.element.nativeElement, {
      scrollTrigger: {
        markers: false,
        trigger: this.hero.nativeElement,
        start: 'top top',
        end: 'bottom top',
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
}
