import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/Service/adminservice.service';
import { Product } from 'src/app/Model/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product: any;
  submit = false;

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    vendorName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    duration: new FormControl('', [Validators.required, Validators.min(1)]),
    cost: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(private service: AdminserviceService) {}
  ngOnInit(){
    this.service.getproduct().subscribe((products) => (this.product = products));
  }
  
  onSubmitproduct() {
    const { productName, vendorName, duration, cost} = this.productForm.value;
    const product: Product = new Product(productName, vendorName, duration, cost);
    console.log('Product added'); 
    this.service.addproduct(product).subscribe((Response) => {
      this.submit = true;
    });
  }


  delete(productName: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.service.deleteproduct(productName).subscribe(
        response => {
          console.log('Product deleted successfully:', response);
          this.service.getproduct().subscribe((product) => (this.product = product));
          const index = this.product.findIndex((product: { productName: string; }) => product.productName === productName);
          if (index !== -1) {
            this.product.splice(index, 1);
            
          }
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
      
    }
  }
  
}
