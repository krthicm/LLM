import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/Service/userservice.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  detail:any
constructor(private service:UserserviceService) {
  const body ={
    'status':'Active'
  }
  this.service.getAllActiveSoftwares(body).subscribe((user) => {this.detail = user
  console.log( this.detail);

  for (let i = 0; i < this.detail.length; i++) {
    const element: Date = new Date(this.detail[i].expirydate); 
    const softid:number=(this.detail[i].softwareid)
    const timeDifference = element.getTime() - new Date().getTime(); 
    const timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24); 
    const changeTime= timeDifferenceInDays.toFixed(0)
    const body ={
      'changtim':changeTime+'',
      'swid':softid+''
    }
    service.changevalidity(body).subscribe()
  }
}) 
}


}
