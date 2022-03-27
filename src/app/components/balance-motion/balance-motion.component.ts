import {AfterViewInit, Component, ElementRef, HostBinding, NgZone, OnInit, ViewChild} from '@angular/core';
import {gsap} from 'gsap';

interface Shapes {
  group: HTMLElement | null;
  arc: HTMLElement | null;
  circle: HTMLElement | null;
  diamond: HTMLElement | null;
}

@Component({
  selector: 'c-balance-motion',
  templateUrl: './balance-motion.component.html',
  styleUrls: ['./balance-motion.component.scss'],
})
export class BalanceMotionComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-balance-motion';
  @ViewChild('arc') arc!: ElementRef;
  @ViewChild('shapesGroup') shapesGroup!: ElementRef;
  @ViewChild('circle') circle!: ElementRef;
  @ViewChild('diamond') diamond!: ElementRef;
  constructor(private zone: NgZone) {}

  private setInitialState(shapes: Shapes): void {
    // Set initial states
    gsap.set(shapes.diamond, {
      y: 82,
      rotate: 45,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.group, {
      y: 44,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.arc, {
      rotate: 200,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.circle, {
      x: 88,
      transformOrigin: 'center bottom',
    });
  }

  private shapesIntro(shapes: Shapes) {
    const timeLine = gsap.timeline({
      defaults: {
        ease: 'linear',
      },
    });
    // Circle
    const circle = gsap.to(shapes.circle, {
      keyframes: [
        {
          x: -8,
          ease: 'back',
        },
        {
          x: 0,
          ease: 'back',
        },
      ],
    });
    // Diamond
    const diamond = gsap.to(shapes.diamond, {
      duration: 1.85,
      keyframes: [
        {
          rotate: 0,
          ease: 'back',
        },
        {
          y: -44,
          ease: 'power2.out',
        },
        {
          rotate: -180,
          transformOrigin: 'center',
          ease: 'back',
        },
        {
          rotate: 0,
          y: 0,
          ease: 'power3.in',
        },
        {
          rotate: 14,
          x: 14,
          ease: 'power3.out',
        },
        {
          rotate: 0,
          x: 0,
        },
      ],
    });
    // Arc
    const arc = gsap.to(shapes.arc, {
      keyframes: [
        {
          rotate: 260,
          ease: 'back',
        },
        {
          rotate: 0,
          ease: 'power2.out',
        },
      ],
    });

    // Group
    const group = gsap.to(shapes.group, {
      duration: 0.975,
      keyframes: [
        {
          y: -14,
          ease: 'power3.out',
        },
        {
          y: 0,
          ease: 'power4.in',
        },
        {
          rotate: -4,
          ease: 'power3.out',
        },
        {
          rotate: 0,
        },
      ],
    });

    timeLine.add(circle);
    timeLine.add(diamond, 0.25);
    timeLine.add(arc, 0.45);
    timeLine.add(group, 2.25);

    timeLine.pause();
    return timeLine;
  }

  private shapesLoop(shapes: Shapes) {
    const timeLine = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: 'linear',
      },
    });

    // Circle
    const circle = gsap.to(shapes.circle, {
      keyframes: [
        {
          x: 4,
          ease: 'power3.out',
        },
        {
          x: 0,
        },
        {
          x: -4,
          ease: 'power3.out',
        },
        {
          x: 0,
        },
      ],
    });

    // Arc
    const arc = gsap.to(shapes.arc, {
      keyframes: [
        {
          x: 16,
        },
        {
          x: 0,
        },
        {
          x: -16,
        },
        {
          x: 0,
        },
      ],
    });

    // Diamond
    const diamond = gsap.to(shapes.diamond, {
      keyframes: [
        {
          rotate: -14,
          ease: 'power2.out',
        },
        {
          rotate: 0,
        },
        {
          rotate: 14,
          ease: 'power2.out',
        },
        {
          rotate: 0,
        },
      ],
    });

    // Group
    const group = gsap.to(shapes.group, {
      keyframes: [
        {
          rotate: 8,
          ease: 'power2.out',
        },
        {
          rotate: 0,
        },
        {
          rotate: -8,
          ease: 'power2.out',
        },
        {
          rotate: 0,
        },
      ],
    });

    timeLine.add(circle);
    timeLine.add(arc, 0);
    timeLine.add(diamond, 0);
    timeLine.add(group, 0);
    timeLine.pause();
    return timeLine;
  }

  private initGSAP(): void {
    const shapes: Shapes = {
      group: this.shapesGroup.nativeElement,
      diamond: this.diamond.nativeElement,
      arc: this.arc.nativeElement,
      circle: this.circle.nativeElement,
    };
    this.setInitialState(shapes);
    const intro = this.shapesIntro(shapes);
    const loop = this.shapesLoop(shapes);
    intro.play();
    intro.eventCallback('onComplete', () => {
      loop.play();
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
