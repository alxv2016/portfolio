import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {SocialLinksComponent} from './social-links/social-links.component';

@NgModule({
  declarations: [HeaderComponent, ContentComponent, SocialLinksComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ContentComponent, SocialLinksComponent],
})
export class ComponentsModule {}
