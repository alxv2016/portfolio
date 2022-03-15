import {AfterViewInit, Component, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements AfterViewInit {
  childComponentType!: Type<any>;
  onClose$: Subject<boolean> = new Subject();

  @ViewChild('notificationTemplate', {read: ViewContainerRef, static: true})
  public notificationTemplate!: ViewContainerRef;

  public ngAfterViewInit(): void {
    this.notificationTemplate.createComponent(this.childComponentType);
  }

  onClose() {
    this.onClose$.next(true);
  }
}
