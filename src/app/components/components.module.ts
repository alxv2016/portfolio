import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';
import {TesterComponent} from './tester/tester.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {AestheticClockComponent} from './aesthetic-clock/aesthetic-clock.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SocialLinksComponent,
    FooterComponent,
    TesterComponent,
    AestheticClockComponent,
  ],
  imports: [CommonModule, BottomPaneModule],
  exports: [
    HeaderComponent,
    ContentComponent,
    SocialLinksComponent,
    FooterComponent,
    TesterComponent,
    AestheticClockComponent,
  ],
})
export class ComponentsModule {}
