import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApproachComponent} from './pages/approach/approach.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'approach', component: ApproachComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
