import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = `${environment.serviceUrl}/user` //Alt+96 = ``
  constructor(private http: HttpClient) { }

  getUsers(){
    let getUrl = `${this.url}`;
    return this.http.get<any>(getUrl);
  }

  getUserById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  deleteUser(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  addUser(user: any){
    let getUrl = `${this.url}/register`;
    return this.http.post<any>(getUrl,user)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateUser(id: any, user: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,user)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
