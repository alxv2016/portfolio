import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
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
export class RevealComponent implements AfterViewInit {
  state$ = new BehaviorSubject<boolean>(false);
  animationState$ = new BehaviorSubject<boolean>(false);
  host: HTMLElement = this.element.nativeElement;
  reverse: boolean = false;
  amount = 3;
  @HostBinding('class') class = 'c-reveal';
  @Input() direction: string = 'up';
  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {
    this.cd.detach();
  }

  private createRevealBlocks() {
    const document = this.element.nativeElement.ownerDocument;
    const style = getComputedStyle(document.body);
    const block1 = style.getPropertyValue('--color-reveal-block1');
    const block2 = style.getPropertyValue('--color-reveal-block2');
    const block3 = style.getPropertyValue('--color-reveal-block3');
    const colors = [block1, block2, block3];
    const revealBlocks = [];
    for (let i = 0; i < this.amount; i++) {
      const div = this.render.createElement('div');
      this.render.addClass(div, 'c-reveal-block');
      this.render.setStyle(div, 'background-color', colors[i]);
      revealBlocks.push(div);
    }
    return revealBlocks;
  }

  private createReveal(reverse: boolean): void {
    reverse ? this.render.addClass(this.host, 'c-reveal--top') : this.render.addClass(this.host, 'c-reveal--bottom');
    const revealBlocks = this.createRevealBlocks();
    revealBlocks.forEach((div) => {
      this.render.appendChild(this.host, div);
    });

    requestAnimationFrame(() => {
      this.render.addClass(this.host, 'c-reveal--visible');
      const revealTL = gsap.timeline();
      revealTL
        .to(revealBlocks, {
          y: 0,
          stagger: {
            each: 0.125,
            from: 'start',
          },
          ease: 'power4.out',
        })
        .to(revealBlocks, {
          yPercent: reverse ? 100 : -100,
          stagger: {
            each: 0.125,
            from: 'end',
          },
          ease: 'power4.out',
          onStart: () => {
            this.animationState$.next(true);
          },
          onComplete: () => {
            this.render.removeClass(this.host, 'c-reveal--visible');
            this.animationState$.next(false);
            this.state$.next(false);
          },
        });
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createReveal(this.reverse);
    });
  }
}
