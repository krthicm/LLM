import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/Service/userservice.service';

@Component({
  selector: 'app-usersoftware',
  templateUrl: './usersoftware.component.html',
  styleUrls: ['./usersoftware.component.css']
})
export class UsersoftwareComponent implements OnInit{
  details:any
  systemid:any
  constructor(private service:UserserviceService,private route: ActivatedRoute){
    this.route.paramMap.subscribe(async params => {
      this.systemid = params.get('id');})
  }
  
  ngOnInit(){
  this.service.getAllActiveSoftwaresofuser(this.systemid).subscribe((user) => {this.details = user
  console.log();
  
  for (let i = 0; i < this.details.length; i++) {
  if(this.details[i].validity<1){
    this.service.deleteSoftware(this.details[i].softwareid).subscribe()
  }
  console.log(this.details[i].validity);
  }
});
 }

  renew(details:any){
    const confirmActivate = confirm('Are you sure you want to Renew this Software?');
    if (confirmActivate) {
      this.service.renew(details).subscribe(
        response => {
          console.log('Software Activated', response);
          const index = this.details.findIndex((item: { id: any; }) => item.id === details.softwareid);
          if (index !== -1) {
            this.details.splice(index, 1);
          }
        },
        error => {
          console.error('Error activating Software:', error);
        }
      );
    }
    this.ngOnInit
  }
  

  deletepr(details: any) {
    const confirmDelete = confirm('Are you sure you want to delete this Software?');
    if (confirmDelete) {
      console.log(details.softwareid);
      
      this.service.deleteSoftware(details.softwareid).subscribe(
        (response) => {
          console.log('Software Deleted', response);
          const index = this.details.findIndex((item: { id: any; }) => item.id === details.softwareid);
          if (index !== -1) {
            this.details.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error deleting Software:', error);
        }
      );
    }this.ngOnInit();
  }
  
}
