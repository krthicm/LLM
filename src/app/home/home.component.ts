import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Model/User';
import { Login } from '../Model/login';
import { HomeService } from '../Service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router,private route: ActivatedRoute,public service:HomeService){
    
  }

  // registration form
  registerForm :FormGroup = new FormGroup({
    name : new FormControl('',[
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
      Validators.minLength(3)
    ]),
    mailid : new FormControl('',[
      Validators.required,
      Validators.pattern('[a-z][a-zA-Z0-9._]+@[a-z]+\\.[a-z]{2,6}'),
    ]),
    systemid : new FormControl('',[
      Validators.required,
      Validators.pattern('[A-Z]{4}[0-9]{6}'),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ])
  })

  name : string =''
  mailid : string =''
  systemid : string =''
  password : string =''
  status : string ='Inactive'
  
  onSubmit(){
    this.name = this.registerForm.value.name;
    this.mailid = this.registerForm.value.mailid;
    this.password = this.registerForm.value.password;
    this.systemid = this.registerForm.value.systemid;
    const user : User = new User(this.systemid,this.name,this.mailid,this.password,this.status);
    this.service.createRegister(user).subscribe(
      res=>console.log(res)
    )
    Swal.fire({
      title: 'Success',
      icon: 'success', // You can use 'success', 'error', 'warning', 'info', etc.
      confirmButtonText: 'OK',
      
    });

  }

  // login form
  loginForm :FormGroup = new FormGroup({
    systemid : new FormControl('',[
      Validators.required,
      Validators.pattern('[A-Z]{4}[0-9]{6}'),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ])
  })

  s=false
  onLogin() {
    const systemId = this.loginForm.value.systemid;
    const password = this.loginForm.value.password;
      console.log("Login Click")
    if (systemId === 'AAAA000001' && password === 'admin@123') {
      this.router.navigate(['/admin']);
    }
    else {
      this.service.checkuser(systemId, password).subscribe(
        (res) => {
          if (res == true) {
            this.s = true;
            this.router.navigate(['/user',systemId]);
          }
        }
      );
    }
  }
}
