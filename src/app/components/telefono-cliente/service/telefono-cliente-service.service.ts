import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente }  from '../../cliente/cliente';
import { TelefonoClienteCreacionDTO } from '../telefono-cliente-creacion-dto';
import { TelefonoCliente } from '../telefono-cliente';

@Injectable({
  providedIn: 'root'
})
export class TelefonoClienteService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';

  constructor(private httpClient: HttpClient, private router: Router) { }
/*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get<TipoEmpaqueService[]>(`${this.API_URL}/${url}`, {headers});
  }
*/

  getTelefonoClientes(): Observable<TelefonoCliente[]> {
    return this.httpClient.get<TelefonoCliente[]>(`${this.API_URL}/telefonocliente`);
  }

  getTelefonoClientePage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/telefonocliente/page/${page}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.API_URL}/cliente`);
  }

  create(telefonocliente: TelefonoClienteCreacionDTO): Observable<TelefonoCliente[]> {
    return this.httpClient.post(`${this.API_URL}/telefonocliente`, telefonocliente)
    .pipe(
      map((response: any) => response as TelefonoCliente),
      catchError(e => {
        if(e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<TelefonoCliente> {
    return this.httpClient.delete<TelefonoCliente>(`${this.API_URL}/telefonocliente/${id}`)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, telefonocliente: TelefonoClienteCreacionDTO):  Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/telefonocliente/${id}`, telefonocliente)
    .pipe(
      catchError(e => {
        if (e.status ===400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getTelefonoCliente(id: number): Observable<TelefonoCliente> {
    return this.httpClient.get<TelefonoCliente>(`${this.API_URL}/telefonocliente/${id}`)
    .pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/telefonocliente']);
        }
        return throwError(e);
      })
    );
  }  
}
