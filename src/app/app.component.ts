import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DarkModeService} from './services/dark-mode.service';

@Component({
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-root';
  @ViewChild('darkModeToggle') darkModeToggle!: ElementRef;
  constructor(private element: ElementRef, private render: Renderer2, private darkModeService: DarkModeService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.darkModeService.darkModeState$.subscribe((darkState) => {
    //     darkState.prefersDark ? this.render.addClass(this.element.nativeElement, 'dark'):
    //     this.render.removeChild(this.element.nativeElement, 'dark');
    // });
  }
}
