import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetrComponent } from '../app/metr/metr.component'
import { LoginComponent } from '../app/login/login.component'

const routes: Routes = [
  {path: '', component: MetrComponent},
  {path: 'home', component: MetrComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
