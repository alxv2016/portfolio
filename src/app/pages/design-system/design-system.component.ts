import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  host: {class: 'c-design-system'},
  selector: 'c-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent implements OnInit {
  tints: string[] = ['Tint 1', 'Tint 2', 'Tint 3', 'Tint 4', 'Tint 5', 'Tint 6'];
  greys: string[] = ['Grey 1', 'Grey 2', 'Grey 3', 'Grey 4', 'Grey 5', 'Grey 6'];
  nuetrals: string[] = ['Nuetral 1', 'Nuetral 2', 'Neutral 3', 'Neutral 4', 'Neutral 5', 'Neutral 6'];
  shades: string[] = ['Shade 1', 'Shade 2', 'Shade 3', 'Shade 4', 'Shade 5', 'Shade 6'];
  brandColors: string[] = ['Brand', 'Accent 1', 'Accent 2'];
  constructor() {}

  ngOnInit(): void {}
}
