import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
