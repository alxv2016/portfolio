import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApproachComponent} from './pages/approach/approach.component';
import {BlogComponent} from './pages/blog/blog.component';
import {DesignSystemComponent} from './pages/design-system/design-system.component';
import {HomeComponent} from './pages/home/home.component';
import {WorkComponent} from './pages/work/work.component';
import {WorkResolver} from './services/work.resolver';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'approach', component: ApproachComponent},
  {
    path: 'blog/:id',
    component: BlogComponent,
  },
  {
    path: 'work/:id',
    component: WorkComponent,
    resolve: {work: WorkResolver},
  },
  {
    path: 'design-system',
    component: DesignSystemComponent,
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
