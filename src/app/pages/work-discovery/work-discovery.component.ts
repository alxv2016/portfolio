import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PrismicResult} from 'src/app/services/models/prismic.interface';
import {PrismicService} from 'src/app/services/prismic.service';

@Component({
  host: {class: 'c-work-discovery'},
  selector: 'c-work-discovery',
  templateUrl: './work-discovery.component.html',
  styleUrls: ['./work-discovery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkDiscoveryComponent implements OnInit {
  workData$?: Observable<PrismicResult | null>;
  constructor(private prismic: PrismicService) {}

  ngOnInit(): void {
    this.workData$ = this.prismic.getWorkState();
    // this.workData$.subscribe((resp) => console.log('process', resp));
  }
}
