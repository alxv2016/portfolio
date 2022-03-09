import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, map, throttleTime} from 'rxjs';
import {DarkModeService} from 'src/app/services/dark-mode.service';

@Component({
  selector: 'c-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  htmlBody = this.element.nativeElement.parentElement.parentElement;
  @HostBinding('class') class = 'header';
  @ViewChild('darkModeToggle') darkModeToggle!: ElementRef;
  @ViewChild('cursor') cursor!: ElementRef;
  constructor(private element: ElementRef, private render: Renderer2, private darkModeService: DarkModeService) {}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  ngAfterViewInit(): void {
    // this.darkModeService.darkModeState$.subscribe((darkState) => {
    //   if (darkState.prefersDark) {
    //     this.render.addClass(this.htmlBody, 'dark');
    //     this.render.addClass(this.darkModeToggle.nativeElement, 'toggled');
    //     this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'true');
    //   } else {
    //     this.render.removeClass(this.htmlBody, 'dark');
    //     this.render.removeClass(this.darkModeToggle.nativeElement, 'toggled');
    //     this.render.setAttribute(this.darkModeToggle.nativeElement, 'aria-checked', 'false');
    //   }
    // });
  }
}
