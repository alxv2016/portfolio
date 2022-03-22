import {AfterViewInit, Directive, ElementRef, NgZone, OnInit, Renderer2} from '@angular/core';
import {fromEvent, map, Observable, switchMap, throttleTime} from 'rxjs';
import {gsap} from 'gsap';
import {ContentService} from '../services/content.service';

@Directive({
  selector: '[appMouseMove]',
})
export class MouseMoveDirective implements OnInit, AfterViewInit {
  $mouseMove!: Observable<any>;
  parent = this.element.nativeElement.ownerDocument;
  constructor(
    private render: Renderer2,
    private element: ElementRef,
    private zone: NgZone,
    private contentService: ContentService
  ) {}

  private powerMagnets(els: any, pos: any) {
    els.forEach((el: HTMLElement) => {
      const bounds = el.getBoundingClientRect();
      const triggerDistance = bounds.width * 0.7;
      const elCenter = {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      };
      const elDistance = {
        x: elCenter.x - pos.x,
        y: elCenter.y - pos.y,
      };
      const angle = Math.atan2(elDistance.x, elDistance.y);
      const hypotenuse = Math.sqrt(elDistance.x * elDistance.x + elDistance.y * elDistance.y);
      gsap.to(el, {
        x: 0,
        y: 0,
        ease: 'back',
      });
      if (hypotenuse < triggerDistance) {
        gsap.to(el, {
          x: -(Math.sin(angle) * hypotenuse) / 2,
          y: -(Math.cos(angle) * hypotenuse) / 2,
          ease: 'power4.out',
        });
      }
    });
  }

  private animateAbstract(lines: any, linesAccent: any, pos: any) {
    const hypo = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    const angle = Math.atan2(pos.x, pos.y);
    const x = Math.sin(angle) * hypo;
    const y = Math.cos(angle) * hypo;

    gsap.to(lines, {
      strokeDashoffset: x / 2 - y / 2,
      stagger: {
        from: 'end',
        each: 0.025,
      },
      ease: 'power4.out',
    });

    gsap.to(linesAccent, {
      strokeDashoffset: x / 2 - y / 2,
      stagger: {
        from: 'end',
        each: 0.03,
      },
      ease: 'power2.out',
    });
  }

  private headlinerHover(cursor: HTMLElement, headliner: HTMLElement): void {
    this.render.listen(headliner, 'mouseenter', (e) => {
      requestAnimationFrame(() => {
        gsap.to(cursor, {
          scale: 1,
          ease: 'back',
          opacity: 1,
        });
      });
    });

    this.render.listen(headliner, 'mouseleave', (e) => {
      requestAnimationFrame(() => {
        gsap.to(cursor, {
          scale: 0.025,
          ease: 'back',
          opacity: 0,
        });
      });
    });
  }

  ngOnInit(): void {
    // Get mousemove event and elements outside of Angular's change detection for performance
    this.zone.runOutsideAngular(() => {
      this.$mouseMove = fromEvent<MouseEvent>(window, 'mousemove').pipe(
        throttleTime(60),
        switchMap((ev) => {
          // switchmap to siteContent$ for to capture elements not yet loaded in DOM
          return this.contentService.siteContent$.pipe(
            map((_) => {
              const targets = this.parent.querySelectorAll('.js-magnet');
              const magnets = Array.from(targets);
              return {x: ev.clientX, y: ev.clientY, magnets};
            })
          );
        })
      );
    });
  }

  ngAfterViewInit(): void {
    const cursor = this.parent.querySelector('.cursor');
    const headliner = this.parent.querySelector('.js-headliner');
    const boudings = cursor.getBoundingClientRect();
    const lines = this.parent.querySelectorAll('.orb-lines > path');
    const linesAccent = this.parent.querySelectorAll('.orb-lines-accent > path');

    if (lines) {
      gsap.set(lines, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeWidth: (i) => i / 2,
      });
      gsap.set(linesAccent, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeWidth: (i) => i / 2,
      });
    }
    if (cursor) {
      gsap.set(cursor, {
        scale: 0.025,
      });
    }

    this.headlinerHover(cursor, headliner);
    this.$mouseMove.subscribe((m) => {
      gsap.to(cursor, {
        x: m.x - boudings.width / 2,
        y: m.y - boudings.height / 2,
        ease: 'ease',
      });
      if (m.magnets.length !== 0) {
        this.powerMagnets(m.magnets, m);
      }
      if (lines && linesAccent) {
        this.animateAbstract(lines, linesAccent, m);
      }
    });
  }
}
