import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification.component';
import {NotificationDirective} from './notification.directive';

@NgModule({
  declarations: [NotificationComponent, NotificationDirective],
  imports: [CommonModule],
  exports: [NotificationDirective],
})
export class NotificationModule {}
