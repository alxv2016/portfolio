import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {gsap} from 'gsap';

@Component({
  selector: 'c-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss'],
})
export class RevealComponent implements AfterViewInit, OnDestroy {
  state$ = new BehaviorSubject<boolean>(false);
  host: HTMLElement = this.element.nativeElement;
  transitionEventHandler: any;
  @HostBinding('class') class = 'c-reveal';
  @Input() direction: string = 'up';
  constructor(private element: ElementRef, private render: Renderer2, private zone: NgZone) {}

  private onTransitionEnd(ev: TransitionEvent): void {
    requestAnimationFrame(() => {
      this.render.removeClass(this.host, 'c-reveal--animate');
      this.render.removeClass(this.host, 'c-reveal--visible');
      this.destroyReveal();
      this.transitionEventHandler();
    });
  }

  private createReveal(): void {
    // Create divs dynamically?
    requestAnimationFrame(() => {
      this.render.addClass(this.host, 'c-reveal--animate');
      this.render.addClass(this.host, 'c-reveal--visible');
      this.transitionEventHandler = this.render.listen(this.host, 'transitionend', this.onTransitionEnd);
    });
  }

  private destroyReveal(): void {
    this.state$.next(false);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createReveal();
    });
  }

  ngOnDestroy(): void {
    this.destroyReveal();
  }
}
