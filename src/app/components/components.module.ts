import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {SocialLinksComponent} from './social-links/social-links.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, ContentComponent, SocialLinksComponent, FooterComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ContentComponent, SocialLinksComponent, FooterComponent],
})
export class ComponentsModule {}
