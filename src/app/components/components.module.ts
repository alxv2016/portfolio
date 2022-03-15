import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {TesterComponent} from './tester/tester.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    SocialLinksComponent,
    FooterComponent,
    BottomSheetComponent,
    TesterComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    ContentComponent,
    SocialLinksComponent,
    FooterComponent,
    BottomSheetComponent,
    TesterComponent,
  ],
})
export class ComponentsModule {}
