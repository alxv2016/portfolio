import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealDirective} from './reveal.directive';
import {RevealComponent} from './reveal.component';

@NgModule({
  declarations: [RevealDirective, RevealComponent],
  imports: [CommonModule],
  exports: [RevealDirective],
})
export class RevealModule {}
