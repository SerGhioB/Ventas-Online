import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoriaCreacionDTO } from '../categoria-creacion-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // private API_URL = 'http://192.168.31.145.:9200/api/v1'; // copiar mi ULR del API
  // private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjY2NzM4MzAsInVzZXJfbmFtZSI6ImV0dW1heCIsImp0aSI6ImRkY2IzMTYwLTAzZWMtNDJmMy04OTA0LTE4NTU1ZDAxYjczNCIsImNsaWVudF9pZCI6ImFsbWFjZW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.Z-YvUQ1Wp7ahxNdRHJBp-pfNgMEK0pCoJmTF5ns-m6k';
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';
  constructor(private httpClient: HttpClient, private router: Router) { }

/*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
  return this.httpClient.get(`${this.API_URL}/${url}` ,{headers});
  }
*/

getCategorias(): Observable<Categoria[]> {
  return this.httpClient.get<Categoria[]>(`${this.API_URL}/categoria`);
}
  
getCategoriaPage(page?: number): Observable<any> {
  return this.httpClient.get(`${this.API_URL}/categoria/page/${page}`);
}  
 
create (categoria: CategoriaCreacionDTO): Observable<Categoria> {
  return this.httpClient.post(`${this.API_URL}/categoria`, categoria)
  .pipe(
    map((response: any) => response as Categoria),
    catchError (e => {
      if(e.status === 400){
        return throwError (e);
      }
      return throwError(e);
    })
  );
}

delete(id: number): Observable<Categoria> {
  return this.httpClient.delete<Categoria>(`${this.API_URL}/categoria/${id}`)
  .pipe(
    catchError(e => {
      return throwError(e);
    })
  );
}

update(id: number, categoria: CategoriaCreacionDTO): Observable<any> {
  return this.httpClient.put<any>
  (`${this.API_URL}/categoria/${id}`, categoria)
  .pipe(
    catchError(e => {
      if(e.status === 400) {
        return throwError(e);
      }
      return throwError(e);
    })
  );
}

getCategoria(id: number): Observable<Categoria>{
  return this.httpClient.get<Categoria>(`${this.API_URL}/categoria/${id}`)
  .pipe(
    catchError (e => {
      if(e.status !== 401) {
        this.router.navigate(['/categoria']);
      }
      return throwError(e);
    })
  );
}
}
