import {AfterViewInit, Directive, ElementRef, NgZone, OnInit} from '@angular/core';
import {fromEvent, map, Observable, switchMap, throttleTime} from 'rxjs';
import {gsap} from 'gsap';
import {ContentService} from '../services/content.service';

@Directive({
  selector: '[appMouseMove]',
})
export class MouseMoveDirective implements OnInit, AfterViewInit {
  $mouseMove!: Observable<any>;
  parent = this.element.nativeElement.ownerDocument;
  constructor(private element: ElementRef, private zone: NgZone, private contentService: ContentService) {}

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

  ngOnInit(): void {
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
  }

  ngAfterViewInit(): void {
    // Get mousemove event and elements outside of Angular's change detection for performance
    this.zone.runOutsideAngular(() => {
      this.$mouseMove.subscribe((m) => {
        if (m.magnets.length !== 0) {
          this.powerMagnets(m.magnets, m);
        }
      });
    });
  }
}
