import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[notificationHost]',
})
export class NotificationDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
