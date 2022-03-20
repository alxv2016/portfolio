import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';

@Component({
  selector: 'c-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss'],
})
export class AboutContentComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-about-content';
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
