import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {NotificationComponent} from './notification.component';
import {NotificationModule} from './notification.module';

@Injectable({providedIn: NotificationModule})
export class NotificationService {
  public notificationComponentRef!: ComponentRef<NotificationComponent>;
  public containerElementViewRef!: ViewContainerRef;

  public newNotification(componentType: Type<any>) {
    if (this.notificationComponentRef) {
      this.closeNotification();
      this.notificationComponentRef.instance.onClose$.next(true);
    }

    this.openNotification(componentType);

    this.notificationComponentRef.instance.onClose$.subscribe(() => this.closeNotification());
  }

  private openNotification(componentType: Type<any>) {
    this.notificationComponentRef = this.containerElementViewRef.createComponent(NotificationComponent);

    this.notificationComponentRef.instance.childComponentType = componentType;
  }

  private closeNotification() {
    this.notificationComponentRef.destroy();
  }
}
