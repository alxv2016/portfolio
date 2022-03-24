import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
@Component({
  selector: 'c-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-process';
  @ViewChild('halfCircle') halfCircle!: ElementRef;
  @ViewChild('smallCircle') smallCircle!: ElementRef;
  @ViewChild('smallSquare') smallSquare!: ElementRef;
  @ViewChildren('centerCircle', {read: ElementRef}) centerCircle!: QueryList<ElementRef>;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const halfCircleTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.475,
        ease: 'linear',
        transformOrigin: 'center top',
      },
    });

    const smallCircleTL = gsap.timeline({
      repeat: -1,
      delay: 0.675,
      repeatDelay: 0.675,
      defaults: {
        duration: 0.275,
        ease: 'linear',
        transformOrigin: 'center bottom',
      },
    });

    const smallSquareTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.275,
        ease: 'linear',
      },
    });

    gsap.set(this.smallSquare.nativeElement, {
      transformOrigin: 'center bottom',
      rotate: -15,
    });

    gsap.set(this.halfCircle.nativeElement, {
      rotate: -25,
      transformOrigin: 'center top',
    });

    smallSquareTL
      .to(this.smallSquare.nativeElement, {
        rotate: -25,
        ease: 'power2.out',
      })
      .to(this.smallSquare.nativeElement, {
        rotate: -15,
      })
      .to(this.smallSquare.nativeElement, {
        rotate: 0,
      })
      .to(this.smallSquare.nativeElement, {
        rotate: 15,
      })
      .to(this.smallSquare.nativeElement, {
        rotate: 25,
        ease: 'power2.out',
      })
      .to(this.smallSquare.nativeElement, {
        rotate: 0,
      })
      .to(this.smallSquare.nativeElement, {
        rotate: -15,
      });

    smallCircleTL
      .to(this.smallCircle.nativeElement, {
        scaleY: 0.85,
        ease: 'back',
      })
      .to(this.smallCircle.nativeElement, {
        scale: 1,
      })
      .to(this.smallCircle.nativeElement, {
        y: -140,
        ease: 'power4,out',
      })
      .to(this.smallCircle.nativeElement, {
        scale: 1.75,
        ease: 'back',
      })
      .to(this.smallCircle.nativeElement, {
        scale: 1,
        ease: 'power4,in',
      })
      .to(this.smallCircle.nativeElement, {
        y: 0,
      })
      .to(this.smallCircle.nativeElement, {
        scaleY: 0.85,
        ease: 'back',
      })
      .to(this.smallCircle.nativeElement, {
        scale: 1,
      });

    halfCircleTL
      .to(this.halfCircle.nativeElement, {
        rotate: 0,
      })
      .to(this.halfCircle.nativeElement, {
        rotate: 25,
        ease: 'back',
      })
      .to(this.halfCircle.nativeElement, {
        rotate: 0,
      })
      .to(this.halfCircle.nativeElement, {
        rotate: -25,
        ease: 'back',
      });
  }
}
