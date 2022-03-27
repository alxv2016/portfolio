import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  selector: 'c-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  @HostBinding('class') class = 'c-social-links';
  @Input() siteContent?: AlxvCollection;
  constructor() {}
}
