import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApproachComponent} from './pages/approach/approach.component';
import {BlogComponent} from './pages/blog/blog.component';
import {HomeComponent} from './pages/home/home.component';
import {WorkV2Component} from './pages/work-v2/work-v2.component';
import {WorkComponent} from './pages/work/work.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'approach', component: ApproachComponent},
  {
    path: 'blog/:id',
    component: BlogComponent,
  },
  {
    path: 'work2/:id',
    component: WorkV2Component,
  },
  {
    path: 'work/:id',
    component: WorkComponent,
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
