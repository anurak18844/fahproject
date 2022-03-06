import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = `${environment.serviceUrl}/category` //Alt+96 = ``
  constructor(private http: HttpClient) { }

  getCategories(){
    let getUrl = `${this.url}`;
    return this.http.get<any>(getUrl);
  }

  getCategoryById(id: any){
    let getUrl = `${this.url}/${id}`;
    console.log(this.http.get<any>(getUrl));
    return this.http.get<any>(getUrl);
  }

  deleteCategory(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  addCateogy(category: any){
    let getUrl = `${this.url}/addCategory`;
    return this.http.post<any>(getUrl,category)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateCategory(id: any, category: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,category)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
