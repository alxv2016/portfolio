import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, map} from 'rxjs';
import {gsap} from 'gsap';

@Directive({
  selector: '[appMouseMove]',
})
export class MouseMoveDirective implements AfterViewInit {
  constructor(private render: Renderer2, private element: ElementRef) {}

  private handleMouse(el: HTMLElement, pos: any) {
    const bounds = el.getBoundingClientRect();
    const mousePos = {
      x: pos.x - bounds.width / 2,
      y: pos.y - bounds.height / 2,
    };
    gsap.to(el, {
      x: mousePos.x,
      y: mousePos.y,
      opacity: 1,
      ease: 'power4.out',
    });
  }

  private handleTargets(els: any, cursor: any, pos: any) {
    els.forEach((el: HTMLElement) => {
      const innerEl = el.querySelector('.js-magnet');
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
      gsap.to(innerEl, {
        x: 0,
        y: 0,
        ease: 'back',
      });
      this.render.removeClass(el, 'target--hover');
      if (hypotenuse < triggerDistance) {
        gsap.to(cursor, {
          opacity: 0,
          ease: 'power4',
        });
        gsap.to(innerEl, {
          x: -(Math.sin(angle) * hypotenuse) / 2,
          y: -(Math.cos(angle) * hypotenuse) / 2,
          ease: 'power4.out',
        });
        this.render.addClass(el, 'target--hover');
      }
    });
  }

  ngAfterViewInit(): void {
    const cursor = this.element.nativeElement.querySelector('.cursor');
    const targets = this.element.nativeElement.querySelectorAll('.target');
    const mouseMovement$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      map((ev: MouseEvent) => {
        return {
          x: ev.clientX,
          y: ev.clientY,
        };
      })
    );

    mouseMovement$.subscribe((cursorPos) => {
      this.handleMouse(cursor, cursorPos);
      this.handleTargets(targets, cursor, cursorPos);
    });
  }
}
