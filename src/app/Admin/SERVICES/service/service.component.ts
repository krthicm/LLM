import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/Service/userservice.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
  details:any
  searchKey:any
  searchby:any

  constructor(private service:UserserviceService){}
  ngOnInit(){
     const body ={
    'status':'Active'
  }
  this.service.getAllActiveSoftwares(body).subscribe((user) => {this.details = user
  console.log(user)
  });
  }

  

  search(){
    if(this.searchKey){
      console.log(this.searchKey);
      this.service.getAllActiveSoftwarescat(this.searchKey,this.searchby).subscribe(
        (user) => {this.details=user
        console.log(user)
        }
      )
      console.log(this.details);
      
    }
  }
}
