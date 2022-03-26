import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';

@Component({
  selector: 'c-consider-motion',
  templateUrl: './consider-motion.component.html',
  styleUrls: ['./consider-motion.component.scss'],
})
export class ConsiderMotionComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-consider-motion';
  @ViewChild('group1') group1!: ElementRef;
  @ViewChild('group2') group2!: ElementRef;
  @ViewChild('semicircle') semicircle!: ElementRef;
  @ViewChild('diamond') diamond!: ElementRef;
  @ViewChild('triangle') triangle!: ElementRef;
  @ViewChild('circle') circle!: ElementRef;
  @ViewChild('path') path!: ElementRef;
  // @ViewChildren('triangle', {read: ElementRef}) triangle!: QueryList<ElementRef>;
  constructor(private zone: NgZone, private render: Renderer2) {
    gsap.registerPlugin(MotionPathPlugin);
  }

  private initGSAP(): void {
    const shapes = {
      path: this.path.nativeElement,
      circle: this.circle.nativeElement,
    };

    gsap.to(shapes.circle, {
      repeat: -1,
      duration: 2,
      yoyo: true,
      keyframes: [
        {
          scaleY: 1,
        },
        {
          scaleY: 1,
        },
      ],
      motionPath: {
        path: shapes.path,
        align: shapes.path,
        alignOrigin: [0.5, 0.5],
      },
      ease: 'linear',
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
