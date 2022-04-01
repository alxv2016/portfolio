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
  host: {class: 'c-approach'},
  selector: 'c-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachComponent implements OnInit, AfterViewInit {
  reversing$ = new BehaviorSubject<boolean>(false);
  siteContent$?: Observable<AlxvCollection | null>;
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
    this.siteContent$ = this.contentService.getSiteState();
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
