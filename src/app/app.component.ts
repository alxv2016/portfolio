import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, switchMap, takeUntil} from 'rxjs';
import {BottomPaneDirective} from './components/bottom-pane/bottom-pane.directive';
import {NotificationDirective} from './components/notification/notification.directive';
import {NotificationService} from './components/notification/notification.service';
import {ContentService} from './services/content.service';
import {AlxvCollection} from './services/models/content.interface';

@Component({
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe$ = new Subject();
  siteContent?: AlxvCollection;
  @HostBinding('class') class = 'c-root';
  @ViewChild('darkModeToggle') darkModeToggle!: ElementRef;
  @ViewChild('pixiCanvas') pixiCanvas!: ElementRef;
  @ViewChild(NotificationDirective, {static: true}) notificationHost!: NotificationDirective;
  @ViewChild(BottomPaneDirective, {static: true}) bottomPaneHost!: BottomPaneDirective;
  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private contentService: ContentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.contentService
      .getSiteContent()
      .pipe(
        switchMap((_) => this.contentService.siteContent$),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((resp) => {
        this.siteContent = resp;
      });
  }

  ngAfterViewInit(): void {
    // this.notificationService.hookOnHost(this.bottomPaneHost.viewContainerRef);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
