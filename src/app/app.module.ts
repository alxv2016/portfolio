import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {MouseMoveDirective} from './components/mouse-move.directive';
import {NotificationModule} from './components/notification/notification.module';
import {BottomPaneModule} from './components/bottom-pane/bottom-pane.module';

@NgModule({
  declarations: [AppComponent, MouseMoveDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ComponentsModule, NotificationModule, BottomPaneModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
