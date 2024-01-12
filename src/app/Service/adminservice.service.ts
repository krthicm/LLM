import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Product } from '../Model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  url:string='http://localhost:1222/products'
  constructor(private httpClient:HttpClient) { }
 
  addproduct(newProduct:Product){
    return this.httpClient.post(this.url + "/addProduct",newProduct)
  }
 
  getproduct():Observable<Product>{
    return this.httpClient.get<Product>(this.url)
  }

  deleteproduct(productName : any){
    const deleteurl = `${this.url}/${productName}`
    return this.httpClient.delete(deleteurl)
  }

  getaproduct(productName:any){
    return this.httpClient.get<Product>(this.url+`/getprod/${productName}`)
  }

  countofproduct(){
    return this.httpClient.get(this.url+"/countofproduct")
  }
}
