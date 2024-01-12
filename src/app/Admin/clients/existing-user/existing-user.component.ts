import { Component } from '@angular/core';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-existing-user',
  templateUrl: './existing-user.component.html',
  styleUrls: ['./existing-user.component.css']
})
export class ExistingUserComponent {
  user:any
  constructor(private service: HomeService) {
    
    const body ={
      'status':'Active'
    }
    this.service.getAllActiveUsers(body).subscribe((user) => {this.user = user
    console.log(user)
    });
  }

  delete(systemid:any){
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.service.deleteUser(systemid).subscribe(
        response => {
          console.log('Product deleted successfully:', response);

          const index = this.user.findIndex((user: { systemid: string; }) => user.systemid === systemid);
          if (index !== -1) {
            this.user.splice(index, 1);
            
          }
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
      
    }
  }
}
