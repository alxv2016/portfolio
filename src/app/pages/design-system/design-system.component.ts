import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  host: {class: 'c-design-system'},
  selector: 'c-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
