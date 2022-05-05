import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetrComponent } from '../app/metr/metr.component'

const routes: Routes = [
  {path: 'home', component: MetrComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
