import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ServiceComponent } from './SERVICES/service/service.component';
import { ProductsComponent } from './products/products.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ExistingUserComponent } from './clients/existing-user/existing-user.component';
import { NewUserComponent } from './clients/new-user/new-user.component';
import { LogoutComponent } from './logout/logout.component';
import { ServicereqComponent } from './SERVICES/servicereq/servicereq.component';

const routes: Routes = [
  { path :'adminhome' , component: AdminHomeComponent },
  { path :'service' , component: ServiceComponent },
  { path :'products' , component: ProductsComponent },
  { path :'newuser' , component: NewUserComponent },
  { path :'existinguser' , component: ExistingUserComponent },
  { path :'logout' , component: LogoutComponent},
  { path:'servicereq' , component:ServicereqComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
