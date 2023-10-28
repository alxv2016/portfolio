import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

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
  tints: string[] = ['Tint 1', 'Tint 2', 'Tint 3', 'Tint 4', 'Tint 5', 'Tint 6'];
  nuetrals: string[] = ['Nuetral 1', 'Nuetral 2', 'Neutral 3', 'Neutral 4', 'Neutral 5', 'Neutral 6'];
  shades: string[] = ['Shade 1', 'Shade 2', 'Shade 3', 'Shade 4', 'Shade 5', 'Shade 6'];
  brandColors: string[] = ['Brand', 'Accent 1', 'Accent 2'];
  themeForm!: UntypedFormGroup;
  hue = this.getBrandHue();
  @ViewChild('hueSlider', {static: true}) hueSlider!: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: UntypedFormBuilder,
    private render: Renderer2
  ) {}

  private calcPercent(value: number) {
    const percent = (value / 360) * 100;
    return Number(percent.toFixed(3));
  }

  private getBrandHue(): number {
    const doc = this.document.firstElementChild!;
    const hue = getComputedStyle(doc).getPropertyValue('--brand-hue').trim();
    return Number(hue);
  }

  private checkScheme(): boolean {
    return JSON.parse(localStorage.getItem('prefers-dark')!);
  }

  private setScheme(bool: boolean) {
    localStorage.setItem('prefers-dark', JSON.stringify(bool));
  }

  private setTrackFill(): void {
    const hue = this.themeForm.get('hue')?.value;
    this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(hue)}%;`);
  }

  private setColorScheme(scheme: string) {
    const doc = this.document.firstElementChild;
    this.render.setAttribute(doc, 'color-scheme', scheme);
  }

  private changeHue(hue: string): void {
    const doc = this.document.firstElementChild!;
    doc.setAttribute('style', `--brand-hue:${hue};`);
  }

  ngOnInit(): void {
    const dark = this.checkScheme();
    this.themeForm = this.fb.group({
      scheme: [dark ? 'dark' : 'light'],
      hue: [this.hue],
    });
    this.setTrackFill();
    this.themeForm.valueChanges.subscribe((x) => {
      this.render.setAttribute(this.hueSlider.nativeElement, 'style', `--track-fill:${this.calcPercent(x.hue)}%;`);
      this.changeHue(x.hue);
      switch (true) {
        case x.scheme === 'light':
          this.setColorScheme(x.scheme);
          this.setScheme(false);
          break;
        case x.scheme === 'dark':
          this.setColorScheme(x.scheme);
          this.setScheme(true);
          break;
        case x.scheme === 'auto':
          this.setColorScheme(x.scheme);
          break;
      }
    });
  }
}
