import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/Service/userservice.service';

@Component({
  selector: 'app-servicereq',
  templateUrl: './servicereq.component.html',
  styleUrls: ['./servicereq.component.css']
})
export class ServicereqComponent implements OnInit{
  constructor(private service:UserserviceService){}
  details:any
  softwareid:any
  
  ngOnInit(){
    const body = { 'status': 'Inactive' };
    this.service.getAllInActiveSoftwares(body).subscribe((user) => {
      this.details = user;
    });
  }

 

  accept(details:any){
    const confirmActivate = confirm('Are you sure you want to activate this Software?');
    if (confirmActivate) {
      this.service.activateSoftware(details).subscribe(
        response => {
          console.log('Software Activated', response);
          this.service.generateMail(details.mailid,details.name,details.installationdate,details.expirydate,details.productname,details.validity).subscribe()
          const index = this.details.findIndex((item: { id: any; }) => item.id === details.softwareid);
          if (index !== -1) {
            this.details.splice(index, 1);
           
          } this.ngOnInit();
        },
        error => {
          console.error('Error activating Software:', error);
        }
      );
    }
    
  }

  decline(detail:any){
    const confirmDelete = confirm('Are you sure you want to delete this Software?');
    if (confirmDelete) {
      console.log(detail);
      
      this.service.deleteSoftware(detail).subscribe(
        (response) => {
          console.log('Software Deleted', response);
          const index = this.details.findIndex((item: { id: any; }) => item.id === detail.softwareid);
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