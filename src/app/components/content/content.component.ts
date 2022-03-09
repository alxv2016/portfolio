import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'c-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'c-content';
  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
