import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = `${environment.serviceUrl}/department` //Alt+96 = ``
  constructor(private http: HttpClient) { }

  getDepartMents(){
    let getUrl = `${this.url}`;
    return this.http.get<any>(getUrl);
  }

  getDepartmentById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  deleteDepartment(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  addDepartment(department: any){
    let getUrl = `${this.url}/addDepartment`;
    return this.http.post<any>(getUrl,department)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateDepartment(id: any, department: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,department)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
