import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './Admin/products/products.component';
import { ExistingUserComponent } from './Admin/clients/existing-user/existing-user.component';
import { NewUserComponent } from './Admin/clients/new-user/new-user.component';
import { AdminModule } from './Admin/admin.module';
import { ServiceComponent } from './Admin/SERVICES/service/service.component';
import { AdminnavComponent } from './Admin/adminnav/adminnav.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersoftwareComponent } from './User/usersoftware/usersoftware.component';
import { UsernavComponent } from './User/usernav/usernav.component';
import { ServicereqComponent } from './Admin/SERVICES/servicereq/servicereq.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    UserHomeComponent,
    HomeComponent,
    ProductsComponent,
    ExistingUserComponent,
    NewUserComponent,
    ServiceComponent,
    AdminnavComponent,
    UsersoftwareComponent,
    UsernavComponent,
    ServicereqComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,AdminModule,NgxChartsModule,
    HttpClientModule,DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
