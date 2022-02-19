import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  // our four apis

  postDoctor(data : any){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getDoctor(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateDoctor(data : any, id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteDoctor(id :number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
