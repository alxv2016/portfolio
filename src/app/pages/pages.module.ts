import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessComponent} from './process/process.component';
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import {ApproachComponent} from './approach/approach.component';

@NgModule({
  declarations: [ProcessComponent, HomeComponent, ApproachComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ProcessComponent, HomeComponent],
})
export class PagesModule {}
