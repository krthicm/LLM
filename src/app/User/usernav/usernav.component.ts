import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {
  systemid:any
constructor(private router: Router,private route: ActivatedRoute){
  this.route.paramMap.subscribe(async params => {
    this.systemid = params.get('id');})
}

disusersoft(){
  this.router.navigate(['/Usersoftware',this.systemid])
  console.log(this.systemid);
}

disavailsoft(){
  this.router.navigate(['/user',this.systemid])
  console.log(this.systemid);
}
}
