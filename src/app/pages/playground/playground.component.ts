import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  host: {
    class: 'c-playground',
  },
  selector: 'c-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  data$?: Observable<AlxvCollection | null>;
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.data$ = this.contentService.getSiteState();
  }
}
