import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'c-consider-motion',
  templateUrl: './consider-motion.component.html',
  styleUrls: ['./consider-motion.component.scss'],
})
export class ConsiderMotionComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-consider-motion';
  @ViewChild('curveBase') curveBase!: ElementRef;
  @ViewChild('circle') circle!: ElementRef;
  @ViewChild('block') block!: ElementRef;
  @ViewChildren('triangle', {read: ElementRef}) triangle!: QueryList<ElementRef>;
  constructor(private zone: NgZone) {}

  private setInitialState(shapes: any): void {
    gsap.set(shapes.triangles, {
      x: 88,
    });
    gsap.set(shapes.curveBase, {
      y: 38,
      x: 34,
    });
    gsap.set(shapes.block, {
      y: 99,
    });
    gsap.set(shapes.circle, {
      y: 194,
      x: -44,
    });
  }

  private triangleIntro(triangles: HTMLElement[]) {
    const trianglesTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center center',
        duration: 0.375,
      },
    });

    trianglesTL
      .to(triangles, {
        x: -3,
        ease: 'power2.out',
      })
      .to(triangles, {
        x: 0,
      });

    return trianglesTL;
  }

  private curveBaseIntro(curveBase: HTMLElement) {
    const curveBaseTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center bottom',
        duration: 0.375,
      },
    });

    curveBaseTL
      .to(curveBase, {
        x: 0,
      })
      .to(curveBase, {
        y: -18,
        ease: 'power3.out',
      })
      .to(curveBase, {
        y: 0,
        ease: 'power3.out',
      })
      .to(curveBase, {
        rotate: 6,
        ease: 'power3.out',
      })
      .to(curveBase, {
        rotate: 0,
      });

    return curveBaseTL;
  }

  private blockIntro(block: HTMLElement) {
    const blockTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center bottom',
        duration: 0.375,
      },
    });

    blockTL
      .to(block, {
        y: -44,
        ease: 'power2.out',
      })
      .to(
        block,
        {
          rotate: 180,
          transformOrigin: 'center',
          ease: 'back',
          duration: 0.475,
        },
        0
      )
      .to(
        block,
        {
          y: 0,
          rotate: 0,
          transformOrigin: 'center',
          ease: 'power3.in',
        },
        0.25
      )
      .to(block, {
        rotate: 14,
        ease: 'power3.out',
      })
      .to(block, {
        rotate: 0,
      });

    return blockTL;
  }

  private circleIntro(circle: HTMLElement) {
    const circleTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center bottom',
        duration: 0.375,
      },
    });

    circleTL
      .to(circle, {
        x: 0,
        ease: 'back',
      })
      .to(circle, {
        scaleY: 0.75,
        ease: 'power2.out',
      })
      .to(circle, {
        y: -28,
        scaleY: 1.165,
        ease: 'power2.out',
      })
      .to(circle, {
        y: 0,
        scaleY: 0.95,
        ease: 'back',
      })
      .to(circle, {
        scaleY: 1,
        ease: 'back',
      });

    return circleTL;
  }

  private initGSAP(): void {
    const shapes = {
      triangles: this.triangle.map((e) => e.nativeElement),
      curveBase: this.curveBase.nativeElement,
      block: this.block.nativeElement,
      circle: this.circle.nativeElement,
    };
    this.setInitialState(shapes);
    const shapesIntroTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        duration: 0.475,
      },
      onComplete: () => {},
    });

    shapesIntroTL.add(this.triangleIntro(shapes.triangles));
    shapesIntroTL.add(this.curveBaseIntro(shapes.curveBase), 0.25);
    shapesIntroTL.add(this.blockIntro(shapes.block), 0.45);
    shapesIntroTL.add(this.circleIntro(shapes.circle), 0.75);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
