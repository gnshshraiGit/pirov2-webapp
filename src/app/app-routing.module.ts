import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivestreamComponent } from './components/livestream/livestream.component';
import { AmbientComponent } from './components/ambient/ambient.component';


const routes: Routes = [
  { path: 'live', component:  LivestreamComponent},
  { path: 'ambience', component:  AmbientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
