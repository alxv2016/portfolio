import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  host: {class: 'c-social-links'},
  selector: 'c-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent {
  @Input() siteContent$?: Observable<AlxvCollection | null>;
  constructor() {}
}
