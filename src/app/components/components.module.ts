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
import {ColorSchemeComponent} from './color-scheme/color-scheme.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OffCanvasModule} from './off-canvas/off-canvas.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
    BalanceMotionComponent,
    HeroComponent,
    ColorSchemeComponent,
  ],
  imports: [CommonModule, BottomPaneModule, OffCanvasModule, FormsModule, ReactiveFormsModule],
  exports: [
    BalanceMotionComponent,
    HeaderComponent,
    SocialLinksComponent,
    FooterComponent,
    AestheticClockComponent,
    AboutContentComponent,
    HeroComponent,
    ColorSchemeComponent,
  ],
})
export class ComponentsModule {}
