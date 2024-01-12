import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/Model/details';
import { AdminserviceService } from 'src/app/Service/adminservice.service';
import { HomeService } from 'src/app/Service/home.service';
import { UserserviceService } from 'src/app/Service/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  prod: any;
  product: any;
  userdata: any;
  userdetails: any;
  systemiid: any;
  details: any;
  submit : any;
  validity: number; 
  expiryDate:any;
  private validityInterval: any;

  constructor(
    private services: AdminserviceService,
    private route: ActivatedRoute,
    private service: HomeService,
    private userService: UserserviceService
  ) {
    this.validity = 0;
    this.route.paramMap.subscribe(async params => {
      this.systemiid = params.get('id');})
      this.service.getregister(this.systemiid).subscribe(us => {this.userdetails=us})
      this.services.getproduct().subscribe(product => { this.product = product;})
  }



  install(productname: any) {
    this.services.getaproduct(productname).subscribe((prods) => {
      this.prod = prods;
      console.log(this.prod);
      this.updateValidity();
      
      this.details = new Details(
        0,
        this.userdetails.systemid,
        this.userdetails.name,
        this.userdetails.mailid,
        this.prod.productname,
        this.prod.vendorname,
        this.prod.duration,
        this.prod.cost,
        new Date(),
        this.expiryDate,
        this.validity, 
        'Inactive'
      );
      localStorage.setItem("selectedSoftware",JSON.stringify(this.details))
      this.userService.addstatus(this.details).subscribe((Response) => {
        this.submit = Response;
        if(Response)
        {
          Swal.fire({
            title: 'Request Sent',
            icon: 'success', // You can use 'success', 'error', 'warning', 'info', etc.
            confirmButtonText: 'OK',
          });
        }
        else{
          Swal.fire({
            title: 'Already Installed <br> Contact Admin For Queries',
            icon: 'info', // You can use 'success', 'error', 'warning', 'info', etc.
            confirmButtonText: 'OK',
          });

        }
        
      });
    });

   
  }

  
  updateValidity() {
    if (this.product && this.prod) {
      const installationDate = new Date();
      this.expiryDate = new Date(installationDate);
      this.expiryDate.setDate(installationDate.getDate() + this.prod.duration);
      const validity: number = this.expiryDate.getTime() - new Date().getTime();
      this.validity = validity / (1000 * 60 * 60 * 24);
      console.log(validity);
    }
  }
}


