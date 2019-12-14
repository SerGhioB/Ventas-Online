import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../../cliente/cliente';
import { EmailCliente } from '../email-cliente';
import { EmailClienteCreacionDTO } from '../email-cliente-creacion-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailClienteService {
  private API_URL = 'https://localhost:44397/api/v1';
  private token = '';

  constructor(private httpClient: HttpClient, private router: Router) { }
/*
  getData(url: string) {
    // const headers = new HttpHeaders({'Authorization' : `Bearer ${this.token}`});
    return this.httpCliente.get(`${this.API_URL}/${url}`, {headers});
  }
*/

  getEmailClientes(): Observable<EmailCliente[]> {
    return this.httpClient.get<EmailCliente[]>(`${this.API_URL}/emailcliente`);
  }

  getEmailClientePage(page?: number): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/emailcliente/page/${page}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.API_URL}/cliente`);
  }

  create(emailcliente: EmailClienteCreacionDTO): Observable<EmailCliente> {
    return this.httpClient.post(`${this.API_URL}/emailcliente`, emailcliente)
    .pipe(
      map((response: any) => response as EmailCliente),
      catchError(e => {
        if (e.status ===400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<EmailCliente> {
    return this.httpClient.delete<EmailCliente>(`${this.API_URL}/emailcliente/${id}`)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, emailcliente: EmailClienteCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.API_URL}/emailcliente/${id}`, emailcliente)
    .pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getEmailCliente(id: number): Observable<EmailCliente>{
    return this.httpClient.get<EmailCliente>(`${this.API_URL}/emailcliente/${id}`)
    .pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/emailcliente']);
        }
        return throwError(e);
      })
    );
  }
}
