import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminnavComponent } from './Admin/adminnav/adminnav.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { UsersoftwareComponent } from './User/usersoftware/usersoftware.component';

const routes: Routes = [{path:'admin',component:AdminHomeComponent},
{path: '', component: HomeComponent},
{path: 'user/:id',component: UserHomeComponent},
{path: 'Usersoftware/:id',component: UsersoftwareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
