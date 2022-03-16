import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {NotificationComponent} from './notification.component';
import {NotificationModule} from './notification.module';

@Injectable({providedIn: NotificationModule})
export class NotificationService {
  // Our component's ref
  private componentRef!: ComponentRef<NotificationComponent>;
  // The view container's ref
  private viewContainerRef!: ViewContainerRef;

  createNotification(childComponent: Type<any>): void {
    // If an instance already exist destroy it first
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef.instance.onClose$.next(true);
    }
    // Create new instance of child component
    this.insertChildComponent(childComponent);
    // Watch onClose subject to destroy component ref
    this.destroyComponent(this.componentRef);
  }

  hookOnHost(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  private insertChildComponent(childComponent: Type<any>): void {
    this.componentRef = this.viewContainerRef.createComponent(NotificationComponent);
    this.componentRef.instance.childComponent = childComponent;
  }

  private destroyComponent(componentRef: ComponentRef<NotificationComponent>): void {
    componentRef.instance.onClose$.subscribe(() => {
      componentRef.destroy();
    });
  }
}
