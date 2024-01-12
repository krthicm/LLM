import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  
  public url = 'http://localhost:1234/register'
  islogin: boolean | undefined;
  errorMessage: string ='';

  constructor(public http:HttpClient){}

  // to add the registered details to database
  createRegister(registerData: User) {
    console.log(registerData)
    return this.http.post<Boolean>(`${this.url}/create`, registerData);
  }


  // to retrieve all Inactive users 
  getAllInactiveUsers(body:any):Observable<User[]>{
    console.log(body)
    return this.http.post<User[]>(this.url+'/status',body)
  }

  // to retrieve all active users 
  getAllActiveUsers(body:any):Observable<User[]>{
    return this.http.post<User[]>(this.url+'/status',body)
  }


  getAllRegisters():Observable<User>{
    return this.http.get<User>(this.url)
  }

   // to retrieve user detail 
  getregister(systemid:any){
    return this.http.get<User>(this.url+`/getuser/${systemid}`)
  }

  // to update status
  activateSys(systemid:any){
    return this.http.put(this.url+"/systemid",systemid);
  }

  // to update status
  deActivateSys(systemid:any){
    return this.http.put(this.url+"/systemids",systemid);
  }

  //to delete the user
  deleteUser(systemid : any){
    const deleteurl = `${this.url}/${systemid}`
    return this.http.delete(deleteurl)
  }


  checkuser(systemId: any, password: any):Observable<Boolean> {
    const c = {sys:systemId,pw:password};
    return this.http.post<Boolean>(this.url+"/check",c);
  }  


  countofuser() {
    return this.http.get(this.url+"/countuser")
  }
}
