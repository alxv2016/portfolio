import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'c-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  @Input() data: any;
  @HostBinding('class') class = 'c-playground';
  constructor() {}
}
