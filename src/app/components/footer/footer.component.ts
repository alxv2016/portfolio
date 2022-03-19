import {
  AfterViewInit,
  Component,
  HostBinding,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {ContentService} from 'src/app/services/content.service';
import {AlxvCollection} from 'src/app/services/models/content.interface';
import {BottomPaneDirective} from '../bottom-pane/bottom-pane.directive';
import {BottomPaneService} from '../bottom-pane/bottom-pane.service';
import {TesterComponent} from '../tester/tester.component';

@Component({
  selector: 'c-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-footer';
  constructor(
    private contentService: ContentService,
    private bottomPaneService: BottomPaneService,
    private inject: Injector
  ) {}

  ngOnInit(): void {
    this.contentService.siteContent$.pipe(takeUntil(this.unsubscribe$)).subscribe((resp) => {
      this.siteContent = resp;
    });
  }

  ngAfterViewInit(): void {
    const parent = this.inject.get<AppComponent>(AppComponent);
    this.bottomPaneService.hookOnHost(parent.bottomPaneHost.viewContainerRef);
  }

  openBottomPane(): void {
    this.bottomPaneService.createBottomPane(TesterComponent, 'Hello World from Footer');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
