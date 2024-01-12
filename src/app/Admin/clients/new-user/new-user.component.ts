import { Component } from '@angular/core';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  user:any
  
  constructor(private service: HomeService) {
    const body ={
      'status':'inactive'
    }
    console.log('hi')
    console.log(body)
    this.service.getAllInactiveUsers(body).subscribe((user) => {this.user = user
    console.log(user)
    });
  }


  // to activate the user
  activate(systemid : string): void {
    const confirmActivate = confirm('Are you sure you want to activate this system?');
    if (confirmActivate) {
      this.service.activateSys(systemid).subscribe(
        response => {
          console.log('System Activated', response);
          const index = this.user.findIndex((user: { systemid: string; }) => user.systemid === systemid);
          if (index !== -1) {
            this.user.splice(index, 1);
          }
        },
        error => {
          console.error('Error activating system:', error);
        }
      );
    }
  }


  // to deny the user
  deactivate(systemid : string): void {
    const confirmDeActivate = confirm('Are you sure you want to deny this system?');
    if (confirmDeActivate) {
      this.service.deActivateSys(systemid).subscribe(
        response => {
          console.log('System Activated', response);
          const index = this.user.findIndex((user: { systemid: string; }) => user.systemid === systemid);
          if (index !== -1) {
            this.user.splice(index, 1);
          }
        },
        error => {
          console.error('Error activating system:', error);
        }
      );
    }
  }
    
 }
