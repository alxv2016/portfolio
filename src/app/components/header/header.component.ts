import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {DarkModeService} from 'src/app/services/dark-mode.service';
import {RevealService} from '../reveal/reveal.service';

@Component({
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  htmlBody = this.element.nativeElement.parentElement.parentElement;
  @HostBinding('class') class = 'header';
  @ViewChild('darkModeToggle') darkModeToggle!: ElementRef;
  @ViewChild('cursor') cursor!: ElementRef;
  constructor(
    private zone: NgZone,
    private revealService: RevealService,
    private element: ElementRef,
    private render: Renderer2,
    private darkModeService: DarkModeService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  goHome(): void {
    this.revealService.createReveal(true);
    this.revealService.getAnimationState().subscribe((state) => {
      if (state) {
        this.zone.run(() => {
          this.router.navigate(['home']);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.darkModeService.darkModeState$.subscribe((darkState) => {
      if (darkState.prefersDark) {
        this.render.addClass(this.htmlBody, 'dark');
        this.render.addClass(this.darkModeToggle.nativeElement, 'toggled');
        this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'true');
      } else {
        this.render.removeClass(this.htmlBody, 'dark');
        this.render.removeClass(this.darkModeToggle.nativeElement, 'toggled');
        this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'false');
      }
      this.cd.markForCheck();
    });
  }
}
