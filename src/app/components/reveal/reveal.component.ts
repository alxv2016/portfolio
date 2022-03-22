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
export class RevealComponent implements AfterViewInit {
  state$ = new BehaviorSubject<boolean>(false);
  host: HTMLElement = this.element.nativeElement;
  reverse: boolean = false;
  colors: string[] | null = null;
  amount = 8;
  @HostBinding('class') class = 'c-reveal';
  @Input() direction: string = 'up';
  constructor(private element: ElementRef, private render: Renderer2, private zone: NgZone) {}

  private createRevealBlocks(amount: number, colors?: string[] | null) {
    const revealBlocks = [];
    const revealColors = [];
    for (let i = 0; i < amount; i++) {
      const div = this.render.createElement('div');
      revealColors.push('yellow', 'blue');
      this.render.addClass(div, 'c-reveal-block');
      this.render.setStyle(div, 'background-color', revealColors[i]);
      if (colors && colors.length !== 0 && colors.length === amount) {
        this.render.setStyle(div, 'background-color', colors[i]);
      }
      revealBlocks.push(div);
    }

    console.log(revealColors, revealBlocks);
    return revealBlocks;
  }

  private createReveal(reverse: boolean, colors: string[] | null, amount: number): void {
    // Create divs dynamically?
    console.log('hello');
    reverse ? this.render.addClass(this.host, 'c-reveal--top') : this.render.addClass(this.host, 'c-reveal--bottom');
    const revealBlocks = this.createRevealBlocks(amount, colors);
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
            each: 0.25,
            from: 'start',
          },
          ease: 'power3.out',
        })
        .to(revealBlocks, {
          yPercent: -100,
          stagger: {
            each: 0.25,
            from: 'end',
          },
          ease: 'power3.out',
          onComplete: () => {
            this.render.removeClass(this.host, 'c-reveal--visible');
            this.updateState();
          },
        });
    });
  }

  private updateState(): void {
    this.state$.next(false);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.createReveal(this.reverse, this.colors, this.amount);
    });
  }
}
