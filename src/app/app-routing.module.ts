import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivestreamComponent } from './components/livestream/livestream.component';
import { AmbientComponent } from './components/ambient/ambient.component';
import { HomescreenComponent } from './components/homescreen/homescreen.component';

const routes: Routes = [
  { path: 'home', component: HomescreenComponent},
  { path: 'live', component:  LivestreamComponent},
  { path: 'ambience', component:  AmbientComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
