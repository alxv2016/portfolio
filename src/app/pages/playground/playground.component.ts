import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeCollection} from 'src/app/services/models/home.interface';
import {PrismicService} from 'src/app/services/prismic.service';

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
  data$?: Observable<HomeCollection | null>;
  constructor(private prismic: PrismicService) {}

  ngOnInit(): void {
    this.data$ = this.prismic.getHomeState();
  }

  viewProject(url: string): void {
    window.open(url, '_blank');
  }
}
