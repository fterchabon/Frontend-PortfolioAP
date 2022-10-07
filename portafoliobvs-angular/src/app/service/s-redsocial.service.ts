import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Redsocial } from '../model/redsocial';

@Injectable({
  providedIn: 'root'
})
export class SRedsocialService {
  rdURL = 'https://backendbvs-ap.herokuapp.com/reds/';
  //rdURL = 'http://localhost:8080/reds/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Redsocial[]>{
    return this.httpClient.get<Redsocial[]>(this.rdURL + 'lista');
  }

  public detail(id:number): Observable<Redsocial>{
    return this.httpClient.get<Redsocial>(this.rdURL + `detail/${id}`)
  }

  public save(redsocial: Redsocial): Observable<any>{
    return this.httpClient.post<any>(this.rdURL + 'create', redsocial);
  }

  public update(id: number, redsocial: Redsocial): Observable<any>{
    return this.httpClient.put<any>(this.rdURL + `update/${id}`, redsocial);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.rdURL + `delete/${id}`);
  }
}
