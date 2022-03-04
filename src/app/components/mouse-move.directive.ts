import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, map} from 'rxjs';

@Directive({
  selector: '[appMouseMove]',
})
export class MouseMoveDirective implements AfterViewInit {
  constructor(private render: Renderer2, private element: ElementRef) {}

  ngAfterViewInit(): void {
    const cursor = this.element.nativeElement.querySelector('.cursor');
    const mouseMovement$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      map((ev: MouseEvent) => {
        return {
          x: ev.clientX,
          y: ev.clientY,
        };
      })
    );

    mouseMovement$.subscribe((cursorPos) => {
      const rect = cursor.getBoundingClientRect();
      this.render.setStyle(
        cursor,
        'transform',
        `translate(${cursorPos.x - rect.width / 2}px, ${cursorPos.y - rect.height / 2}px)`
      );
    });
  }
}
