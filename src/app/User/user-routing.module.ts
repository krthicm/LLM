import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersoftwareComponent } from './usersoftware/usersoftware.component';

const routes: Routes = [
  {path:'Usersoftware',
  component:UsersoftwareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
