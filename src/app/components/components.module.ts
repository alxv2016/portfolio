import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';
import {BottomPaneModule} from './bottom-pane/bottom-pane.module';
import {AestheticClockComponent} from './aesthetic-clock/aesthetic-clock.component';
import {AboutContentComponent} from './about-content/about-content.component';
import {BalanceMotionComponent} from './balance-motion/balance-motion.component';
import {HeroComponent} from './hero/hero.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
    BalanceMotionComponent,
    HeroComponent,
  ],
  imports: [CommonModule, BottomPaneModule],
  exports: [
    BalanceMotionComponent,
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
    HeroComponent,
  ],
})
export class ComponentsModule {}
