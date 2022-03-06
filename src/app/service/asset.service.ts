import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private url = `${environment.serviceUrl}/assets` //Alt+96 = ``
  constructor(private http: HttpClient) { }

  getAssets(){
    let getUrl = `${this.url}`;
    return this.http.get<any>(getUrl);
  }

  getAssetsById(id: any){
    let getUrl = `${this.url}/${id}`;
    console.log(this.http.get<any>(getUrl));
    return this.http.get<any>(getUrl);
  }

  deleteAssets(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

  addAssets(assets: any){
    let getUrl = `${this.url}/addAssets`;
    return this.http.post<any>(getUrl,assets)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateAssets(id: any, assets: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,assets)
    .pipe(map((res)=>{
      return res;
    }))
  }
}
