import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from '../components/components.module';
import {ApproachComponent} from './approach/approach.component';
import {AsHTMLPipe} from '../services/as-html.pipe';
import {PlaygroundComponent} from './playground/playground.component';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogComponent} from './blog/blog.component';
import {WorkListComponent} from './work-list/work-list.component';
import {WorkComponent} from './work/work.component';
import {WorkV2Component} from './work-v2/work-v2.component';

@NgModule({
  declarations: [
    HomeComponent,
    ApproachComponent,
    AsHTMLPipe,
    PlaygroundComponent,
    BlogListComponent,
    BlogComponent,
    WorkListComponent,
    WorkComponent,
    WorkV2Component,
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [PlaygroundComponent, BlogListComponent],
})
export class PagesModule {}
