import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, switchMap, takeUntil} from 'rxjs';
import {NotificationDirective} from './components/notification/notification.directive';
import {NotificationService} from './components/notification/notification.service';
import {TesterComponent} from './components/tester/tester.component';
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
    this.notificationService.viewContainerRef = this.notificationHost.viewContainerRef;
  }

  testComponentRender() {
    this.notificationService.newNotification(TesterComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
