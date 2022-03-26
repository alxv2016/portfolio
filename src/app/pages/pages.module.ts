import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import {ApproachComponent} from './approach/approach.component';
import {AsHTMLPipe} from '../services/as-html.pipe';
import {PlaygroundComponent} from './playground/playground.component';

@NgModule({
  declarations: [HomeComponent, ApproachComponent, AsHTMLPipe, PlaygroundComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [PlaygroundComponent],
})
export class PagesModule {}
