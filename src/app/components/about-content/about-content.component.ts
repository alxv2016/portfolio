import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'c-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
})
export class AboutContentComponent {
  contentCheck = false;
  @Input() data: any;
  @HostBinding('class') class = 'c-about-content';
  constructor() {}
}
