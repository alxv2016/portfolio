import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import {ApproachComponent} from './approach/approach.component';
import {AsHTMLPipe} from '../services/as-html.pipe';

@NgModule({
  declarations: [HomeComponent, ApproachComponent, AsHTMLPipe],
  imports: [CommonModule, ComponentsModule],
  exports: [],
})
export class PagesModule {}
