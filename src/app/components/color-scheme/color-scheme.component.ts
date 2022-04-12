import {ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  host: {class: 'c-color-scheme'},
  selector: 'c-color-scheme',
  templateUrl: './color-scheme.component.html',
  styleUrls: ['./color-scheme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSchemeComponent implements OnInit {
  colorScheme = [
    {
      name: 'scheme',
      value: 'auto',
      label: 'Auto',
    },
    {
      name: 'scheme',
      value: 'light',
      label: 'Light',
    },
    {
      name: 'scheme',
      value: 'dark',
      label: 'Dark',
    },
  ];
  surfaces: string[] = ['Surface 1', 'Surface 2', 'Surface 3', 'Surface 4', 'Surface 5', 'Surface 6'];
  nuetrals: string[] = ['Nuetral 1', 'Nuetral 2', 'Neutral 3', 'Neutral 4', 'Neutral 5', 'Neutral 6'];
  brandColors: string[] = ['Brand', 'Accent 1', 'Accent 2'];
  textColors: string[] = ['Text 1', 'Text 2', 'Text 3', 'Text 4'];
  themeForm!: FormGroup;
  @ViewChild('hueSlider', {static: true}) hueSlider!: ElementRef;
  constructor(private fb: FormBuilder, private render: Renderer2) {}

  private calcPercent(value: number) {
    const percent = (value / 360) * 100;
    return Number(percent.toFixed(3));
  }

  private setTrackFill(): void {
    const hue = this.themeForm.get('hue')?.value;
    // const sat = this.themeForm.get('saturation')?.value;
    // const light = this.themeForm.get('lightness')?.value;

    this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(hue)}%;`);
    // this.render.setAttribute(this.satSlider.nativeElement, 'style', `--track-fill:${sat}%;`);
    // this.render.setAttribute(this.lightSlider.nativeElement, 'style', `--track-fill:${light}%;`);
  }

  ngOnInit(): void {
    this.themeForm = this.fb.group({
      scheme: [],
      hue: [],
    });
  }
}
