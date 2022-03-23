import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {AestheticClockComponent} from './aesthetic-clock/aesthetic-clock.component';
import {AboutContentComponent} from './about-content/about-content.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
  ],
  imports: [CommonModule, BottomPaneModule],
  exports: [HeaderComponent, SocialLinksComponent, FooterComponent, AestheticClockComponent, AboutContentComponent],
})
export class ComponentsModule {}
