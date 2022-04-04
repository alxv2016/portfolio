import {AfterViewInit, Directive, ElementRef, NgZone} from '@angular/core';
import {catchError, fromEvent, map, Observable, of, switchMap, throttleTime} from 'rxjs';
import {gsap} from 'gsap';
import {BreakpointObserver} from '@angular/cdk/layout';
import {state} from '@angular/animations';

@Directive({
  selector: '[mouseMove]',
})
export class MouseMoveDirective implements AfterViewInit {
  parent = this.element.nativeElement.ownerDocument;
  constructor(private element: ElementRef, private zone: NgZone, private bp: BreakpointObserver) {}

  private bpObserver() {
    return this.bp.observe(['(min-width: 568px)']).pipe(
      map((matches) => {
        return matches;
      }),
      catchError((_error) => {
        return of(null);
      })
    );
  }

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

  private mouseEvent(): Observable<any> {
    return fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(60),
      map((ev) => {
        const targets = this.parent.querySelectorAll('.js-magnet');
        const magnets = Array.from(targets);
        return {x: ev.clientX, y: ev.clientY, magnets};
      })
    );
  }

  ngAfterViewInit(): void {
    // Get mousemove event and elements outside of Angular's change detection for performance
    this.zone.runOutsideAngular(() => {
      this.bpObserver()
        .pipe(
          switchMap((media: any) => {
            if (media.matches) {
              return this.mouseEvent();
            }
            return of(null);
          })
        )
        .subscribe((m) => {
          if (m && m.magnets.length !== 0) {
            this.powerMagnets(m.magnets, m);
          }
        });
    });
  }
}
