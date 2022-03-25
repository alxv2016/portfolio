import {AfterViewInit, Component, ElementRef, HostBinding, NgZone, OnInit, ViewChild} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'c-relationship-motion',
  templateUrl: './relationship-motion.component.html',
  styleUrls: ['./relationship-motion.component.scss'],
})
export class RelationshipMotionComponent implements AfterViewInit {
  @HostBinding('class') class = 'c-relationship-motion';
  @ViewChild('curve') curve!: ElementRef;
  @ViewChild('curveBase') curveBase!: ElementRef;
  @ViewChild('balancer') balancer!: ElementRef;
  @ViewChild('block') block!: ElementRef;
  constructor(private zone: NgZone) {}

  private setInitialState(shapes: any): void {
    // Set initial states
    gsap.set(shapes.block, {
      y: 84,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.curveBase, {
      y: 44,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.curve, {
      rotate: 180,
      transformOrigin: 'center bottom',
    });
    gsap.set(shapes.balancer, {
      x: 88,
      transformOrigin: 'center bottom',
    });
  }

  private balancerIntroAnimation(balancer: HTMLElement) {
    const balancerTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        duration: 0.475,
      },
    });

    balancerTL
      .to(balancer, {
        x: -8,
        ease: 'back',
      })
      .to(balancer, {
        x: 0,
      });
    return balancerTL;
  }

  private blockIntroAnimation(block: HTMLElement) {
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
      .to(block, {
        y: 0,
        rotate: 0,
        transformOrigin: 'center',
        ease: 'power3.in',
      })
      .to(block, {
        rotate: 14,
        ease: 'power3.out',
      })
      .to(block, {
        rotate: 0,
      });

    return blockTL;
  }

  private curveBaseIntroAnimation(curveBase: HTMLElement) {
    const curveBaseTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center bottom',
        duration: 0.375,
      },
    });

    curveBaseTL
      .to(curveBase, {
        y: -14,
        ease: 'power3.out',
      })
      .to(
        curveBase,
        {
          y: 0,
          ease: 'power3.in',
        },
        0.25
      )
      .to(curveBase, {
        rotate: -4,
        ease: 'power3.out',
      })
      .to(curveBase, {
        rotate: 0,
      });

    return curveBaseTL;
  }

  private curveIntroAnimation(curve: HTMLElement) {
    const curveTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        transformOrigin: 'center bottom',
        duration: 0.375,
      },
    });

    curveTL
      .to(curve, {
        rotate: 240,
        ease: 'back',
      })
      .to(curve, {
        rotate: 0,
        ease: 'power2.out',
      });

    return curveTL;
  }

  private balancerLoopAnimation(balancer: HTMLElement) {
    const balancerTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.475,
        ease: 'linear',
        transformOrigin: 'center',
      },
    });

    balancerTL
      .to(balancer, {
        x: 4,
        ease: 'power3.out',
      })
      .to(balancer, {
        x: 0,
      })
      .to(balancer, {
        x: -4,
        ease: 'power3.out',
      })
      .to(balancer, {
        x: 0,
      });

    balancerTL.pause();
    return balancerTL;
  }

  private curveBaseLoopAnimation(curveBase: HTMLElement) {
    const curveBaseTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.675,
        ease: 'linear',
        transformOrigin: 'center bottom',
      },
    });

    curveBaseTL
      .to(curveBase, {
        rotate: 8,
        ease: 'power2.out',
      })
      .to(curveBase, {
        rotate: 0,
      })
      .to(curveBase, {
        rotate: -8,
        ease: 'power2.out',
      })
      .to(curveBase, {
        rotate: 0,
      });

    curveBaseTL.pause();
    return curveBaseTL;
  }

  private curveLoopAnimation(curve: HTMLElement) {
    const curveTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.7,
        ease: 'linear',
      },
    });

    curveTL
      .to(curve, {
        x: 16,
      })
      .to(curve, {
        x: 0,
      })
      .to(curve, {
        x: -16,
      })
      .to(curve, {
        x: 0,
      });

    curveTL.pause();
    return curveTL;
  }

  private blockLoopAnimation(block: HTMLElement) {
    const blockTL = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 0.675,
        ease: 'linear',
        transformOrigin: 'center bottom',
      },
    });

    blockTL
      .to(block, {
        rotate: -14,
        ease: 'power2.out',
      })
      .to(block, {
        rotate: 0,
        scale: 1,
      })
      .to(block, {
        rotate: 14,
        ease: 'power2.out',
      })
      .to(block, {
        rotate: 0,
      });

    blockTL.pause();
    return blockTL;
  }

  private initGSAP(): void {
    const shapes = {
      block: this.block.nativeElement,
      curve: this.curve.nativeElement,
      curveBase: this.curveBase.nativeElement,
      balancer: this.balancer.nativeElement,
    };
    this.setInitialState(shapes);
    const balanceIntroTL = gsap.timeline({
      defaults: {
        ease: 'linear',
        duration: 0.475,
      },
      onComplete: () => {
        balancerLoop.play();
        curveBaseLoop.play();
        curveLoop.play();
        blockLoop.play();
      },
    });

    balanceIntroTL.add(this.balancerIntroAnimation(shapes.balancer));
    balanceIntroTL.add(this.blockIntroAnimation(shapes.block), 0.125);
    balanceIntroTL.add(this.curveBaseIntroAnimation(shapes.curveBase), 0.25);
    balanceIntroTL.add(this.curveIntroAnimation(shapes.curve), 0.125);

    const balancerLoop = this.balancerLoopAnimation(shapes.balancer);
    const curveBaseLoop = this.curveBaseLoopAnimation(shapes.curveBase);
    const curveLoop = this.curveLoopAnimation(shapes.curve);
    const blockLoop = this.blockLoopAnimation(shapes.block);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
