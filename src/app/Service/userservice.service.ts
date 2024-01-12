import { Injectable } from '@angular/core';
import { Details } from '../Model/details';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
 
 
 
  url:string='http://localhost:1221/service'
  constructor(private httpClient:HttpClient) { }

  addstatus(stat:Details){
    return this.httpClient.post(this.url + "/add" ,stat)
  }

  //to get all softwares
  getsoftwares():Observable<Details>{
    return this.httpClient.get<Details>(this.url)
  }
 
  // to update status of softwares
  activateSoftware(details:Details){
    console.log("service works",details);
    return this.httpClient.put(this.url+'/activatesoftware',details);
  }

  // to retrieve all active softwares 
  getAllActiveSoftwares(body:any):Observable<Details[]>{
    return this.httpClient.post<Details[]>(this.url+'/softstatus',body)
  }

  // to update status of softwares
  deactivateSoftware(details:Details){
    return this.httpClient.put(this.url+"/deactivatesoftware",details);
  }

  // to retrieve all Inactive softwares 
  getAllInActiveSoftwares(body:any):Observable<Details[]>{
    return this.httpClient.post<Details[]>(this.url+'/softstatus',body)
  }

  getAllActiveSoftwaresofuser(systemid: any){
    console.log(systemid);
    
    return this.httpClient.get(this.url+`/usersw/${systemid}`)
  }

  countofservice(){
    return this.httpClient.get(this.url+"/countservice")
  }

  cost() {
    return this.httpClient.get(this.url+"/cost")
  }


  renew(details:Details){
    return this.httpClient.put(this.url+"/reneww",details)
  }

  countswVu(){
    return this.httpClient.get(this.url+"/getbarChart")
  }

  generateMail(mailid:any,user:any,install:any,expiry:any,sname:any,val:any){
    console.log("http from licensse service" + mailid,val,install,sname,user);
    const body={
      "mail":mailid,
      "user":user,
      "install":install,
      "expiry":expiry,
      "software":sname,
      "validity":val
    }
    return this.httpClient.post(this.url+'/sendEmail',body);

  }


  updateValidityInDatabase(systemid: any, validity: number) {
    const updateData = { systemid, validity };
    return this.httpClient.put(this.url+'/updatevalidity' ,updateData);
  }

  checkInstallationStatus(systemid: number, productname: string): Observable<boolean> {
    const apiUrl = `${this.url}?systemid=${systemid}&productname=${productname}`;
    return this.httpClient.get<boolean>(apiUrl);
  }  

  deleteSoftware(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:1221/service/delete/${id}`);
  }

  changevalidity(bodyy:any) {
    return this.httpClient.put(this.url+'/changevalidity',bodyy);
  }

  getAllActiveSoftwarescat(searchKey: any, searchby: any) {
    console.log(searchKey, searchby);
    return this.httpClient.get(`http://localhost:1221/service/category/${searchKey}/${searchby}`);
}


}
