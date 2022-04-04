import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCollection} from 'src/app/services/models/home.interface';

@Component({
  host: {class: 'c-social-links'},
  selector: 'c-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent {
  @Input() homeContent$?: Observable<HomeCollection | null>;
  constructor() {}
}
