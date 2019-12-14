import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../cliente';
import { ClienteCreacionDTO } from '../cliente-creacion-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';

  constructor(private httpClient: HttpClient, private router: Router) { }
/*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }
*/

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.API_URL}/cliente`);
  }

  geClientePage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/cliente/page/${page}`);
  }

  create(cliente: ClienteCreacionDTO): Observable<Cliente> {
    return this.httpClient.post(`${this.API_URL}/cliente`, cliente)
    .pipe(
      map((response: any) => response as Cliente),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${this.API_URL}/cliente/${id}`)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  update(id: number, cliente: ClienteCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/cliente/${id}`, cliente)
    .pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  getCliente(id: number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.API_URL}/cliente/${id}`)
    .pipe(  
      catchError(e => {
        if(e.status !== 401) {
          this.router.navigate(['/cliente']);
        }
        return throwError(e);
      })
    );
  }
}
