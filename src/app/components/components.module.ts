import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {AestheticClockComponent} from './aesthetic-clock/aesthetic-clock.component';
import {AboutContentComponent} from './about-content/about-content.component';
import {BalanceMotionComponent} from './balance-motion/balance-motion.component';
import {ConsiderMotionComponent} from './consider-motion/consider-motion.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
    BalanceMotionComponent,
    ConsiderMotionComponent,
  ],
  imports: [CommonModule, BottomPaneModule],
  exports: [
    BalanceMotionComponent,
    ConsiderMotionComponent,
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
  ],
})
export class ComponentsModule {}
