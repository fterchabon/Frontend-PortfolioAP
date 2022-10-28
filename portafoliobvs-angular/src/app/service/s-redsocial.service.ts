import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Redsocial } from '../model/redsocial';

@Injectable({
  providedIn: 'root'
})
export class SRedsocialService {
  URL = environment.URL + 'reds/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Redsocial[]>{
    return this.httpClient.get<Redsocial[]>(this.URL + 'lista');
  }

  public detail(id:number): Observable<Redsocial>{
    return this.httpClient.get<Redsocial>(this.URL + `detail/${id}`)
  }

  public save(redsocial: Redsocial): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', redsocial);
  }

  public update(id: number, redsocial: Redsocial): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, redsocial);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
